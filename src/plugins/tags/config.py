

from mkdocs.config.config_options import Optional, Type
from mkdocs.config.base import Config


# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

# Tags plugin configuration
class TagsConfig(Config):
    enabled = Type(bool, default = True)

    # Settings for tags
    tags = Type(bool, default = True)
    tags_file = Optional(Type(str))
