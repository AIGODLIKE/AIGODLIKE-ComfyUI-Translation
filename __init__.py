import os
import json
import platform
import sys
import numpy as np
import builtins
import torch
import shutil
import hashlib
import atexit
import server
import gc
import execution
import folder_paths
from functools import lru_cache
from aiohttp import web
from pathlib import Path
from PIL import Image
from PIL.PngImagePlugin import PngInfo

VERSION = "0.0.1"
ADDON_NAME = "AIGODLIKE-COMFYUI-TRANSLATION"
COMFY_PATH = Path(folder_paths.__file__).parent
CUR_PATH = Path(__file__).parent


def try_get_json(path: Path):
    for coding in {"utf-8", "gbk"}:
        try:
            return json.loads(path.read_text(encoding=coding))
        except Exception:
            continue
    return {}


def get_nodes_translation(locale):
    path = CUR_PATH.joinpath(locale, "Nodes")
    if not path.exists():
        path = CUR_PATH.joinpath("en_US")
    if not path.exists():
        return {}
    translations = {}
    for jpath in path.glob("*.json"):
        translations.update(try_get_json(jpath))
    return translations


def get_category_translation(locale):
    path = CUR_PATH.joinpath(locale, "NodeCategory.json")
    if not path.exists():
        path = CUR_PATH.joinpath("en_US", "NodeCategory.json")
    if not path.exists():
        return {}
    return try_get_json(path)


def get_menu_translation(locale):
    path = CUR_PATH.joinpath(locale, "Menu.json")
    if not path.exists():
        path = CUR_PATH.joinpath("en_US", "Menu.json")
    if not path.exists():
        return {}
    return try_get_json(path)


@lru_cache
def compile_translation(locale):
    # translations_path = CUR_PATH.joinpath(f"translations_{locale}.json")
    # if translations_path.exists():
    #     return try_get_json(translations_path)
    # Nodes
    nodes_translation = get_nodes_translation(locale)
    # NodeCategory
    node_category_translation = get_category_translation(locale)
    # Menus
    menu_translation = get_menu_translation(locale)
    # compile
    json_data = json.dumps(obj={"Nodes": nodes_translation,
                                "NodeCategory": node_category_translation,
                                "Menu": menu_translation
                                },
                           ensure_ascii=False)
    # translations_path.write_text(json_data, encoding="utf-8")
    return json_data


@server.PromptServer.instance.routes.post("/agl/get_translation")
async def get_translation(request):
    post = await request.post()
    locale = post.get("locale", "en_US")
    json_data = "{}"
    try:
        json_data = compile_translation(locale)
    except Exception as e:
        sys.stderr.write(f"[agl/get_translation error]: {e}\n")
        sys.stderr.flush()
    return web.Response(status=200, body=json_data)


def rmtree(path: Path):
    # unlink symbolic link
    if Path(path.resolve()).as_posix() != path.as_posix():
        path.unlink()
        return
    if not path.exists():
        return
    if path.is_file():
        path.unlink()
    elif path.is_dir():
        # 移除 .git
        if path.name == ".git":
            if platform.system() == "darwin":
                from subprocess import call
                call(['rm', '-rf', path.as_posix()])
            elif platform.system() == "Windows":
                os.system(f'rd/s/q "{path.as_posix()}"')
            return
        for child in path.iterdir():
            rmtree(child)
        try:
            path.rmdir()  # nas 的共享盘可能会有残留
        except BaseException:
            ...


def register():
    aigodlike_ext_path = COMFY_PATH.joinpath("web", "extensions", ADDON_NAME)
    rmtree(aigodlike_ext_path)
    try:
        if os.name == "nt":
            import _winapi
            _winapi.CreateJunction(CUR_PATH.as_posix(), aigodlike_ext_path.as_posix())
        else:
            # 复制时过滤 .git
            shutil.copytree(CUR_PATH.as_posix(), aigodlike_ext_path.as_posix(), ignore=shutil.ignore_patterns(".git"))
    except Exception as e:
        sys.stderr.write(f"[agl/register error]: {e}\n")
        sys.stderr.flush()
    return
    aigodlike_ext_path.mkdir(parents=True, exist_ok=True)
    # 复制所有js文件
    for data in CUR_PATH.glob("*.js"):
        shutil.copy(data, aigodlike_ext_path)
    # shutil.copy(CUR_PATH.joinpath("main.js"), aigodlike_ext_path)

    # combine jsons into one
    # translations_path = CUR_PATH.joinpath("translations.json")
    # translations = {}
    # for data in CUR_PATH.glob("*.json"):
    #     if data.name == "translations.json":
    #         continue
    #     try:
    #         json_data = json.loads(data.read_text(encoding="utf-8"))
    #     except UnicodeDecodeError:
    #         json_data = json.loads(data.read_text(encoding="gbk"))
    #     translations.update(json_data)
    # translations_path.write_text(json.dumps(translations, indent=4, ensure_ascii=False), encoding="utf-8")
    # 文件复制 translations.json main.js
    # shutil.copy(translations_path, aigodlike_ext_path)


def unregister():
    # 移除缓存json
    # for data in CUR_PATH.glob("*.json"):
    #     if not data.name.startswith("translations_"):
    #         continue
    #     data.unlink()

    aigodlike_ext_path = COMFY_PATH.joinpath("web", "extensions", ADDON_NAME)
    try:
        rmtree(aigodlike_ext_path)
    except BaseException:
        ...


register()
atexit.register(unregister)
NODE_CLASS_MAPPINGS = {}
