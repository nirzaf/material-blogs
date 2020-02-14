/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

import {
  ArticleDocument,
  SearchDocumentMap,
  SectionDocument,
  setupSearchDocumentMap
} from "../document"
import {
  SearchHighlightFactoryFn,
  setupSearchHighlighter
} from "../highlight"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Search index configuration
 */
export interface SearchIndexConfig {
  lang: string[]                       /* Search languages */
  separator: string                    /* Search separator */
}

/**
 * Search index document
 */
export interface SearchIndexDocument {
  location: string                     /* Document location */
  title: string                        /* Document title */
  text: string                         /* Document text */
}

/**
 * Search index pipeline
 */
export interface SearchIndexPipeline {
  trimmer: boolean                     /* Add trimmer to pipeline */
  stopwords: boolean                   /* Add stopword filter to pipeline */
}

/* ------------------------------------------------------------------------- */

/**
 * Search index options
 *
 * This interfaces describes the format of the `search_index.json` file which
 * is automatically built by the MkDocs search plugin.
 */
export interface SearchIndexOptions {
  config: SearchIndexConfig            /* Search index configuration */
  docs: SearchIndexDocument[]          /* Search index documents */
  pipeline?: SearchIndexPipeline       /* Search index pipeline */
  index?: object | string              /* Prebuilt or serialized index */
}

/* ------------------------------------------------------------------------- */

/**
 * Search result
 */
export interface SearchResult {
  article: ArticleDocument             /* Article document */
  sections: SectionDocument[]          /* Section documents */
}

/* ----------------------------------------------------------------------------
 * Class
 * ------------------------------------------------------------------------- */

/**
 * Search index
 *
 * Note that `lunr` is injected via Webpack, as it will otherwise also be
 * bundled in the application bundle.
 */
export class SearchIndex {

  /**
   * Search document mapping
   *
   * A mapping of URLs (including hash fragments) to the actual articles and
   * sections of the documentation. The search document mapping must be created
   * regardless of whether the index was prebuilt or not, as lunr itself will
   * only store the actual index.
   */
  protected documents: SearchDocumentMap

  /**
   * Search highlight factory function
   */
  protected highlight: SearchHighlightFactoryFn

  /**
   * The lunr search index
   */
  protected index: lunr.Index

  /**
   * Create a search index
   *
   * @param options - Options
   */
  public constructor({ config, docs, pipeline, index }: SearchIndexOptions) {
    this.documents = setupSearchDocumentMap(docs)
    this.highlight = setupSearchHighlighter(config)

    /* If no index was given, create it */
    if (typeof index === "undefined") {
      this.index = lunr(function() {
        pipeline = pipeline || {
          trimmer: true,
          stopwords: true
        }

        /* Remove stemmer, as it cripples search experience */
        this.pipeline.reset()
        if (pipeline.trimmer)
          this.pipeline.add(lunr.trimmer)
        if (pipeline.stopwords)
          this.pipeline.add(lunr.stopWordFilter)

        /* Set up alternate search languages */
        if (config.lang.length === 1 && config.lang[0] !== "en") {
          this.use((lunr as any)[config.lang[0]])
        } else if (config.lang.length > 1) {
          this.use((lunr as any).multiLanguage(...config.lang))
        }

        /* Setup fields and reference */
        this.field("title", { boost: 10 })
        this.field("text")
        this.ref("location")

        /* Index documents */
        for (const doc of docs)
          this.add(doc)
      })

    /* Prebuilt or serialized index */
    } else {
      this.index = lunr.Index.load(
        typeof index === "string"
          ? JSON.parse(index)
          : index
      )
    }
  }

  /**
   * Search for matching documents
   *
   * The search index which MkDocs provides is divided up into articles, which
   * contain the whole content of the individual pages, and sections, which only
   * contain the contents of the subsections obtained by breaking the individual
   * pages up at `h1` ... `h6`. As there may be many sections on different pages
   * with indentical titles (for example within this very project, e.g. "Usage"
   * or "Installation"), they need to be put into the context of the containing
   * page. For this reason, section results are grouped within their respective
   * articles which are the top-level results that are returned.
   *
   * @param query - Query string
   *
   * @return Search results
   */
  public search(query: string): SearchResult[] {
    if (query) {
      try {

        /* Group sections by containing article */
        const groups = this.index.search(query)
          .reduce((results, result) => {
            const document = this.documents.get(result.ref)
            if (typeof document !== "undefined") {
              if ("parent" in document) {
                const ref = document.parent.location
                results.set(ref, [...results.get(ref) || [], result])
              } else {
                const ref = document.location
                results.set(ref, results.get(ref) || [])
              }
            }
            return results
          }, new Map<string, lunr.Index.Result[]>())

        /* Create highlighter for query */
        const fn = this.highlight(query)

        /* Map groups to search documents */
        return [...groups].map(([ref, sections]) => ({
          article: fn(this.documents.get(ref) as ArticleDocument),
          sections: sections.map(section => {
            return fn(this.documents.get(section.ref) as SectionDocument)
          })
        }))

      /* Log errors to console (for now) */
      } catch (err) {
        // tslint:disable-next-line no-console
        console.warn(`Invalid query: ${query} – see https://bit.ly/2s3ChXG`)
      }
    }

    /* Return nothing in case of error or empty query */
    return []
  }

  /**
   * Serialize search index
   *
   * @return String representation
   */
  public toString(): string {
    return JSON.stringify(this.index)
  }
}
