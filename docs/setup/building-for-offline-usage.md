# Building for offline usage

If you want to ship your documentation together with your product, MkDocs has
you covered – with support from themes, [MkDocs] allows for building
offline-capable documentation. Notably, Material for MkDocs offers offline
support for many of its features.

  [MkDocs]: https://www.mkdocs.org

## Configuration

### Built-in offline plugin

[:octicons-tag-24: 9.0.0][offline support] ·
:octicons-cpu-24: Plugin

The built-in offline plugin makes sure that the [site search] works when you
distribute the contents of your [site directory] as a download. Simply add
the following lines to `mkdocs.yml`:

``` yaml
plugins:
  - offline
```

The plugin will automatically disable the [`use_directory_urls`][use_directory_urls]
setting, ensuring that users can open your documentation directly from the local
file system.

The following configuration options are available:

[`enabled`](#+offline.enabled){ #+offline.enabled }

:   :octicons-milestone-24: Default: `true` – This option specifies whether
    the plugin is enabled when building your project. If you want to switch
    the plugin off, e.g. for local builds, use an [environment variable]:

    ``` yaml
    plugins:
      - offline:
          enabled: !ENV [OFFLINE, false]
    ```

Now, after invoking `mkdocs build`, you can open `site/index.html` directly
in your browser and the [site search] will work as if the documentation was
hosted on a regular server.

!!! tip "Automatically bundle all external assets"

    The [built-in privacy plugin] makes it easy to use external assets
    while building documentation for offline usage, as it will automatically
    download all external assets to distribute them with your documentation.

  [offline support]: https://github.com/squidfunk/mkdocs-material/releases/tag/9.0.0
  [site search]: setting-up-site-search.md
  [site directory]: https://www.mkdocs.org/user-guide/configuration/#site_dir
  [use_directory_urls]: https://www.mkdocs.org/user-guide/configuration/#use_directory_urls
  [environment variable]: https://www.mkdocs.org/user-guide/configuration/#environment-variables
  [built-in privacy plugin]: ensuring-data-privacy.md#built-in-privacy-plugin

#### Limitations

Material for MkDocs offers many interactive features, some of which will not
work from the file system due to the restrictions of modern browsers: all
features that use the `fetch` API will error.

Thus, when building for offline usage, make sure to disable the following
configuration settings: [instant loading], [site analytics], [git repository],
[versioning] and [comment systems].

  [Instant loading]: setting-up-navigation.md#instant-loading
  [Site analytics]: setting-up-site-analytics.md
  [Versioning]: setting-up-versioning.md
  [Git repository]: adding-a-git-repository.md
  [Comment systems]: adding-a-comment-system.md
