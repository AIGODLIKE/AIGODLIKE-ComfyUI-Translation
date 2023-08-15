# AIGODLIKE-COMFYUI-TRANSLATION
Multi language translation plugin for [ComfyUI](https://github.com/comfyanonymous/ComfyUI)
## 文档
1. 中文
2. English
## 简介
AIGODLIKE-COMFYUI-TRANSLATION 是ComfyUI的界面翻译插件, 该插件中实现了对常驻菜单栏/搜索栏/右键上下文菜单/节点等的翻译.
## 特性
1. 实现了对常驻菜单栏的翻译, 包括设置对话框中内容的翻译
2. 对双击左键的搜索栏实现了翻译
3. 对右键上下文菜单(新增节点,节点分类)实现了翻译
4. 对节点实现了翻译, 包含节点的标题/接头(输入输出)/节点组件属性的翻译
5. 实现了动态切换语言, 在设置面板中 `AGLTranslation-language`选择切换, 会自动刷新
6. 可自定义添加翻译配置

## 如何添加翻译语言?
1. 在插件目录中新建`语言名`文件夹(如: example文件夹示例)
2. 在插件目录的LocaleMap.js 中按格式添加语言信息(`语言名`为example, 与上一步一致)
    ```js
    export const LOCALES = {
        "zh-CN": {
            "nativeName": "中文",
            "englishName": "Chinese Simplified"
        },
        "en-US": {
            "nativeName": "English (US)",
            "englishName": "English (US)"
        },
        "example": {
            "nativeName": "exampleDisplayName",
            "englishName": "enName"
        },
    }
    ```
3. 以上两步完成后 重启ComfyUI服务器 即可在设置栏 `AGLTranslation-language` 中找到`exampleDisplayName` 语言类型

## 如何新增自定义翻译?
1. 翻译文件目前分为3种类型
    1. 节点信息翻译(包含节点名, 节点接头, 节点组件) 对应翻译文件 `语言名/Nodes/somenode.json`
    2. 节点分类信息(用于右键新建节点菜单) 对应翻译文件 `语言名/NodeCategory.json`
    2. 菜单信息(包含常驻菜单, 设置面板, 右键上下文菜单, 搜索菜单等) 对应翻译文件 `语言名/Menu.json`
2. 其中 节点信息翻译 可以根据不同节点放置到 `语言名/Nodes/` 下的多个json文件中
3. 所有的翻译文件均为json格式, 请严格按照json文件格式填写

## 格式解释
1. 节点信息翻译
    ```json
    {
        "节点名1": {
            "title": "标题名",
            "inputs": {
                "输入口1": "输入口名1",
                "输入口2": "输入口名2",
                "输入口3": "输入口名3"
            },
            "widgets": {
                "组件1": "组件名1",
                "组件2": "组件名2"
            },
            "outputs": {
                "输出口1": "输出口名1",
                "输出口2": "输出口名2",
                "输出口3": "输出口名3"
            }
        },
        "节点名2": {}
    }
    ```
2. 节点分类信息翻译
    ```json
    {
        "分类1": "分类1翻译",
        "子分类1": "子分类1翻译",
        "分类2": "分类2翻译"
    }
    ```
3. 菜单信息翻译
    ```json
    {
        "菜单控件1": "菜单控件1翻译",
        "菜单控件2": "菜单控件2翻译",
        "Search": "Search[example]",
        "Queue size:": "Queue size[example]:",
        "Queue Prompt": "Queue Prompt[example]",
        "Extra options": "Extra options[example]"
    }
    ```

## 注意事项
1. 应用翻译会覆盖自定义节点名!!!
