# 告别，以及最后的工作

Hi，各位ComfyUI玩家，大家好，我是只剩一瓶辣椒酱，这是第一次，也是应该是最后一次和大家在这里交流。

从这个工具诞生一年多以来，为数十万AI使用者提供了多语言翻译，作为一个翻译者，我很欣慰能看到有人认可我们的开源工作。

但如大家所见，随着ComfyUI_frontend和客户端的推出，这一套缝缝补补的翻译系统，不再能适应新的框架，同时ComfyUI推出了更先进的内置翻译。

所以，在和ComfyUI作者和官方人员沟通之后，我们决定停止维护这个工具，并将之后的贡献核心转到ComfyUI本身。

接下来

1. 我们将争取迁移现有词条到ComfyUI核心。（避免数以万计的中文区视频/文章，因语言发生歧义）。
   
2. 仍旧维护一段时间，以确保使用翻译的老用户能够继续用一段时间。
   
3. 引导对翻译感兴趣的翻译者，加入到ComfyUI官方社区对翻译进行完善和修正。
   
关于详细内容->大家可以来看下这篇文章https://blog.comfy.org/p/native-localization-support-i18n

最后，感谢大家一年多以来的信赖，感谢各位通宵达旦提供词条的翻译者，以及强行开发而脱发严重的开发者们！

愿开源荣光永存！


# AIGODLIKE-ComfyUI-Translation
A plugin for multilingual translation of [ComfyUI](https://github.com/comfyanonymous/ComfyUI)，This plugin implements translation of resident menu bar/search bar/right-click context menu/node, etc

2024/09/06 Support the latest ComfyUI interface

https://github.com/user-attachments/assets/9418fba8-f499-4414-9c7f-4d548ff77c49

## ComfyUI users in other languages, I need your help
I hope ComfyUI can support more languages besides Chinese and English, such as French, German, Japanese, Korean, etc. However, I believe that translation should be done by native speakers of each language. So I need your help, let's go fight for ComfyUI together!

**[Korean] Korean translation needs help~**

**[Japanese] Japanese translation needs help~**


## Language supported

|COMFYUI Translation|简体中文|繁體中文|English|日本語|한국어|Русский|Your language|
|:----|:----|:----|:----|:----|:----|:----|:----|
|Menu|√|√|√|√|√|√|TODO|
|NodeCategory|√|√|√|√|√|√|TODO|
|Nodes|√|√|√|√|√|√|TODO|
## Function
1. Translate all UI of ComfyUI
![image](https://github.com/AIGODLIKE/AIGODLIKE-COMFYUI-TRANSLATION/assets/116185401/323f3f84-e9c0-421e-9089-470e5a5ac350)
![image](https://github.com/AIGODLIKE/AIGODLIKE-COMFYUI-TRANSLATION/assets/116185401/620d274a-3fb5-430e-8584-2705e9fbeb4c)
![image](https://github.com/AIGODLIKE/AIGODLIKE-COMFYUI-TRANSLATION/assets/116185401/ab711245-c4f0-43ec-b22b-7191bbd66e40)
2. Direct language switching (limitation: custom names will be removed)
https://github.com/AIGODLIKE/AIGODLIKE-COMFYUI-TRANSLATION/assets/116185401/e43182b7-8932-4358-bc65-ade7bddf27c5
3. Support for adding other languages
4. Support translation custom nodes
5. **(2023/8/16)** Support one-click switching between English/currently set language
6. **(2023/8/19)** Support for multilingual translation of custom nodes * (in production)

|Custom Node Name|简中|繁中|English|日本語|한국어|Русский|
|:----|:----|:----|:----|:----|:----|:----|
|[3D-MeshTool](https://github.com/807502278/ComfyUI-3D-MeshTool.git)|√|TODO|√|TODO|TODO|TODO|
|[3D-Pack](https://github.com/MrForExample/ComfyUI-3D-Pack)|√|TODO|√|TODO|TODO|TODO|
|[Advanced Encode](https://github.com/BlenderNeko/ComfyUI_ADV_CLIP_emb)|√|√|√|TODO|TODO|TODO|
|[Advanced ControlNet](https://github.com/Kosinkadink/ComfyUI-Advanced-ControlNet)|√|√|√|TODO|TODO|TODO|
|[AGL-ComfyUI-Translation](https://github.com/AIGODLIKE/AIGODLIKE-COMFYUI-TRANSLATION)|√|√|√|√|TODO|TODO|
|[AlekPet Nodes](https://github.com/AlekPet/ComfyUI_Custom_Nodes_AlekPet)|√|√|√|√|TODO|TODO|
|[AnimateAnyone](https://github.com/MrForExample/ComfyUI-AnimateAnyone-Evolved.git)|√|TODO|√|TODO|TODO|TODO|
|[AnimateDiff](https://github.com/ArtVentureX/comfyui-animatediff)|√|√|√|√|TODO|TODO|
|[AnimateDiff-Evolved](https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git)|√|√|√|TODO|TODO|TODO|
|[AnyLine](https://github.com/TheMistoAI/ComfyUI-Anyline.git)|√|TODO|√|TODO|TODO|TODO|
|[AnyText](https://github.com/zmwv823/ComfyUI-AnyText.git)|√|TODO|√|TODO|TODO|TODO|
|[Automatic CFG](https://github.com/Extraltodeus/ComfyUI-AutomaticCFG.git)|√|TODO|√|TODO|TODO|TODO|
|[BiRefNet](https://github.com/viperyl/ComfyUI-BiRefNet.git)|√|TODO|√|TODO|TODO|TODO|
|[BiRefNet Hugo](https://github.com/MoonHugo/ComfyUI-BiRefNet-Hugo.git)|√|TODO|√|TODO|TODO|TODO|
|[BitsandBytes NF4](https://github.com/comfyanonymous/ComfyUI_bitsandbytes_NF4.git)|√|TODO|√|TODO|TODO|TODO|
|[BrushNet (kijai)](https://github.com/kijai/ComfyUI-BrushNet-Wrapper.git)|√|TODO|√|TODO|TODO|TODO|
|[BrushNet (nullquant)](https://github.com/nullquant/ComfyUI-BrushNet.git)|√|TODO|√|TODO|TODO|TODO|
|[Bxb](https://github.com/zhulu111/ComfyUI_Bxb.git)|√|TODO|√|TODO|TODO|TODO|
|[CCSR](https://github.com/kijai/ComfyUI-CCSR.git)|√|TODO|√|TODO|TODO|TODO|
|[Champ](https://github.com/chaojie/ComfyUI-Champ.git)|√|TODO|√|TODO|TODO|TODO|
|[CLIP Seg](https://github.com/biegert/ComfyUI-CLIPSeg)|√|√|√|√|TODO|TODO|
|[CogVideo](https://github.com/kijai/ComfyUI-CogVideoXWrapper.git)|√|TODO|√|TODO|TODO|TODO|
|[ComfyRoll](https://github.com/RockOfFire/ComfyUI_Comfyroll_CustomNodes)|√|√|√|TODO|TODO|TODO|
|[ControlNet LLLite](https://github.com/kohya-ss/ControlNet-LLLite-ComfyUI)|√|√|√|TODO|TODO|TODO|
|[ControlNet Preprocessors](https://github.com/Fannovel16/comfy_controlnet_preprocessors)|√|√|√|√|TODO|TODO|
|[ControlNet Preprocessors AUX](https://github.com/Fannovel16/comfyui_controlnet_aux)|√|√|√|√|TODO|TODO|
|[ControlNeXt SVD](https://github.com/kijai/ComfyUI-ControlNeXt-SVD.git)|√|TODO|√|TODO|TODO|TODO|
|[Crystools](https://github.com/crystian/ComfyUI-Crystools.git)|√|TODO|√|TODO|TODO|√|
|[Cutoff](https://github.com/BlenderNeko/ComfyUI_Cutoff)|√|√|√|√|TODO|TODO|
|[Custom-Scripts](https://github.com/pythongosssss/ComfyUI-Custom-Scripts)|√|√|√|TODO|TODO|TODO|
|[cg-use-everywhere](https://github.com/chrisgoringe/cg-use-everywhere.git)|√|TODO|√|TODO|TODO|TODO|
|[cg-image-picker](https://github.com/chrisgoringe/cg-image-picker.git)|√|TODO|√|TODO|TODO|TODO|
|[Davemane42 Nodes](https://github.com/Davemane42/ComfyUI_Dave_CustomNode)|√|√|√|√|TODO|TODO|
|[Dagthomas Nodes](https://github.com/dagthomas/comfyui_dagthomas)|√|√|√|√|TODO|TODO|
|[Derfuu Nodes](https://github.com/Derfuu/Derfuu_ComfyUI_ModdedNodes.git)|√|TODO|√|TODO|TODO|TODO|
|[DynamiCrafter (kijai)](https://github.com/kijai/ComfyUI-DynamiCrafterWrapper.git)|√|TODO|√|TODO|TODO|TODO|
|[DynamiCrafter (ExponentialML)](https://github.com/ExponentialML/ComfyUI_Native_DynamiCrafter.git)|√|TODO|√|TODO|TODO|TODO|
|[DynamicThresholding](https://github.com/mcmonkeyprojects/sd-dynamic-thresholding)|√|√|√|TODO|TODO|TODO|
|[EasyAnimate (chaojie)](https://github.com/chaojie/ComfyUI-EasyAnimate.git)|√|TODO|√|TODO|TODO|TODO|
|[EasyAnimate (kijai)](https://github.com/kijai/ComfyUI-EasyAnimateWrapper.git)|√|TODO|√|TODO|TODO|TODO|
|[Easy Tools](https://github.com/jafshare/ComfyUI-Easy-Tools)|√|TODO|√|TODO|TODO|TODO|
|[Easy Use](https://github.com/yolain/ComfyUI-Easy-Use)|√|TODO|√|TODO|TODO|TODO|
|[Eesahes Nodes](https://github.com/EeroHeikkinen/ComfyUI-eesahesNodes.git)|√|TODO|√|TODO|TODO|TODO|
|[Efficiency Nodes](https://github.com/LucianoCirino/efficiency-nodes-comfyui)|√|√|√|√|TODO|TODO|
|[ELLA (ExponentialML)](https://github.com/ExponentialML/ComfyUI_ELLA.git)|√|TODO|√|TODO|TODO|TODO|
|[ELLA (Tencent)](https://github.com/TencentQQGYLab/ComfyUI-ELLA.git)|√|TODO|√|TODO|TODO|TODO|
|[EllangoK Postprocessing](https://github.com/EllangoK/ComfyUI-post-processing-nodes)|√|√|√|TODO|TODO|TODO|
|[Essentials](https://github.com/cubiq/ComfyUI_essentials.git)|√|TODO|√|TODO|TODO|TODO|
|[Execution-Inversion](https://github.com/BadCafeCode/execution-inversion-demo-comfyui.git)|√|TODO|√|TODO|TODO|TODO|
|[ExLlama nodes](https://github.com/Zuellni/ComfyUI-ExLlama-Nodes)|√|√|√|TODO|TODO|TODO|
|[experiments](https://github.com/comfyanonymous/ComfyUI_experiments)|√|√|√|TODO|TODO|TODO|
|[Face Analysis](https://github.com/cubiq/ComfyUI_FaceAnalysis.git)|√|TODO|√|TODO|TODO|TODO|
|[Fast Decode](https://github.com/nagolinc/ComfyUI_FastVAEDecorder_SDXL)|√|√|√|√|TODO|TODO|
|[Florence2](https://github.com/kijai/ComfyUI-Florence2.git)|√|TODO|√|TODO|TODO|TODO|
|[Flowty CRM](https://github.com/flowtyone/ComfyUI-Flowty-CRM.git)|√|TODO|√|TODO|TODO|TODO|
|[Flowty TripoSR](https://github.com/flowtyone/ComfyUI-Flowty-TripoSR.git)|√|TODO|√|TODO|TODO|TODO|
|[Frame Interpolation](https://github.com/Fannovel16/ComfyUI-Frame-Interpolation.git)|√|TODO|√|TODO|TODO|TODO|
|[FreeU Advanced](https://github.com/WASasquatch/FreeU_Advanced)|√|TODO|√|TODO|TODO|TODO|
|[IC-Light (kijai)](https://github.com/kijai/ComfyUI-IC-Light.git)|√|TODO|√|TODO|TODO|TODO|
|[IC-Light-Wrapper (kijai)](https://github.com/kijai/ComfyUI-IC-Light-Wrapper.git)|√|TODO|√|TODO|TODO|TODO|
|[IF AI tools](https://github.com/if-ai/ComfyUI-IF_AI_tools.git)|√|TODO|√|TODO|TODO|TODO|
|[Image Resize](https://github.com/palant/image-resize-comfyui.git)|√|TODO|√|TODO|TODO|TODO|
|[Instant Mesh](https://github.com/jtydhr88/ComfyUI-InstantMesh.git)|√|TODO|√|TODO|TODO|TODO|
|[IPAdapter](https://github.com/laksjdjf/IPAdapter-ComfyUI)|√|√|√|TODO|TODO|TODO|
|[IPAdapter_plus](https://github.com/cubiq/ComfyUI_IPAdapter_plus)|√|√|√|TODO|TODO|TODO|
|[Image Grid](https://github.com/LEv145/images-grid-comfy-plugin)|√|√|√|TODO|TODO|TODO|
|[Impact Pack](https://github.com/ltdrdata/ComfyUI-Impact-Pack)|√|√|√|TODO|TODO|TODO|
|[Impact Subpack](https://github.com/ltdrdata/ComfyUI-Impact-Subpack)|√|√|√|TODO|TODO|TODO|
|[Inpaint CropAndStitch](https://github.com/lquesada/ComfyUI-Inpaint-CropAndStitch.git)|√|TODO|√|TODO|TODO|TODO|
|[Inpaint Nodes](https://github.com/Acly/comfyui-inpaint-nodes.git)|√|TODO|√|TODO|TODO|TODO|
|[Inspire Pack](https://github.com/ltdrdata/ComfyUI-Inspire-Pack)|√|√|√|TODO|TODO|TODO|
|[InstantID (cubiq)](https://github.com/cubiq/ComfyUI_InstantID.git)|√|TODO|√|TODO|TODO|TODO|
|[InstantID (ZHO)](https://github.com/ZHO-ZHO-ZHO/ComfyUI-InstantID.git)|√|TODO|√|TODO|TODO|TODO|
|[Joy Caption](https://github.com/StartHua/Comfyui_CXH_joy_caption.git)|√|TODO|√|TODO|TODO|TODO|
|[KJ Nodes](https://github.com/kijai/ComfyUI-KJNodes.git)|√|TODO|√|TODO|TODO|TODO|
|[kkTranslator](https://github.com/AIGCTeam/ComfyUI_kkTranslator_nodes.git)|√|TODO|√|TODO|TODO|TODO|
|[Kolors (kijai)](https://github.com/kijai/ComfyUI-KwaiKolorsWrapper.git)|√|TODO|√|TODO|TODO|TODO|
|[Kolors (MinusZone)](https://github.com/MinusZoneAI/ComfyUI-Kolors-MZ.git)|√|TODO|√|TODO|TODO|TODO|
|[LaMa Preprocessor](https://github.com/mlinmg/ComfyUI-LaMA-Preprocessor)|√|TODO|√|TODO|TODO|TODO|
|[Latent2RGB](https://github.com/bvhari/ComfyUI_LatentToRGB)|√|√|√|√|TODO|TODO|
|[LayerDiffuse](https://github.com/huchenlei/ComfyUI-layerdiffuse)|√|TODO|√|TODO|TODO|TODO|
|[LayerStyle](https://github.com/chflame163/ComfyUI_LayerStyle)|√|TODO|√|TODO|TODO|TODO|
|[LCM](https://github.com/0xbitches/ComfyUI-LCM)|√|TODO|√|TODO|TODO|TODO|
|[Literals](https://github.com/M1kep/ComfyLiterals.git)|√|TODO|√|TODO|TODO|TODO|
|[LivePortrait(KJ)](https://github.com/kijai/ComfyUI-LivePortraitKJ.git)|√|TODO|√|TODO|TODO|TODO|
|[LivePortrait-Advanced](https://github.com/PowerHouseMan/ComfyUI-AdvancedLivePortrait.git)|√|TODO|√|TODO|TODO|TODO|
|[LoadLoraWithTags](https://github.com/Extraltodeus/LoadLoraWithTags.git)|√|TODO|√|TODO|TODO|TODO|
|[Logic](https://github.com/theUpsider/ComfyUI-Logic.git)|√|TODO|√|TODO|TODO|TODO|
|[LoraAutoTrigger](https://github.com/idrirap/ComfyUI-Lora-Auto-Trigger-Words.git)|√|TODO|√|TODO|TODO|TODO|
|[MagicClothing](https://github.com/frankchieng/ComfyUI_MagicClothing.git)|√|TODO|√|TODO|TODO|TODO|
|[Manager](https://github.com/ltdrdata/ComfyUI-Manager)|√|√|√|TODO|TODO|√|
|[Marigold](https://github.com/kijai/ComfyUI-Marigold.git)|√|TODO|√|TODO|TODO|TODO|
|[Masquerade Nodes](https://github.com/BadCafeCode/masquerade-nodes-comfyui)|√|√|√|TODO|TODO|TODO|
|[Math](https://github.com/evanspearman/ComfyMath.git)|√|TODO|√|TODO|TODO|TODO|
|[Mixlab Nodes](https://github.com/shadowcz007/comfyui-mixlab-nodes.git)|√|TODO|√|TODO|TODO|TODO|
|[MoonDream](https://github.com/kijai/ComfyUI-moondream.git)|√|TODO|√|TODO|TODO|TODO|
|[MotionCtrl](https://github.com/chaojie/ComfyUI-MotionCtrl)|√|TODO|√|TODO|TODO|TODO|
|[MotionCtrl-SVD](https://github.com/chaojie/ComfyUI-MotionCtrl-SVD)|√|TODO|√|TODO|TODO|TODO|
|[MTB](https://github.com/melMass/comfy_mtb.git)|√|TODO|√|TODO|TODO|TODO|
|[N-Sidebar](https://github.com/Nuked88/ComfyUI-N-Sidebar.git)|√|TODO|√|TODO|TODO|TODO|
|[Noise](https://github.com/BlenderNeko/ComfyUI_Noise)|√|√|√|TODO|TODO|TODO|
|[NormalLighting](https://github.com/TJ16th/comfyUI_TJ_NormalLighting.git)|√|TODO|√|TODO|TODO|TODO|
|[Paint By Example](https://github.com/Kangkang625/ComfyUI-paint-by-example.git)|√|TODO|√|TODO|TODO|TODO|
|[Perturbed-Attention](https://github.com/pamparamm/sd-perturbed-attention.git)|√|TODO|√|TODO|TODO|TODO|
|[Portrai Master](https://github.com/florestefano1975/comfyui-portrait-master.git)|√|TODO|√|TODO|TODO|TODO|
|[Power Noise Suite](https://github.com/WASasquatch/PowerNoiseSuite)|√|TODO|√|TODO|TODO|TODO|
|[Prompt Composer](https://github.com/florestefano1975/comfyui-prompt-composer.git)|√|TODO|√|TODO|TODO|TODO|
|[Prompt MZ](https://github.com/MinusZoneAI/ComfyUI-Prompt-MZ.git)|√|TODO|√|TODO|TODO|TODO|
|[Prompt Reader](https://github.com/receyuki/comfyui-prompt-reader-node)|√|TODO|√|TODO|TODO|TODO|
|[PuLID (cubiq)](https://github.com/cubiq/PuLID_ComfyUI.git)|√|TODO|√|TODO|TODO|TODO|
|[QR](https://github.com/coreyryanhanson/comfy-qr)|√|√|√|TODO|TODO|TODO|
|[Quick Connections](https://github.com/niknah/quick-connections.git)|√|TODO|√|TODO|TODO|TODO|
|[Omost](https://github.com/huchenlei/ComfyUI_omost.git)|√|TODO|√|TODO|TODO|TODO|
|[OneButtonPrompt](https://github.com/AIrjen/OneButtonPrompt)|√|TODO|√|TODO|TODO|TODO|
|[ReActor](https://github.com/Gourieff/comfyui-reactor-node)|√|TODO|√|TODO|TODO|TODO|
|[ResAdapter](https://github.com/jiaxiangc/ComfyUI-ResAdapter.git)|√|TODO|√|TODO|TODO|TODO|
|[Restart-Sampling](https://github.com/ssitu/ComfyUI_restart_sampling)|√|√|√|TODO|TODO|TODO|
|[Roop](https://github.com/Navezjt/ComfyUI_roop.git)|√|TODO|√|TODO|TODO|TODO|TODO|
|[rgthree](https://github.com/rgthree/rgthree-comfy.git)|√|TODO|√|TODO|TODO|TODO|
|[SD-Latent-Interposer](https://github.com/city96/SD-Latent-Interposer)|√|TODO|√|TODO|TODO|TODO|
|[SDXL_prompt_styler](https://github.com/twri/sdxl_prompt_styler)|√|√|√|TODO|TODO|TODO|
|[SeargeSDXL](https://github.com/SeargeDP/SeargeSDXL)|√|√|√|TODO|TODO|TODO|
|[Segment Anything](https://github.com/storyicon/comfyui_segment_anything.git)|√|TODO|√|TODO|TODO|TODO|
|[Segment Anything 2](https://github.com/kijai/ComfyUI-segment-anything-2.git)|√|TODO|√|TODO|TODO|TODO|
|[StabilityNodes](https://github.com/Stability-AI/stability-ComfyUI-nodes)|√|√|√|TODO|TODO|TODO|
|[SUPIR](https://github.com/kijai/ComfyUI-SUPIR.git)|√|TODO|√|TODO|TODO|TODO|
|[TiledDiffusion](https://github.com/shiimizu/ComfyUI-TiledDiffusion)|√|TODO|√|TODO|TODO|TODO|
|[TiledKSampler](https://github.com/BlenderNeko/ComfyUI_TiledKSampler)|√|√|√|√|TODO|TODO|
|[TinyTerra](https://github.com/TinyTerra/ComfyUI_tinyterraNodes.git)|√|TODO|√|TODO|TODO|TODO|TODO|
|[ToonCrafter](https://github.com/AIGODLIKE/ComfyUI-ToonCrafter.git)|√|TODO|√|TODO|TODO|TODO|TODO|
|[TripoAPI](https://github.com/VAST-AI-Research/ComfyUI-Tripo.git)|√|TODO|√|TODO|TODO|TODO|
|[UltimateSDUpscale](https://github.com/ssitu/ComfyUI_UltimateSDUpscale)|√|√|√|TODO|TODO|TODO|
|[Vextra Nodes](https://github.com/diontimmer/ComfyUI-Vextra-Nodes)|√|√|√|TODO|TODO|TODO|
|[Video Matting](https://github.com/Fannovel16/ComfyUI-Video-Matting.git)|√|TODO|√|TODO|TODO|TODO|
|[Visual Style Prompting](https://github.com/ExponentialML/ComfyUI_VisualStylePrompting.git)|√|TODO|√|TODO|TODO|TODO|
|[VLM Nodes](https://github.com/gokayfem/ComfyUI_VLM_nodes.git)|√|TODO|√|TODO|TODO|TODO|
|[WAS Suite](https://github.com/WASasquatch/was-node-suite-comfyui)|√|√|√|TODO|TODO|TODO|
|[WD14-Tagger](https://github.com/pythongosssss/ComfyUI-WD14-Tagger)|√|√|√|TODO|TODO|TODO|
|[zfkun](https://github.com/zfkun/ComfyUI_zfkun.git)|√|TODO|√|TODO|TODO|TODO|

The above only includes translations for the UI. If you are a developer and need me to help you translate your interface, you can go directly to the [ComfyUI Plugins List](https://github.com/WASasquatch/comfyui-plugins) to add your custom node project, or send an issue, as long as I can see it, I will translate it (it will take some time)

## How to install
AIGODLIKE-COMFYUI-TRANSLATION is equivalent to a custom node, you can use any method you like, just put it in folder custom_nodes
Then run:
```sh
cd ComfyUI/custom_nodes
git clone https://github.com/AIGODLIKE/AIGODLIKE-COMFYUI-TRANSLATION.git
```
![image](https://github.com/AIGODLIKE/AIGODLIKE-COMFYUI-TRANSLATION/assets/116185401/44de967d-2611-4f07-a795-9b28169d51f5)
## How to use
For new UI:
![1481d583968e3b626e366d2ad2faf62c](https://github.com/user-attachments/assets/9fcfcca7-7666-419d-adfa-2a2eccbd921e)


For legacy UI:
![image](https://github.com/AIGODLIKE/AIGODLIKE-COMFYUI-TRANSLATION/assets/116185401/74d184ac-e7ef-4059-bd5e-dfb6fd4a64ac)

## How to add other languages（translator）
1. Create a new 'Language Name' folder in the plugin directory (e.g. example folder)
![image](https://github.com/AIGODLIKE/AIGODLIKE-COMFYUI-TRANSLATION/assets/116185401/1288e2ca-aef2-4810-a718-2458261d9153)

2. Find the LocaleMap.js file and add the language code with the same name as the first step folder in it
![image](https://github.com/AIGODLIKE/AIGODLIKE-COMFYUI-TRANSLATION/assets/116185401/443f36f7-aeaf-4359-b55c-a6287d3ad1ef)
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
3. After completing the above two steps, restart the ComfyUI service to find the 'exampleDisplayName' language type in the 'AGLTranslation language' settings bar
![image](https://github.com/AIGODLIKE/AIGODLIKE-COMFYUI-TRANSLATION/assets/116185401/f3ea8ab6-8626-4470-a6e0-d8eee50358aa)

## How to add custom node translations（translator）
1. Translation files are currently divided into three types
    1. Node information translation (including node name, node connector, node component) corresponding translation file `Your language folder/Nodes/somenode.json`
    2. Node classification information (used for right-click the new node menu) corresponds to the translation file `Your language folder/NodeCategory.json`
    2. Menu information (including resident menu, settings panel, right-click context menu, search menu, etc.) corresponds to translated files `Your language folder/Menu.json`
2. Node information translation can be placed in multiple JSON files under 'Your language folder/Nodes/' based on different nodes
3. All translation files are in JSON format, please fill in strictly according to the JSON file format

### Translation examples
1. Node Translation Format
    ```json
    {
        "KSampler": {
            "title": "KSampler[example translation]",
            "inputs": {
                "model": "模型",
                "positive": "正向提示词",
                "negative": "反向提示词",
                "latent_image": "潜空间"
            },
            "widgets": {
                "seed": "随机种",
                "control_after_generate": "运行后操作",
                "steps": "步数",
                "cfg": "CFG",
                "sampler_name": "采样器",
                "scheduler": "调度器",
                "denoise": "降噪"
            },
            "outputs": {
                "LATENT": "潜空间",
            }
        },
        "Load VAE": {}
    }
    ```
2. Node classification translation format
    ```json
    {
        "Add Node": "Add Node[example]",
        "Add Group": "Add Group[example]",
        "Search": "Search[example]",
        "Queue size:": "Queue size[example]:",
        "Queue Prompt": "Queue Prompt[example]",
        "Extra options": "Extra options[example]"
    }
    ```
3. Menu information translation format
    ```json
    {
        "conditioning": "conditioning[example]",
        "latent": "latent[example]",
        "loaders": "loaders[example]",
        "image": "image[example]"
    }
    ```

## Limitations
1. Supports direct switching of any language node to the target language, but will lose custom names
2. A small portion of options that use Enum type data cannot be translated
![image](https://github.com/AIGODLIKE/AIGODLIKE-COMFYUI-TRANSLATION/assets/116185401/b9684863-4342-4cc8-a790-efd44d792c95)




