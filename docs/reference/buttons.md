---
template: overrides/main.html
---

# Buttons

Material for MkDocs provides dedicated styles for primary and secondary buttons
that can be added to any link, `label` or `button` element. This is especially
useful for documents or landing pages with dedicated _call-to-actions_.

## Configuration

This configuration allows to add attributes to all inline- and block-level
elements with a simple syntax, turning any link into a button. Add the
following lines to `mkdocs.yml`:

``` yaml
markdown_extensions:
  - attr_list
```

See additional configuration options:

- [Attribute Lists]

  [Attribute Lists]: ../setup/extensions/python-markdown.md#attribute-lists

## Usage

### Adding buttons

In order to render a link as a button, suffix it with curly braces and add the
`.md-button` class selector to it. The button will receive the selected
[primary color] and [accent color] if active.

_Example_:

``` markdown
[Subscribe to our newsletter](#){ .md-button }
```

_Result_:

[Subscribe to our newsletter][Demo]{ .md-button }

  [primary color]: ../setup/changing-the-colors.md#primary-color
  [accent color]: ../setup/changing-the-colors.md#accent-color 
  [Demo]: javascript:alert$.next("Demo")

### Adding primary buttons

If you want to display a filled, primary button (like on the [landing page]
of Material for MkDocs), add both, the `.md-button` and `.md-button--primary`
CSS class selectors.

_Example_:

``` markdown
[Subscribe to our newsletter](#){ .md-button .md-button--primary }
```

_Result_:

[Subscribe to our newsletter][Demo]{ .md-button .md-button--primary }

  [landing page]: ../index.md

### Adding icon buttons

Of course, icons can be added to all types of buttons by using the [icon syntax]
together with any valid icon shortcode, which can be easily found with a few keystrokes through the [icon search].

_Example_:

``` markdown
[Send :fontawesome-solid-paper-plane:](#){ .md-button .md-button--primary }
```

_Result_:

[Send :fontawesome-solid-paper-plane:][Demo]{ .md-button .md-button--primary }

  [icon syntax]: icons-emojis.md#using-icons
  [icon search]: icons-emojis.md#search
