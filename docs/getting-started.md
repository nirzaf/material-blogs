# Getting started

## Installation

### Installing MkDocs

Before installing [MkDocs][2], you need to make sure you have Python and `pip`
– the Python package manager – up and running. You can verify if you're already
good to go with the following commands:

``` sh
python --version
# Python 2.7.13
pip --version
# pip 9.0.1
```

Installing and verifying MkDocs is as simple as:

``` sh
pip install mkdocs && mkdocs --version
# mkdocs, version 0.16.0
```

!!! warning "MkDocs for Material requirements"

    Material requires MkDocs >= 0.16.

Furthermore, it is highly recommended to install [Pygments][3] and the
[PyMdown Extensions][4] to get the most out of the Material theme:

```sh
pip install pygments
pip install pymdown-extensions
```

  [1]: https://hub.docker.com/r/squidfunk/mkdocs-material/
  [2]: http://www.mkdocs.org
  [3]: http://pygments.org
  [4]: http://facelessuser.github.io/pymdown-extensions/

### Installing Material

#### by using pip

Material can be installed with `pip`:

``` sh
pip install mkdocs-material
```

!!! warning "Installation on macOS"

    When you're running the pre-installed version of Python on macOS, `pip`
    tries to install packages in a folder for which your user might not have
    the adequate permissions. There are two possible solutions to this:

    1. **Installing in user space** (recommended): Provide the `--user` flag
      to the install command and `pip` will install the package in a user-site
      location. This is the recommended way.

    2. **Switching to a homebrewed Python**: Upgrade your Python installation
      to a self-contained solution by installing Python with Homebrew. This
      should eliminate a lot of problems you may be having with `pip`.

#### by cloning from GitHub

Material can also be used without a system-wide installation by cloning the
repository into a subfolder of your project's root directory:

``` sh
git clone https://github.com/squidfunk/mkdocs-material.git
```

This is especially useful if you want to extend the theme and override some
parts of the theme. The theme will reside in the folder
`mkdocs-material/material`.

## Usage

In order to enable the Material theme just add one of the following lines to
your `mkdocs.yml`. If you installed Material using pip:

``` yaml
theme: 'material'
```

If you cloned Material from GitHub:

``` yaml
theme_dir: 'mkdocs-material/material'
```

MkDocs includes a development server, so you can view your changes as you go.
The development server can be started with the following command:

``` sh
mkdocs serve
```

Now you can point your browser to [localhost:8000][5] and the Material theme
should be visible. From here on, you can start writing your documentation, or
read on and customize the theme through some options.

  [5]: http://localhost:8000

## Options

The Material theme adds some extra variables for configuration via your
project's `mkdocs.yml`. See the following section for all available options.

### Changing the color palette

Material defines a default hue for every primary and accent color on Google's
Material Design [color palette][6]. This makes it very easy to change the
overall look of the theme. Just set the primary and accent colors using the
following variables in your `mkdocs.yml`:

``` yaml
extra:
  palette:
    primary: 'indigo'
    accent: 'light blue'
```

Color names are case-insensitive, but must match the names of the Material
Design color palette. Valid values are: `red`, `pink`, `purple`, `deep purple`,
`indigo`, `blue`, `light blue`, `cyan`, `teal`, `green`, `light green`, `lime`,
`yellow`, `amber`, `orange`, `deep orange`, `brown`, `grey` and `blue grey`.
The last three colors can only be used as a primary color.

If the color is set via this configuration, an additional CSS file that
defines the color palette is included. If you want to keep things lean, clone
the repository and recompile the theme with your custom colors set. See the
guide on [customization][7] for more information.

  [6]: http://www.materialui.co/colors
  [7]: customization.md

#### Primary colors

Click on a tile to change the primary color of the theme:

<button data-md-color-primary="red">Red</button>
<button data-md-color-primary="pink">Pink</button>
<button data-md-color-primary="purple">Purple</button>
<button data-md-color-primary="deep-purple">Deep Purple</button>
<button data-md-color-primary="indigo">Indigo</button>
<button data-md-color-primary="blue">Blue</button>
<button data-md-color-primary="light-blue">Light Blue</button>
<button data-md-color-primary="cyan">Cyan</button>
<button data-md-color-primary="teal">Teal</button>
<button data-md-color-primary="green">Green</button>
<button data-md-color-primary="light-green">Light Green</button>
<button data-md-color-primary="lime">Lime</button>
<button data-md-color-primary="yellow">Yellow</button>
<button data-md-color-primary="amber">Amber</button>
<button data-md-color-primary="orange">Orange</button>
<button data-md-color-primary="deep-orange">Deep Orange</button>
<button data-md-color-primary="brown">Brown</button>
<button data-md-color-primary="grey">Grey</button>
<button data-md-color-primary="blue-grey">Blue Grey</button>

<script>
  var buttons = document.querySelectorAll("button[data-md-color-primary]");
  Array.prototype.forEach.call(buttons, function(button) {
    button.addEventListener("click", function() {
      document.body.dataset.mdColorPrimary = this.dataset.mdColorPrimary;
    })
  })
</script>

#### Accent colors

Click on a tile to change the accent color of the theme:

<button data-md-color-accent="red">Red</button>
<button data-md-color-accent="pink">Pink</button>
<button data-md-color-accent="purple">Purple</button>
<button data-md-color-accent="deep-purple">Deep Purple</button>
<button data-md-color-accent="indigo">Indigo</button>
<button data-md-color-accent="blue">Blue</button>
<button data-md-color-accent="light-blue">Light Blue</button>
<button data-md-color-accent="cyan">Cyan</button>
<button data-md-color-accent="teal">Teal</button>
<button data-md-color-accent="green">Green</button>
<button data-md-color-accent="light-green">Light Green</button>
<button data-md-color-accent="lime">Lime</button>
<button data-md-color-accent="yellow">Yellow</button>
<button data-md-color-accent="amber">Amber</button>
<button data-md-color-accent="orange">Orange</button>
<button data-md-color-accent="deep-orange">Deep Orange</button>

<script>
  var buttons = document.querySelectorAll("button[data-md-color-accent]");
  Array.prototype.forEach.call(buttons, function(button) {
    button.addEventListener("click", function() {
      document.body.dataset.mdColorAccent = this.dataset.mdColorAccent;
    })
  })
</script>

### Changing the font family

Material uses the [Roboto font family][8] by default, specifically the regular
sans-serif type for text and the `monospaced` type for code. Both fonts are
loaded from [Google Fonts][9] and can easily be changed to other fonts, like
for example the [Ubuntu font family][10]:

``` yaml
extra:
  font:
    text: 'Ubuntu'
    code: 'Ubuntu Mono'
```

The text font will be loaded in font-weights 400 and **700**, the `monospaced`
font in regular weight. If you want to load fonts from other destinations or
don't want to use the Google Fonts loading magic, just set `font` to `'none'`:

``` yaml
extra:
  font: 'none'
```

  [8]: https://fonts.google.com/specimen/Roboto
  [9]: https://fonts.google.com/
  [10]: https://fonts.google.com/specimen/Ubuntu

### Adding a logo

Material makes it easy to add your logo. Your logo should have rectangular
shape with a minimum resolution of 128x128, leave some room towards the edges
and be composed of high contrast areas on a transparent ground, as it will be
placed on the colored header bar and drawer. Simply create the folder
`docs/images`, add your logo and embed it with:

``` yaml
extra:
  logo: 'images/logo.svg'
```

### Adding social links

If you want to link your social accounts, the Material theme provides an easy
way for doing this in the footer of the documentation using the automatically
included [FontAwesome][11] webfont. The syntax is simple – the `type` must
denote the name of the social service, e.g. `github`, `twitter` or `linkedin`
and the `link` must contain the URL you want to link to:

``` yaml
extra:
  social:
    - type: 'github'
      link: 'https://github.com/squidfunk'
    - type: 'twitter'
      link: 'https://twitter.com/squidfunk'
    - type: 'linkedin'
      link: 'https://de.linkedin.com/in/martin-donath-20a95039'
```

The links are generated in order and the `type` of the links must match the
name of the FontAwesome glyph. The `fa` is automatically added, so `github`
will result in `fa fa-github`.

  [11]: http://fontawesome.io/icons/

### Google Analytics integration

MkDocs makes it easy to integrate site tracking with Google Analytics.
Besides basic tracking, clicks on all outgoing links can be tracked as well as
how site search is used. Tracking can be activated in your project's
`mkdocs.yml`:

``` yaml
google_analytics:
  - 'UA-XXXXXXXX-X'
  - 'auto'
```

### Localization <small>L10N</small>

In order to localize the labels (e.g. *Previous* and *Next* in the footer),
you can override the file `partials/language.html` to provide your own
translations inside the macro `t`:

``` jinja
{% macro t(key) %}{{ {
  "edit.link.title": "Edit this page",
  "footer.previous": "Previous",
  "footer.next": "Next",
  "search.placeholder": "Search",
  "source.link.title": "Go to repository",
  "toc.title": "Table of contents"
}[key] }}{% endmacro %}
```

Just copy the file from the original theme and make your adjustments. See the
section on [overriding partials][12] in the customization guide.

!!! warning "Migrating from Material 0.2.x"

    In 0.2.x localization was done within the `extra` configuration of your
    `mkdocs.yml`. With 1.0.0 this is no longer possible as the configuration
    will be ignored.

  [12]: customization.md#overriding-partials

### More advanced customization

If you want to change the general appearance of the Material theme, see
[this article][13] for more information on advanced customization.

  [13]: customization.md

## Extensions

MkDocs supports several [Markdown extensions][14]. The following extensions
are not enabled by default (see the link for which are enabled by default)
but highly recommended, so they should be switched on at all times:

``` yaml
markdown_extensions:
  - admonition
  - codehilite(guess_lang=false)
  - toc(permalink=true)
```

For more information, see the following list of extensions supported by the
Material theme including more information regarding installation and usage:

* [Admonition][15]
* [Codehilite][16]
* [Permalinks][17]
* [Footnotes][18]
* [PyMdown Extensions][19]

  [14]: http://www.mkdocs.org/user-guide/writing-your-docs/#markdown-extensions
  [15]: extensions/admonition.md
  [16]: extensions/codehilite.md
  [17]: extensions/permalinks.md
  [18]: extensions/footnotes.md
  [19]: extensions/pymdown.md

## Full example

Below is a full example configuration for a `mkdocs.yml`:

``` yaml
# Project information
site_name: 'My Project'
site_description: 'A short description of my project'
site_author: 'John Doe'
site_url: 'https://my-github-handle.github.io/my-project'

# Repository
repo_name: 'GitHub'
repo_url: 'https://github.com/my-github-handle/my-project'

# Copyright
copyright: 'Copyright &copy; 2016 John Doe'

# Documentation and theme
theme: 'material'

# Options
extra:
  logo: 'images/logo.svg'
  palette:
    primary: 'indigo'
    accent: 'indigo'
  font:
    text: 'Roboto'
    code: 'Roboto Mono'
  social:
    - type: 'github'
      link: 'https://github.com/squidfunk'
    - type: 'twitter'
      link: 'https://twitter.com/squidfunk'
    - type: 'linkedin'
      link: 'https://de.linkedin.com/in/martin-donath-20a95039'

# Google Analytics
google_analytics:
  - 'UA-XXXXXXXX-X'
  - 'auto'

# Extensions
markdown_extensions:
  - admonition
  - codehilite(guess_lang=false)
  - footnotes
  - meta
  - toc(permalink=true)
```
