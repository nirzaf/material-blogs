

import re

from math import ceil

from .parser import ReadtimeParser

# -----------------------------------------------------------------------------
# Functions
# -----------------------------------------------------------------------------

# Compute readtime - we first used the original readtime library, but the list
# of dependencies it brings with it increased the size of the Docker image by
# 20 MB (packed), which is an increase of 50%. For this reason, we adapt the
# original readtime algorithm to our needs - see https://t.ly/fPZ7L
def readtime(html: str, words_per_minute: int):
    parser = ReadtimeParser()
    parser.feed(html)
    parser.close()

    # Extract words from text and compute readtime in seconds
    words = len(re.split(r"\W+", "".join(parser.text)))
    seconds = ceil(words / words_per_minute * 60)

    # Account for additional images
    delta = 12
    for _ in range(parser.images):
        seconds += delta
        if delta > 3: delta -= 1

    # Return readtime in minutes
    return ceil(seconds / 60)
