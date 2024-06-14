

from mkdocs.config.base import Config
from mkdocs.config.config_options import ListOfItems, Optional, Type

from .options import PostDate

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

# Post configuration
class PostConfig(Config):
    authors = ListOfItems(Type(str), default = [])
    categories = ListOfItems(Type(str), default = [])
    date = PostDate()
    draft = Optional(Type(bool))
    readtime = Optional(Type(int))
    slug = Optional(Type(str))
