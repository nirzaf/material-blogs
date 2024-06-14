

from mkdocs.config.config_options import Type
from mkdocs.config.base import Config

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

# Group plugin configuration
class GroupConfig(Config):
    enabled = Type(bool, default = False)
    plugins = Type((list, dict))
