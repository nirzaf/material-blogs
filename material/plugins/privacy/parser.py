

from html.parser import HTMLParser
from xml.etree.ElementTree import Element

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

# Fragment parser - previously, we used lxml for fault-tolerant HTML5 parsing,
# but it blows up the size of the Docker image by 20 MB. We can't just use the
# built-in XML parser, as it doesn't handle HTML5 (because, yeah, it's not XML),
# so we use a streaming parser and construct the element ourselves.
class FragmentParser(HTMLParser):

    # Initialize parser
    def __init__(self):
        super().__init__(convert_charrefs = True)
        self.result = None

    # Create element
    def handle_starttag(self, tag, attrs):
        self.result = Element(tag, dict(attrs))
