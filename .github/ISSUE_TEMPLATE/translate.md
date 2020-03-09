---
name: Translate
about: Help translate Material into more languages
title: New translation: {Insert language}
labels: enhancement
assignees:

---

## Instructions

1. Check, if your language is already available: [here](http://bit.ly/2DCzaL0)
2. If it isn't, please translate the labels on the right:

``` jinja
{% macro t(key) %}{{ {
  "language": "en",
  "clipboard.copy": "Copy to clipboard",
  "clipboard.copied": "Copied to clipboard",
  "edit.link.title": "Edit this page",
  "footer.previous": "Previous",
  "footer.next": "Next",
  "meta.comments": "Comments",
  "meta.source": "Source",
  "search.language": "en",
  "search.placeholder": "Search",
  "search.result.placeholder": "Type to start searching",
  "search.result.none": "No matching documents",
  "search.result.one": "1 matching document",
  "search.result.other": "# matching documents",
  "search.tokenizer": "[\s\-]+",
  "skip.link.title": "Skip to content",
  "source.link.title": "Go to repository",
  "source.revision.date": "Last update",
  "toc.title": "Table of contents"
}[key] }}{% endmacro %}
```

Thanks!
