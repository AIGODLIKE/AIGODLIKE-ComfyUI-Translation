class TExe {
  static T = null;
  MT(txt) {
    return this.T?.Menu?.[txt] || this.T?.Menu?.[txt?.trim?.()];
  }

  constructor() {
    this.excludeClass = ["lite-search-item-type"];
  }

  tSkip(node) {
    // 是否需要跳过翻译?
    // 判断node.classList 是否包含 excludeClass中的一个
    return this.excludeClass.some((cls) => node.classList?.contains(cls));
  }

  translateKjPopDesc(node) {
    let T = this.T;
    if (!T) return false;
    if (!node || !node.querySelectorAll) return false;
    if (!node?.classList?.contains("kj-documentation-popup")) return false;
    const allElements = node.querySelectorAll("*");

    for (const ele of allElements) {
      this.replaceText(ele);
    }
    return true;
  }

  translateAllText(node) {
    let T = this.T;
    if (!T) return;
    if (!node || !node.querySelectorAll) return;
    const allElements = node.querySelectorAll("*");

    for (const ele of allElements) {
      // let targetLangText = this.MT(ele.innerText) || this.MT(ele.value) || this.MT(ele.title);
      // if (!targetLangText) {
      //   if (ele.nodeName === "INPUT" && ele.type === "button") {
      //     targetLangText = this.MT(ele.value);
      //     if (!targetLangText) continue;
      //     ele.value = targetLangText;
      //   }else if (ele.childNodes?.length > 1) {
      //     this.replaceText(ele);
      //   }
      //   continue;
      // }
      this.replaceText(ele);
    }
  }

  replaceText(target) {
    if (!target) return;
    if (!this.T) return;
    if (this.tSkip(target)) return;
    for (const childNode of target.childNodes || [])
      this.replaceText(childNode);
    this.replaceText(target.firstChild);
    // 翻译target
    if (target.nodeType === Node.TEXT_NODE) {
      if (target.nodeValue)
        target.nodeValue = this.MT(target.nodeValue) || target.nodeValue;
    }
    else if (target.nodeType === Node.ELEMENT_NODE) {
      if (target.title)
        target.title = this.MT(target.title) || target.title;

      if (target.nodeName === "INPUT" && target.type === "button") {
        target.value = this.MT(target.value) || target.value;
      }

      if (target.innerText && this.MT(target.innerText))
      {
        target.innerText = this.MT(target.innerText);
      }
      
      if (target.textContent && this.MT(target.textContent))
      {
        target.textContent = this.MT(target.textContent);
      }
    }else if(target.nodeType === Node.COMMENT_NODE){
      // pass
    }
  }
}
let texe = new TExe();

export function applyMenuTranslation(T) {
  texe.T = T;
  texe.translateAllText(document.querySelector(".litegraph"));
  for (let node of document.querySelectorAll(".comfy-modal"))
    observeFactory(node, (mutationsList, observer) => {
      for (let mutation of mutationsList) {
        texe.translateAllText(mutation.target);
      }
    });
  // texe.translateAllText(window.comfyAPI?.app?.app?.menu?.element);
  observeFactory(document.querySelector(".comfyui-menu"), handleComfyNewUIMenu, true);
  for (let node of document.querySelectorAll(".comfyui-popup"))
    observeFactory(node, handleComfyNewUIMenu, true);
  const viewHistoryButton = document.getElementById("comfy-view-history-button");
  const viewQueueButton = document.getElementById("comfy-view-queue-button");

  [viewHistoryButton, viewQueueButton].map((btn) => {
    observeFactory(btn, (mutationsList, observer) => {
      observer.disconnect();
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          const translatedValue = texe.MT(mutation.target.textContent);
          if (!translatedValue) continue;
          mutation.target.innerText = translatedValue;
        }
      }
      observer.observe(btn, { childList: true, attributes: true });
    });
  });

  const comfySettingDialog = document.querySelector("#comfy-settings-dialog");

  // 老版 settings面板的翻译
  if(comfySettingDialog?.querySelector("tbody")){
    observeFactory(comfySettingDialog.querySelector("tbody"), handleComfySettingDialogObserver);
  }

  observeFactory(document.querySelector(".comfy-menu"), handleViewQueueComfyListObserver);

  observeFactory(document.querySelector(".comfy-menu").querySelectorAll(".comfy-list")[0], handleViewQueueComfyListObserver);

  observeFactory(document.querySelector(".comfy-menu").querySelectorAll(".comfy-list")[1], handleViewQueueComfyListObserver);

  observeFactory(document.querySelector("body.litegraph"), (mutationsList, observer) => {
    for (let mutation of mutationsList) {
      for (const node of mutation.addedNodes) {
        // if (texe.translateKjPopDesc(node)) continue;
        texe.translateAllText(node);
        // 新版 settings面板的翻译
        if (node.classList?.contains("p-dialog-mask"))
        {
          var dialog = node.querySelector(".p-dialog");
          observeFactory(dialog, (mutationsList, observer) => {
            for (let mutation of mutationsList) {
              texe.translateAllText(mutation.target);
            }
          }, dialog?.role === "dialog");
          continue;
        }
        if (node.classList?.contains("comfy-modal")) {
          observeFactory(node, (mutationsList, observer) => {
            for (let mutation of mutationsList) {
              texe.translateAllText(mutation.target);
            }
          });
        }
      }
    }
  });

  // search box
  observeFactory(document.querySelector(".litegraph"), (mutationsList, observer) => {
    if (observer.ob == undefined) {
      observer.ob = [];
    }
    for (let mutation of mutationsList) {
      if (mutation.removedNodes.length > 0 && observer.ob != undefined) {
        for (let ob of observer.ob) ob.disconnect();
        observer.ob = [];
        break;
      }
      for (const sb of mutation.addedNodes) {
        if (!sb || !sb.querySelector) continue
        var helper = sb.querySelector(".helper");
        if (!helper) continue;
        var ob = observeFactory(helper, (mutationsList, observer) => {
          for (let mutation of mutationsList) {
            for (const item of mutation.addedNodes) {
              if (item.innerText in T.Nodes) {
                item.innerText = T.Nodes[item.innerText]["title"];
              }
            }
          }
        });
        for (let item of helper.querySelectorAll(".lite-search-item")) {
          if (item.innerText in T.Nodes) {
            item.innerText = T.Nodes[item.innerText]["title"];
          }
        }
        observer.ob.push(ob);
      }
    }
  });

  function handleViewQueueComfyListObserver(mutationsList) {
    for (let mutation of mutationsList) {
      texe.replaceText(mutation.target);
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        for (const node of mutation.addedNodes) {
          texe.replaceText(node);
        }
      }
    }
  }

  const translateSettingDialog = () => {
    const comfySettingDialogAllElements = comfySettingDialog.querySelectorAll("*");

    for (const ele of comfySettingDialogAllElements) {
      let targetLangText = texe.MT(ele.innerText);
      let titleText = texe.MT(ele.title);
      if(titleText) ele.title = titleText;
      if (!targetLangText) {
        if (ele.nodeName === "INPUT" && ele.type === "button") {
          targetLangText = texe.MT(ele.value);
          if (!targetLangText) continue;
          ele.value = targetLangText;
        }
        continue;
      }
      texe.replaceText(ele);
    }
  };

  function handleComfySettingDialogObserver(mutationsList) {
    for (let mutation of mutationsList) {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        translateSettingDialog();
      }
    }
  }

  function handleComfyNewUIMenu(mutationsList)
  {
    for (let mutation of mutationsList) {
      texe.translateAllText(mutation.target);
    }
  }
}
export function observeFactory(observeTarget, fn, subtree=false) {
  if (!observeTarget) return;
  const observer = new MutationObserver(function (mutationsList, observer) {
    fn(mutationsList, observer);
  });

  observer.observe(observeTarget, {
    childList: true,
    attributes: true,
    subtree: subtree,
  });
  return observer;
}
