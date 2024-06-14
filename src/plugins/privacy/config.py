

import os

from mkdocs.config.base import Config
from mkdocs.config.config_options import DictOfItems, Type

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

# Privacy plugin configuration
class PrivacyConfig(Config):
    enabled = Type(bool, default = True)
    concurrency = Type(int, default = max(1, os.cpu_count() - 1))

    # Settings for caching
    cache = Type(bool, default = True)
    cache_dir = Type(str, default = ".cache/plugin/privacy")

    # Settings for external assets
    assets = Type(bool, default = True)
    assets_fetch = Type(bool, default = True)
    assets_fetch_dir = Type(str, default = "assets/external")
    assets_expr_map = DictOfItems(Type(str), default = {})
