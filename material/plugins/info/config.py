

from mkdocs.config.config_options import Type
from mkdocs.config.base import Config

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

# Info plugin configuration
class InfoConfig(Config):
    enabled = Type(bool, default = True)
    enabled_on_serve = Type(bool, default = False)

    # Settings for archive
    archive = Type(bool, default = True)
    archive_stop_on_violation = Type(bool, default = True)
