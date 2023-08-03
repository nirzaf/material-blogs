# Building an optimized site

Material for MkDocs, by default, allows to build optimized sites that rank great
on search engines, load fast (even on slow networks), and work perfectly without
JavaScript. Additionally, the [built-in optimize plugin] adds support for
further useful automatic optimization techniques.

  [built-in optimize plugin]: #built-in-optimize-plugin

## Configuration

### Built-in projects plugin :material-alert-decagram:{ .mdx-pulse title="Added on July 29, 2023" }

[:octicons-heart-fill-24:{ .mdx-heart } Sponsors only][Insiders]{ .mdx-insiders } ·
[:octicons-tag-24: insiders-4.38.0][Insiders] ·
:octicons-cpu-24: Plugin ·
:octicons-beaker-24: Experimental

The built-in projects plugin allows to split your documentation into multiple
distinct MkDocs projects, __build them concurrently__ and
__serve them together__. Add the following to `mkdocs.yml`:

``` yaml
plugins:
  - projects
```

Next, create a folder called `projects` in your root directory which will
contain all projects. For example, if we want to build a project with two
additional languages, we can use:

``` { .sh .no-copy }
.
├─ projects/
│  ├─ de/
│  │  ├─ docs/
│  │  └─ mkdocs.yml
│  └─ fr/
│     ├─ docs/
│     └─ mkdocs.yml
└─ mkdocs.yml
```

If you now invoke `mkdocs serve` and change a file in one of the projects,
the projects plugin makes sure that MkDocs will also reload those files. Note
that the projects are currently entirely separate, which means they will have
separate search indexes and sitemaps. We're happy to receive feedback on this
plugin and learn about your requirements to make it better, as we plan to add
support for merging and hoisting files.
[Create a discussion to share your thoughts!][discussion]

  [discussion]: https://github.com/squidfunk/mkdocs-material/discussions

??? info "Use cases for the projects plugin"

    Ideal use cases for the projects plugin are:

    - Building a multi-language site
    - Building a blog alongside your documentation
    - Splitting large code bases for better performance

    Note that the plugin is currently experimental. We're releasing it early,
    so that we can improve it together with our users and make it even more
    powerful as we discover new use cases.

The following configuration options are available:

[`enabled`](#+projects.enabled){ #+projects.enabled }

:   :octicons-milestone-24: Default: `true` – This option specifies whether
    the plugin is enabled when building your project. If you want to speed up
    local builds, you can use an [environment variable]:

    ``` yaml
    plugins:
      - projects:
          enabled: !ENV [CI, false]
    ```

[`concurrency`](#+projects.concurrency){ #+projects.concurrency }

:   :octicons-milestone-24: Default: _number of CPUs_ – This option specifies
    how many CPUs the plugin is allowed to use when building projects.
    With more CPUs, the plugin can do more work in the same time, thus complete
    optimization faster. Concurrent processing can be disabled with:

    ``` yaml
    plugins:
      - projects:
          concurrency: 1
    ```

#### Projects

The following configuration options are available for projects:

[`projects`](#+projects.projects){ #+projects.projects }

:   :octicons-milestone-24: Default: `true` – This option specifies whether
    to build nested projects. If you want to switch the plugin off, e.g.
    for local builds, you can use an [environment variable]:

    ``` yaml
    plugins:
      - projects:
          projects: !ENV [CI, false]
    ```

[`projects_dir`](#+projects.projects_dir){ #+projects.projects_dir }

:   :octicons-milestone-24: Default: `projects` – This option specifies the
    name of the folder the plugin expects your projects to be stored. While it's
    usually not necessary to change this option, change it with:

    ``` yaml
    plugins:
      - projects:
          projects_dir: path/to/folder
    ```

#### Hoisting

The following configuration options are available for hoisting:

[`hoisting`](#+projects.hoisting){ #+projects.hoisting }

:   [:octicons-tag-24: insiders-4.39.0][Insiders] · :octicons-milestone-24:
    Default: `true` – This option specifies whether the plugin should hoist all 
    themes files to the top-level project. If you disable this setting, each
    project will have a copy of the themes files, which in general, can be
    considered redundant:

    ``` yaml
    plugins:
      - projects:
          hoisting: false
    ```

    It's generally advisable to enable hoisting, as it leads to faster
    deployments and faster loading of your project's sites, because the files
    are the same for all projects.

### Built-in optimize plugin

[:octicons-heart-fill-24:{ .mdx-heart } Sponsors only][Insiders]{ .mdx-insiders } ·
[:octicons-tag-24: insiders-4.29.0][Insiders] ·
:octicons-cpu-24: Plugin ·
:octicons-beaker-24: Experimental

The built-in optimize plugin automatically identifies and optimizes all media
files as part of the build using compression and conversion techniques. Add
the following lines to `mkdocs.yml`:

``` yaml
plugins:
  - optimize # (1)!
```

1.  Please ensure that all [dependencies for image processing] are installed,
    or the plugin will not work properly.

> If you need to be able to build your documentation with and without
> [Insiders], please refer to the [built-in plugins] section to learn how
> shared configurations help to achieve this.

The following configuration options are available:

[`enabled`](#+optimize.enabled){ #+optimize.enabled }

:   :octicons-milestone-24: Default: `true` – This option specifies whether
    the plugin is enabled when building your project. If you want to speed up
    local builds, you can use an [environment variable]:

    ``` yaml
    plugins:
      - optimize:
          enabled: !ENV [CI, false]
    ```

[`concurrency`](#+optimize.concurrency){ #+optimize.concurrency }

:   :octicons-milestone-24: Default: _number of CPUs_ – This option specifies
    how many CPUs the plugin is allowed to use when optimizing media files.
    With more CPUs, the plugin can do more work in the same time, thus complete
    optimization faster. Concurrent processing can be disabled with:

    ``` yaml
    plugins:
      - optimize:
          concurrency: 1
    ```

#### Optimization

Technical documentation often includes screenshots or diagrams, both of which
are prime candidates for compression. The [built-in optimize plugin] allows to
automatically compress images using [pngquant] (for PNGs), and [Pillow]
(for JPGs).

The following configuration options are available for optimization:

[`optimize_png`](#+optimize.optimize_png){ #+optimize.optimize_png }

:   :octicons-milestone-24: Default: `true` – This option specifies whether
    the plugin should optimize PNG files using [pngquant], which must be
    installed on the system. PNG optimization can be disabled with:

    ``` yaml
    plugins:
      - optimize:
          optimize_png: false
    ```

[`optimize_png_speed`](#+optimize.optimize_png_speed){ #+optimize.optimize_png_speed }

:   :octicons-milestone-24: Default: `4` of `[1,10]` – This option specifies the
    speed/quality tradeoff that [pngquant] applies when compressing. The lower
    the number, the more time will be spent optimizing:

    === "Slower <small>small</small>"

        ``` yaml
        plugins:
          - optimize:
              optimize_png_speed: 1
        ```

    === "Faster <small>rough</small>"

        ``` yaml
        plugins:
          - optimize:
              optimize_png_speed: 10
        ```

    A factor of `10` has 5% lower quality, but is 8x faster than the default `4`.

[`optimize_png_strip`](#+optimize.optimize_png_strip){ #+optimize.optimize_png_strip }

:   :octicons-milestone-24: Default: `true` – This option specifies whether
    [pngquant] should remove all non-optional metadata that is not necessary
    for rendering images in a browser:

    ``` yaml
    plugins:
      - optimize:
          optimize_png_strip: false
    ```

[`optimize_jpg`](#+optimize.optimize_jpg){ #+optimize.optimize_jpg }

:   :octicons-milestone-24: Default: `true` – This option specifies whether
    the plugin should optimize JPG files using [Pillow], a Python image
    processing library. JPG optimization can be disabled with:

    ``` yaml
    plugins:
      - optimize:
          optimize_jpg: false
    ```

[`optimize_jpg_quality`](#+optimize.optimize_jpg_quality){ #+optimize.optimize_jpg_quality }

:   :octicons-milestone-24: Default: `60` of `[0,100]` – This option specifies
    the image quality that [Pillow] uses when compressing. If the images look
    blurry, it's a good idea to tune and change this setting:

    ``` yaml
    plugins:
      - optimize:
          optimize_jpg_quality: 75
    ```

[`optimize_jpg_progressive`](#+optimize.optimize_jpg_progressive){ #+optimize.optimize_jpg_progressive }

:   :octicons-milestone-24: Default: `true` – This option specifies whether
    [Pillow] should use [progressive encoding] (faster rendering) when
    compressing JPGs. Progressive encoding can be disabled with:

    ``` yaml
    plugins:
      - optimize:
          optimize_jpg_progressive: false
    ```

  [Insiders]: ../insiders/index.md
  [built-in plugins]: ../insiders/getting-started.md#built-in-plugins
  [dependencies for image processing]: dependencies/image-processing.md
  [environment variable]: https://www.mkdocs.org/user-guide/configuration/#environment-variables
  [pngquant]: https://pngquant.org/
  [Pillow]: https://pillow.readthedocs.io/
  [progressive encoding]: https://medium.com/hd-pro/jpeg-formats-progressive-vs-baseline-73b3938c2339

#### Caching

The [built-in optimize plugin] implements an intelligent caching mechanism,
ensuring that media files are only pushed through the optimization pipeline when
their contents change. If you swap out or update an image, the plugin will
detect it and update the optimized version.

The following configuration options are available for caching:

[`cache`](#+optimize.cache){ #+optimize.cache }

:   :octicons-milestone-24: Default: `true` – This option specifies whether
    the plugin queries its cache for an existing artifact before starting an
    optimization job. It's normally not necessary to change this setting,
    except for when debugging the plugin itself. Caching can be disabled with:

    ``` yaml
    plugins:
      - optimize:
          cache: false
    ```

[`cache_dir`](#+optimize.cache_dir){ #+optimize.cache_dir }

:   :octicons-milestone-24: Default: `.cache/plugins/optimize` – This option
    specifies the file system location of the plugin's cache. It's normally not
    necessary to change this setting, except for when debugging the plugin
    itself. The cache directory can be changed with:

    ``` yaml
    plugins:
      - optimize:
          cache_dir: .cache/plugins/optimize
    ```

    By default, all built-in plugins that implement caching will create a
    `.cache` directory in the same folder your `mkdocs.yml` resides, and create
    subfolders to not interfere with each other. If you use multiple instances
    of this plugin, it could be necessary to change this setting.
