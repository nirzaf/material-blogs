# Copyright (c) 2016-2023 Martin Donath <martin.donath@squidfunk.com>

# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to
# deal in the Software without restriction, including without limitation the
# rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
# sell copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:

# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.

# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
# FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
# IN THE SOFTWARE.

import logging
import os
import sys

from collections import defaultdict
from markdown.extensions.toc import slugify
from mkdocs import utils
from mkdocs.commands.build import DuplicateFilter
from mkdocs.config.base import Config
from mkdocs.config import config_options as opt
from mkdocs.plugins import BasePlugin

# -----------------------------------------------------------------------------
# Class
# -----------------------------------------------------------------------------

# Tags plugin configuration scheme
class TagsPluginConfig(Config):
    tags_file = opt.Optional(opt.Type(str))

# -----------------------------------------------------------------------------

# Tags plugin
class TagsPlugin(BasePlugin[TagsPluginConfig]):
    supports_multiple_instances = True

    # Initialize plugin
    def on_config(self, config):
        self.tags = defaultdict(list)
        self.tags_file = None

        # Retrieve tags mapping from configuration
        self.tags_map = config.extra.get("tags")

        # Use override of slugify function
        toc = { "slugify": slugify, "separator": "-" }
        if "toc" in config.mdx_configs:
            toc = { **toc, **config.mdx_configs["toc"] }

        # Partially apply slugify function
        self.slugify = lambda value: (
            toc["slugify"](str(value), toc["separator"])
        )

    # Hack: 2nd pass for tags index page(s)
    def on_nav(self, nav, config, files):
        file = self.config.tags_file
        if file:
            self.tags_file = self._get_tags_file(files, file)

    # Build and render tags index page
    def on_page_markdown(self, markdown, page, config, files):
        if page.file == self.tags_file:
            return self._render_tag_index(markdown)

        # Add page to tags index
        for tag in page.meta.get("tags", []):
            self.tags[tag].append(page)

    # Inject tags into page (after search and before minification)
    def on_page_context(self, context, page, config, nav):
        if "tags" in page.meta:
            context["tags"] = [
                self._render_tag(tag)
                    for tag in page.meta["tags"]
            ]

    # -------------------------------------------------------------------------

    # Obtain tags file
    def _get_tags_file(self, files, path):
        file = files.get_file_from_path(path)
        if not file:
            log.error(f"Tags file '{path}' does not exist.")
            sys.exit(1)

        # Add tags file to files
        files.append(file)
        return file

    # Render tags index
    def _render_tag_index(self, markdown):
        if not "[TAGS]" in markdown:
            markdown += "\n[TAGS]"

        # Replace placeholder in Markdown with rendered tags index
        return markdown.replace("[TAGS]", "\n".join([
            self._render_tag_links(*args)
                for args in sorted(self.tags.items())
        ]))

    # Render the given tag and links to all pages with occurrences
    def _render_tag_links(self, tag, pages):
        classes = ["md-tag"]
        if isinstance(self.tags_map, dict):
            classes.append("md-tag-icon")
            type = self.tags_map.get(tag)
            if type:
                classes.append(f"md-tag--{type}")

        # Render section for tag and a link to each page
        classes = " ".join(classes)
        content = [f"## <span class=\"{classes}\">{tag}</span>", ""]
        for page in pages:
            url = utils.get_relative_url(
                page.file.src_uri,
                self.tags_file.src_uri
            )

            # Render link to page
            title = page.meta.get("title", page.title)
            content.append(f"- [{title}]({url})")

        # Return rendered tag links
        return "\n".join(content)

    # Render the given tag, linking to the tags index (if enabled)
    def _render_tag(self, tag):
        type = self.tags_map.get(tag) if self.tags_map else None
        if not self.tags_file or not self.slugify:
            return dict(name = tag, type = type)
        else:
            url = f"{self.tags_file.url}#{self.slugify(tag)}"
            return dict(name = tag, type = type, url = url)

# -----------------------------------------------------------------------------
# Data
# -----------------------------------------------------------------------------

# Set up logging
log = logging.getLogger("mkdocs")
log.addFilter(DuplicateFilter())
