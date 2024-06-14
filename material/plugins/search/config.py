

from mkdocs.config.config_options import (
    Choice,
    Deprecated,
    Optional,
    ListOfItems,
    Type
)
from mkdocs.config.base import Config
from mkdocs.contrib.search import LangOption

# -----------------------------------------------------------------------------
# Options
# -----------------------------------------------------------------------------

# Options for search pipeline
pipeline = ("stemmer", "stopWordFilter", "trimmer")

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

# Search plugin configuration
class SearchConfig(Config):
    enabled = Type(bool, default = True)

    # Settings for search
    lang = Optional(LangOption())
    separator = Optional(Type(str))
    pipeline = Optional(ListOfItems(Choice(pipeline)))

    # Settings for text segmentation (Chinese)
    jieba_dict = Optional(Type(str))
    jieba_dict_user = Optional(Type(str))

    # Unsupported settings, originally implemented in MkDocs
    indexing = Deprecated(message = "Unsupported option")
    prebuild_index = Deprecated(message = "Unsupported option")
    min_search_length = Deprecated(message = "Unsupported option")
