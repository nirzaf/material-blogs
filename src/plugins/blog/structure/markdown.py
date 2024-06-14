

from markdown.treeprocessors import Treeprocessor
from mkdocs.structure.pages import Page
from mkdocs.utils import get_relative_url
from xml.etree.ElementTree import Element

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

# Excerpt tree processor
class ExcerptTreeprocessor(Treeprocessor):

    # Initialize excerpt tree processor
    def __init__(self, page: Page, base: Page = None):
        self.page = page
        self.base = base

    # Transform HTML after Markdown processing
    def run(self, root: Element):
        main = True

        # We're only interested in anchors, which is why we continue when the
        # link does not start with an anchor tag
        for el in root.iter("a"):
            anchor = el.get("href")
            if not anchor.startswith("#"):
                continue

            # The main headline should link to the post page, not to a specific
            # anchor, which is why we remove the anchor in that case
            path = get_relative_url(self.page.url, self.base.url)
            if main:
                el.set("href", path)
            else:
                el.set("href", path + anchor)

            # Main headline has been seen
            main = False
