

from mkdocs.config.base import Config
from mkdocs.config.config_options import Deprecated, Type

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

# Social plugin configuration
class SocialConfig(Config):
    enabled = Type(bool, default = True)
    cache_dir = Type(str, default = ".cache/plugin/social")

    # Settings for social cards
    cards = Type(bool, default = True)
    cards_dir = Type(str, default = "assets/images/social")
    cards_layout_options = Type(dict, default = {})

    # Deprecated settings
    cards_color = Deprecated(
        option_type = Type(dict, default = {}),
        message =
            "Deprecated, use 'cards_layout_options.background_color' "
            "and 'cards_layout_options.color' with 'default' layout"
    )
    cards_font = Deprecated(
        option_type = Type(str),
        message = "Deprecated, use 'cards_layout_options.font_family'"
    )
