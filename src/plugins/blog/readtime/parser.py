

from html.parser import HTMLParser

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

# Readtime parser
class ReadtimeParser(HTMLParser):

    # Initialize parser
    def __init__(self):
        super().__init__(convert_charrefs = True)

        # Keep track of text and images
        self.text   = []
        self.images = 0

    # Collect images
    def handle_starttag(self, tag, attrs):
        if tag == "img":
            self.images += 1

    # Collect text
    def handle_data(self, data):
        self.text.append(data)
