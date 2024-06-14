

from mkdocs.config.config_options import Type
from mkdocs.config.base import Config

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

# Offline plugin configuration
class OfflineConfig(Config):
    enabled = Type(bool, default = True)
