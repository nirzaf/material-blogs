

from mkdocs.config.base import Config
from mkdocs.config.config_options import DictOfItems, Optional, SubConfig, Type

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

# Author
class Author(Config):
    name = Type(str)
    description = Type(str)
    avatar = Type(str)
    slug = Optional(Type(str))
    url = Optional(Type(str))

# -----------------------------------------------------------------------------

# Authors
class Authors(Config):
    authors = DictOfItems(SubConfig(Author), default = {})
