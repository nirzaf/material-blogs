---
template: overrides/main.html
---

# Ensuring data privacy

Material for MkDocs makes compliance with data privacy regulations a breeze, 
as it offers a native [cookie consent] solution to seek explicit consent from
users before setting up [tracking]. Additionally, external assets can be
automatically bundled as part of the build process.

  [cookie consent]: setting-up-site-analytics.md#cookie-consent
  [tracking]: setting-up-site-analytics.md

## Configuration

### Built-in privacy

[:octicons-heart-fill-24:{ .mdx-heart } Insiders][Insiders]{ .mdx-insiders } ·
[:octicons-tag-24: insiders-4.9.0][Insiders] ·
:octicons-cpu-24: Plugin ·
:octicons-beaker-24: Experimental

The built-in privacy plugin automatically downloads [external assets] as part of 
the build process and stores them alongside your documentation. Add the 
following lines to `mkdocs.yml`:


``` yaml
plugins:
  - privacy # (1)!
```

1.  Note that the privacy plugin should be located at the end of the list of
    `plugins`, as it will scan the resulting HTML for links to download and
    replace. If a plugin after the privacy plugin adds further
    [external assets], these assets will not be downloaded.

The following configuration options are available:

`download`{ #download }

:   :octicons-milestone-24: Default: `true` – This option specifies whether
    the plugin should download [external assets]. If you want to switch the
    plugin off, e.g. for local builds, use an [environment variable]:

    ``` yaml
    plugins:
      - privacy:
          download: !ENV [DOWNLOAD, false]
    ```

`download_directory`{ #download-directory }

:   :octicons-milestone-24: Default: `assets/externals` – This option
    specifies where the downloaded [external assets] will be stored. It's
    normally not necessary to change this option:

    ``` yaml
    plugins:
      - privacy:
          download_directory: assets/externals
    ```

  [external assets]: #how-it-works
  [environment variable]: https://www.mkdocs.org/user-guide/configuration/#environment-variables

#### How it works

The [built-in privacy] plugin scans the resulting HTML for links to external
resources, including external scripts, style sheets, images and web fonts, and
downloads them to bundle them with your documentation site. Every URL refering
to an external resource, no matter if part of a template or Markdown file is
then replaced with the URL to the local copy. Example:

``` html
<script src="https://example.com/script.js"></script>
```

The external script is downloaded, and the link is replaced with:

``` html
<script src="assets/externals/example.com/script.js"></script>
```

Style sheets are scanned for external `url(...)` references, e.g. images and
web fonts, which are then also downloaded and bundled with your documentation
site. This means that [Google Fonts] can be configured in `mkdocs.yml` as usual,
as the [built-in privacy] plugin automatically downloads and bundles all
dependent resources.

As a third measure, [`preconnect`][preconnect] hints used for DNS pre-fetching
which might also leak the visitors IP address to a third party are automatically
removed during the build process.

???+ example "Expand to inspect example"

    For the official documentation, the [built-in privacy] plugin downloads the
    following resources:

    ``` sh
    .
    └─ assets/externals/
       ├─ cdnjs.cloudflare.com/ajax/tablesort/5.2.1/tablesort.min.js
       ├─ fonts.googleapis.com/css
       ├─ fonts.gstatic.com/s/
       │  ├─ roboto/v29/
       │  │  ├─ KFOlCnqEu92Fr1MmWUlfChc4EsA.woff2
       │  │  ├─ KFOmCnqEu92Fr1Mu7mxKOzY.woff2
       │  │  ├─ KFOlCnqEu92Fr1MmSU5fCBc4EsA.woff2
       │  │  ├─ KFOmCnqEu92Fr1Mu4mxK.woff2
       │  │  ├─ KFOkCnqEu92Fr1Mu51xEIzIFKw.woff2
       │  │  ├─ KFOlCnqEu92Fr1MmSU5fBxc4EsA.woff2
       │  │  ├─ KFOkCnqEu92Fr1Mu51xLIzIFKw.woff2
       │  │  ├─ KFOlCnqEu92Fr1MmWUlfBBc4.woff2
       │  │  ├─ KFOlCnqEu92Fr1MmWUlfBxc4EsA.woff2
       │  │  ├─ KFOkCnqEu92Fr1Mu51xFIzIFKw.woff2
       │  │  ├─ KFOlCnqEu92Fr1MmSU5fChc4EsA.woff2
       │  │  ├─ KFOlCnqEu92Fr1MmWUlfCBc4EsA.woff2
       │  │  ├─ KFOmCnqEu92Fr1Mu7GxKOzY.woff2
       │  │  ├─ KFOkCnqEu92Fr1Mu51xMIzIFKw.woff2
       │  │  ├─ KFOlCnqEu92Fr1MmSU5fCxc4EsA.woff2
       │  │  ├─ KFOlCnqEu92Fr1MmWUlfCRc4EsA.woff2
       │  │  ├─ KFOmCnqEu92Fr1Mu7WxKOzY.woff2
       │  │  ├─ KFOmCnqEu92Fr1Mu72xKOzY.woff2
       │  │  ├─ KFOlCnqEu92Fr1MmWUlfABc4EsA.woff2
       │  │  ├─ KFOkCnqEu92Fr1Mu51xHIzIFKw.woff2
       │  │  ├─ KFOmCnqEu92Fr1Mu5mxKOzY.woff2
       │  │  ├─ KFOlCnqEu92Fr1MmSU5fABc4EsA.woff2
       │  │  ├─ KFOkCnqEu92Fr1Mu51xIIzI.woff2
       │  │  ├─ KFOmCnqEu92Fr1Mu4WxKOzY.woff2
       │  │  ├─ KFOkCnqEu92Fr1Mu51xGIzIFKw.woff2
       │  │  ├─ KFOlCnqEu92Fr1MmWUlfCxc4EsA.woff2
       │  │  ├─ KFOlCnqEu92Fr1MmSU5fBBc4.woff2
       │  │  └─ KFOlCnqEu92Fr1MmSU5fCRc4EsA.woff2
       │  └─ robotomono/v13/
       │     ├─ L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vq_R-W4Ep0.woff2
       │     ├─ L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vq_QOW4Ep0.woff2
       │     ├─ L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vq_SuW4Ep0.woff2
       │     ├─ L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vq_ROW4.woff2
       │     ├─ L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vq_SeW4Ep0.woff2
       │     └─ L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vq_S-W4Ep0.woff2
       └─ polyfill.io/v3/polyfill.min.js
    ```

  [built-in privacy]: #built-in-privacy
  [Google Fonts]: changing-the-fonts.md
  [preconnect]: https://developer.mozilla.org/en-US/docs/Web/Performance/dns-prefetch

#### Caching <small>recommended</small> { #caching data-toc-label="Caching" }

All downloaded files are written to the `.cache` directory, significantly 
reducing the duration of subsequent builds as only replacements need to be 
carried out. You might want to:

1.  Ignore the `.cache` directory in your project, by adding it to `.gitignore`.
2.  When building your site for publishing, use a build cache to save the
    `.cache` directory in between builds. Taking the example from the
    [publishing guide], add the following lines:

    ``` yaml hl_lines="15-18"
    name: ci
      on:
        push:
          branches:
            - master
            - main
      jobs:
        deploy:
          runs-on: ubuntu-latest
          steps:
            - uses: actions/checkout@v2
            - uses: actions/setup-python@v2
              with:
                python-version: 3.x
            - uses: actions/cache@v2
              with:
                key: ${{ github.ref }}
                path: .cache
            - run: pip install mkdocs-material
            - run: mkdocs gh-deploy --force
    ```

  [publishing guide]: ../publishing-your-site.md#with-github-actions

#### Limitations

Note that dynamically created URLs as part of scripts are not detected, and thus
cannot be automatically downloaded. The [built-in privacy] plugin does not
execute scripts – it can only detect complete URLs to download and replace.
This is why (currently) nested resources from `*.js` files are not processed.

  [Insiders]: ../insiders/index.md
