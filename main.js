import { app } from "../../scripts/app.js";
import { $el } from "../../scripts/ui.js";
import { LOCALES } from "./LocaleMap.js";
import { applyMenuTranslation, observeFactory } from "./MenuTranslate.js";
// Translation Utils
export class TUtils {
  static LOCALE_ID = "AGL.Locale";
  static LOCALE_ID_LAST = "AGL.LocaleLast";

  static T = {
    Menu: {},
    Nodes: {},
    NodeCategory: {},
    Locales: LOCALES,
  };
  static ELS = {};

  static setLocale(locale) {
    localStorage[TUtils.LOCALE_ID_LAST] = localStorage.getItem(TUtils.LOCALE_ID) || "en-US";
    localStorage[TUtils.LOCALE_ID] = locale;
    setTimeout(() => {
      location.reload();
    }, 500);
  }

  static syncTranslation(OnFinished = () => {}) {
    var locale = localStorage.getItem(TUtils.LOCALE_ID) || "en-US";
    if (localStorage.getItem(TUtils.LOCALE_ID) === null) {
      // 有可能菜单设置了zh-CN但 loacalStorage为空, 这时不会刷新
      let slocal = localStorage.getItem(`Comfy.Settings.${TUtils.LOCALE_ID}`);
      if (slocal) {
        locale = slocal.replace(/^"(.*)"$/, "$1");
      }
    }
    var url = "./agl/get_translation";
    var request = new XMLHttpRequest();
    request.open("post", url, false);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.onload = function () {
      /* XHR对象获取到返回信息后执行 */
      if (request.status != 200) return;
      var resp = JSON.parse(request.responseText);
      for (var key in TUtils.T) {
        if (key in resp) TUtils.T[key] = resp[key];
        else TUtils.T[key] = {};
      }
      TUtils.T.Locales = LOCALES;
      // 合并NodeCategory 到 Menu
      TUtils.Menu = Object.assign(TUtils.T.Menu, TUtils.T.NodeCategory);
      // 提取 Node 中 key 到 Menu
      for (let key in TUtils.T.Nodes) {
        let node = TUtils.T.Nodes[key];
        TUtils.Menu[key] = node["title"] || key;
      }
      OnFinished();
    };
    request.send(`locale=${locale}`);
  }
  static enhandeDrawNodeWidgets() {
    let theme = localStorage.getItem("Comfy.Settings.Comfy.ColorPalette") || "";
    theme = theme.replace(/^"(.*)"$/, "$1");
    if (!["dark", "light", "solarized", "arc", "nord", "github", ""].includes(theme)) return;
    let drawNodeWidgets = LGraphCanvas.prototype.drawNodeWidgets;
    LGraphCanvas.prototype.drawNodeWidgets = function (node, posY, ctx, active_widget) {
      if (!node.widgets || !node.widgets.length) {
        return 0;
      }
      const widgets = node.widgets.filter((w) => w.type === "slider");
      widgets.forEach((widget) => {
        widget._ori_label = widget.label;
        const fixed = widget.options.precision != null ? widget.options.precision : 3;
        widget.label = (widget.label || widget.name) + ": " + Number(widget.value).toFixed(fixed).toString();
      });
      let result;
      try {
        result = drawNodeWidgets.call(this, node, posY, ctx, active_widget);
      } finally {
        widgets.forEach((widget) => {
          widget.label = widget._ori_label;
          delete widget._ori_label;
        });
      }
      return result;
    };
  }
  static applyNodeTypeTranslationEx(nodeName) {
    let nodesT = this.T.Nodes;
    var nodeType = LiteGraph.registered_node_types[nodeName];
    let class_type = nodeType.comfyClass ? nodeType.comfyClass : nodeType.type;
    if (nodesT.hasOwnProperty(class_type)) {
      nodeType.title = nodesT[class_type]["title"] || nodeType.title;
    }
  }

  /**
   * Translate node def's display name in place.
   * @param {ComfyNodeDef} nodeDef
   * Ref: https://github.com/Comfy-Org/ComfyUI_frontend/blob/adcef7d2f4124f03bd1a6a86d6c781bdc5bdf3a6/src/types/apiTypes.ts#L360
   */
  static applyVueNodeDisplayNameTranslation(nodeDef) {
    const nodesT = TUtils.T.Nodes;
    const class_type = nodeDef.name;
    if (nodesT.hasOwnProperty(class_type)) {
      nodeDef.display_name = nodesT[class_type]["title"] || nodeDef.display_name;
    }
  }

  static applyVueNodeTranslation(nodeDef) {
    const catsT = TUtils.T.NodeCategory;
    const nodesT = TUtils.T.Nodes;
    const nodeT = TUtils.T.Nodes[nodeDef.name];
    // category
    if (!nodeDef.category) return;
    const catArr = nodeDef.category.split("/");
    nodeDef.category = catArr.map((cat) => catsT?.[cat] || cat).join("/");
    if (!nodeT) return;
    return;
    for (let itype in nodeDef.input) {
      if (itype === "hidden") continue;
      for (let socketname in nodeDef.input[itype]) {
        let inp = nodeDef.input[itype][socketname];
        if (inp[1] === undefined) continue;
        inp.name = nodeT["inputs"]?.[socketname] || nodeT["widgets"]?.[socketname] || undefined;
      }
    }
  }

  static applyNodeTypeTranslation(app) {
    for (let nodeName in LiteGraph.registered_node_types) {
      this.applyNodeTypeTranslationEx(nodeName);
    }
  }

  static applyNodeTranslation(node) {
    let keys = ["inputs", "outputs", "widgets"];
    let nodesT = this.T.Nodes;
    let class_type = node.constructor.comfyClass ? node.constructor.comfyClass : node.constructor.type;
    if (!nodesT.hasOwnProperty(class_type)) {
      for (let key of keys) {
        if (!node.hasOwnProperty(key) || !Array.isArray(node[key])) continue;
        node[key].forEach((item) => {
          if (item?.hasOwnProperty("name")) item.label = item.name;
        });
      }
      return;
    }
    var t = nodesT[class_type];
    for (let key of keys) {
      if (!t.hasOwnProperty(key)) continue;
      if (!node.hasOwnProperty(key)) continue;
      node[key].forEach((item) => {
        if (item?.name in t[key]) {
          item.label = t[key][item.name];
        }
      });
    }
    if (t.hasOwnProperty("title")) {
      node.title = t["title"];
      node.constructor.title = t["title"];
    }
    // 转换 widget 到 input 时需要刷新socket信息
    let addInput = node.addInput;
    node.addInput = function (name, type, extra_info) {
      var oldInputs = [];
      this.inputs?.forEach((i) => oldInputs.push(i.name));
      var res = addInput.apply(this, arguments);
      this.inputs?.forEach((i) => {
        if (oldInputs.includes(i.name)) return;
        if (t["widgets"] && i.widget?.name in t["widgets"]) {
          i.label = t["widgets"][i.widget?.name];
        }
      });
      return res;
    };
    let onInputAdded = node.onInputAdded;
    node.onInputAdded = function (slot) {
      if (onInputAdded) var res = onInputAdded.apply(this, arguments);
      // console.log(slot);
      let t = TUtils.T.Nodes[this.comfyClass];
      if (t["widgets"] && slot.name in t["widgets"]) {
        slot.localized_name = t["widgets"][slot.name];
      }
      if (onInputAdded) return res;
    };
  }

  static applyNodeDescTranslation(nodeType, nodeData, app) {
    let nodesT = this.T.Nodes;
    var t = nodesT[nodeType.comfyClass];
    nodeData.description = t?.["description"] || nodeData.description;

    var nodeT = nodesT[nodeType.comfyClass] || {};
    // 输入和widget提示
    var nodeInputT = nodeT["inputs"] || {};
    var nodeWidgetT = nodeT["widgets"] || {};
    for (let itype in nodeData.input) {
      for (let socketname in nodeData.input[itype]) {
        let inp = nodeData.input[itype][socketname];
        if (inp[1] === undefined || !inp[1].tooltip) continue;
        var tooltip = inp[1].tooltip;
        var tooltipT = nodeInputT[tooltip] || nodeWidgetT[tooltip] || tooltip;
        inp[1].tooltip = tooltipT;
      }
    }
    // 输出提示
    var nodeOutputT = nodeT["outputs"] || {};
    for (var i = 0; i < (nodeData.output_tooltips || []).length; i++) {
      var tooltip = nodeData.output_tooltips[i];
      var tooltipT = nodeOutputT[tooltip] || tooltip;
      nodeData.output_tooltips[i] = tooltipT;
    }
  }

  static applyMenuTranslation(app) {
    // 搜索菜单 常驻菜单
    applyMenuTranslation(TUtils.T);
    // Queue size 单独处理
    observeFactory(app.ui.menuContainer.querySelector(".drag-handle").childNodes[1], (mutationsList, observer) => {
      for (let mutation of mutationsList) {
        for (let node of mutation.addedNodes) {
          var match = node.data.match(/(Queue size:) (\w+)/);
          if (match?.length == 3) {
            const t = TUtils.T.Menu[match[1]] ? TUtils.T.Menu[match[1]] : match[1];
            node.data = t + " " + match[2];
          }
        }
      }
    });
  }

  static applyContextMenuTranslation(app) {
    // 右键上下文菜单
    var f = LGraphCanvas.prototype.getCanvasMenuOptions;
    LGraphCanvas.prototype.getCanvasMenuOptions = function () {
      var res = f.apply(this, arguments);
      let menuT = TUtils.T.Menu;
      for (let item of res) {
        if (item == null || !item.hasOwnProperty("content")) continue;
        if (item.content in menuT) {
          item.content = menuT[item.content];
        }
      }
      return res;
    };
    const f2 = LiteGraph.ContextMenu;
    LiteGraph.ContextMenu = function (values, options) {
      // 右键上下文菜单先从此处翻译, 随后会经过 applyMenuTranslation走通用翻译
      if (options.hasOwnProperty("title") && options.title in TUtils.T.Nodes) {
        options.title = TUtils.T.Nodes[options.title]["title"] || options.title;
      }
      // Convert {w.name} to input
      // Convert {w.name} to widget
      var t = TUtils.T.Menu;
      var tN = TUtils.T.Nodes;
      var reInput = /Convert (.*) to input/;
      var reWidget = /Convert (.*) to widget/;
      var cvt = t["Convert "] || "Convert ";
      var tinp = t[" to input"] || " to input";
      var twgt = t[" to widget"] || " to widget";
      for (let value of values) {
        if (value == null || !value.hasOwnProperty("content")) continue;
        // 子菜单先走 节点标题菜单
        if (value.value in tN)
        {
          value.content = tN[value.value]["title"] || value.content;
          continue;
        }
        // inputs
        if (value.content in t) {
          value.content = t[value.content];
          continue;
        }
        var extra_info = options.extra || options.parentMenu?.options?.extra; // for capture translation text of input and widget
        // widgets and inputs
        var matchInput = value.content?.match(reInput);
        if (matchInput) {
          var match = matchInput[1];
          extra_info?.inputs?.find((i) => {
            if (i.name != match) return false;
            match = i.label ? i.label : i.name;
          });
          extra_info?.widgets?.find((i) => {
            if (i.name != match) return false;
            match = i.label ? i.label : i.name;
          });
          value.content = cvt + match + tinp;
          continue;
        }
        var matchWidget = value.content?.match(reWidget);
        if (matchWidget) {
          var match = matchWidget[1];
          extra_info?.inputs?.find((i) => {
            if (i.name != match) return false;
            match = i.label ? i.label : i.name;
          });
          extra_info?.widgets?.find((i) => {
            if (i.name != match) return false;
            match = i.label ? i.label : i.name;
          });
          value.content = cvt + match + twgt;
          continue;
        }
      }

      const ctx = f2.call(this, values, options);
      return ctx;
    };
    LiteGraph.ContextMenu.prototype = f2.prototype;
    // search box
    // var f3 = LiteGraph.LGraphCanvas.prototype.showSearchBox;
    // LiteGraph.LGraphCanvas.prototype.showSearchBox = function (event) {
    // 	var res = f3.apply(this, arguments);
    // 	var t = TUtils.T.Menu;
    // 	var name = this.search_box.querySelector(".name");
    // 	if (name.innerText in t)
    // 		name.innerText = t[name.innerText];
    // 	t = TUtils.T.Nodes;
    // 	var helper = this.search_box.querySelector(".helper");
    // 	var items = helper.getElementsByClassName("litegraph lite-search-item");
    // 	for (let item of items) {
    // 		if (item.innerText in t)
    // 			item.innerText = t[item.innerText]["title"];
    // 	}
    // 	return res;
    // };
    // LiteGraph.LGraphCanvas.prototype.showSearchBox.prototype = f3.prototype;
  }

  static addRegisterNodeDefCB(app) {
    const f = app.registerNodeDef;
    async function af() {
      return f.apply(this, arguments);
    }
    app.registerNodeDef = async function (nodeId, nodeData) {
      var res = af.apply(this, arguments);
      res.then(() => {
        TUtils.applyNodeTypeTranslationEx(nodeId);
      });
      return res;
    };
  }
  static addPanelButtons(app) {
    app.ui.menuContainer.appendChild(
      $el("button.agl-swlocale-btn", {
        id: "swlocale-button",
        textContent: TUtils.T.Menu["Switch Locale"] || "Switch Locale",
        onclick: () => {
          var localeLast = localStorage.getItem(TUtils.LOCALE_ID_LAST) || "en-US";
          var locale = localStorage.getItem(TUtils.LOCALE_ID) || "en-US";
          if (locale != "en-US" && localeLast != "en-US") localeLast = "en-US";
          if (locale != localeLast) {
            app.ui.settings.setSettingValue(TUtils.LOCALE_ID, localeLast);
          }
        },
      })
    );
    if(window.__COMFYUI_FRONTEND_VERSION__ > "1.2")
    {
      var ComfyButtonGroup = window.comfyAPI.buttonGroup.ComfyButtonGroup;
      var ComfyButton = window.comfyAPI.button.ComfyButton;
      var btn = new ComfyButton({
        icon: "translate",
        action: () => {
          var localeLast = localStorage.getItem(TUtils.LOCALE_ID_LAST) || "en-US";
          var locale = localStorage.getItem(TUtils.LOCALE_ID) || "en-US";
          if (locale != "en-US" && localeLast != "en-US") localeLast = "en-US";
          if (locale != localeLast) {
            app.ui.settings.setSettingValue(TUtils.LOCALE_ID, localeLast);
          }
        },
        tooltip: TUtils.T.Menu["Switch Locale"] || "Switch Locale",
        content: "",
        classList: "swlocale-button comfyui-button primary"
      });
      btn.iconElement.style.width = "1.2rem";
      var group = new ComfyButtonGroup(btn.element);
      app.menu?.settingsGroup.element.before(group.element);
    }
  }
  static addSettingsMenuOptions(app) {
    let id = this.LOCALE_ID;
    app.ui.settings.addSetting({
      id: id,
      name: "Locale",
      type: (name, setter, value) => {
        const options = [
          ...Object.entries(TUtils.T.Locales).map((v) => {
            let nativeName = v[1].nativeName;
            let englishName = "";
            if (v[1].englishName != nativeName) englishName = ` [${v[1].englishName}]`;
            return $el("option", {
              textContent: v[1].nativeName + englishName,
              value: v[0],
              selected: v[0] === value,
            });
          }),
        ];

        TUtils.ELS.select = $el(
          "select",
          {
            style: {
              marginBottom: "0.15rem",
              width: "100%",
            },
            onchange: (e) => {
              setter(e.target.value);
            },
          },
          options
        );

        return $el("tr", [
          $el("td", [
            $el("label", {
              for: id.replaceAll(".", "-"),
              textContent: "AGLTranslation-langualge",
            }),
          ]),
          $el("td", [
            TUtils.ELS.select,
            $el("div", {
              style: {
                display: "grid",
                gap: "4px",
                gridAutoFlow: "column",
              },
            }),
          ]),
        ]);
      },
      defaultValue: localStorage[id] || "en-US",
      async onChange(value) {
        if (!value) return;
        if (localStorage[id] != undefined && value != localStorage[id]) {
          TUtils.setLocale(value);
        }
        localStorage[id] = value;
      },
    });
  }
}

const ext = {
  name: "AIGODLIKE.Translation",
  async init(app) {
    // Any initial setup to run as soon as the page loads
    TUtils.enhandeDrawNodeWidgets();
    TUtils.syncTranslation();
  },
  async setup(app) {
    TUtils.applyNodeTypeTranslation(app);
    TUtils.applyContextMenuTranslation(app);
    TUtils.applyMenuTranslation(app);
    TUtils.addRegisterNodeDefCB(app);
    TUtils.addSettingsMenuOptions(app);
    // 构造设置面板
    // this.settings = new AGLSettingsDialog();
    // 添加按钮
    TUtils.addPanelButtons(app);
  },
  async addCustomNodeDefs(defs, app) {
    // Add custom node definitions
    // These definitions will be configured and registered automatically
    // defs is a lookup core nodes, add yours into this
    // console.log("[logging]", "add custom node definitions", "current nodes:", Object.keys(defs));
  },
  async getCustomWidgets(app) {
    // Return custom widget types
    // See ComfyWidgets for widget examples
    // console.log("[logging]", "provide custom widgets");
  },
  async beforeRegisterNodeDef(nodeType, nodeData, app) {
    TUtils.applyNodeDescTranslation(nodeType, nodeData, app);
    // Run custom logic before a node definition is registered with the graph
    // console.log("[logging]", "before register node: ", nodeType.comfyClass);
    // This fires for every node definition so only log once
    // applyNodeTranslationDef(nodeType, nodeData);
    // delete ext.beforeRegisterNodeDef;
  },
  beforeRegisterVueAppNodeDefs(nodeDefs) {
    nodeDefs.forEach(TUtils.applyVueNodeDisplayNameTranslation);
    nodeDefs.forEach(TUtils.applyVueNodeTranslation);
  },
  async registerCustomNodes(app) {
    // Register any custom node implementations here allowing for more flexability than a custom node def
    // console.log("[logging]", "register custom nodes");
  },
  loadedGraphNode(node, app) {
    // Fires for each node when loading/dragging/etc a workflow json or png
    // If you break something in the backend and want to patch workflows in the frontend
    // This fires for every node on each load so only log once
    // delete ext.loadedGraphNode;
    TUtils.applyNodeTranslation(node);
  },
  nodeCreated(node, app) {
    // Fires every time a node is constructed
    // You can modify widgets/add handlers/etc here
    TUtils.applyNodeTranslation(node);
  },
};

app.registerExtension(ext);
