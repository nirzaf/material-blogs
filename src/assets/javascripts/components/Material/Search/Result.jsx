/*
 * Copyright (c) 2016-2017 Martin Donath <martin.donath@squidfunk.com>
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

import lunr from "lunr"

/* ----------------------------------------------------------------------------
 * Class
 * ------------------------------------------------------------------------- */

export default class Result {

  /**
   * Perform search and update results on keyboard events
   *
   * @constructor
   *
   * @property {HTMLElement} el_ - Search result container
   * @property {(Array<Object>|Function)} data_ - Raw document data
   * @property {Object} docs_ - Indexed documents
   * @property {HTMLElement} meta_ - Search meta information
   * @property {HTMLElement} list_ - Search result list
   * @property {Object} index_ - Search index
   *
   * @param {(string|HTMLElement)} el - Selector or HTML element
   * @param {(Array<Object>|Function)} data - Function providing data or array
   */
  constructor(el, data) {
    const ref = (typeof el === "string")
      ? document.querySelector(el)
      : el
    if (!(ref instanceof HTMLElement))
      throw new ReferenceError
    this.el_ = ref

    /* Set data and create metadata and list elements */
    this.data_ = data
    this.meta_ = (
      <div class="md-search-result__meta">
        Type to start searching
      </div>
    )
    this.list_ = (
      <ol class="md-search-result__list"></ol>
    )

    /* Inject created elements */
    this.el_.appendChild(this.meta_)
    this.el_.appendChild(this.list_)
  }

  /**
   * Truncate a string after the given number of character
   *
   * This is not a reasonable approach, since the summaries kind of suck. It
   * would be better to create something more intelligent, highlighting the
   * search occurrences and making a better summary out of it
   *
   * @param {string} string - String to be truncated
   * @param {number} n - Number of characters
   * @return {string} Truncated string
   */
  truncate_(string, n) {
    let i = n
    if (string.length > i) {
      while (string[i] !== " " && --i > 0);
      return `${string.substring(0, i)}...`
    }
    return string
  }

  /**
   * Update search results
   *
   * @param {Event} ev - Input or focus event
   */
  update(ev) {

    /* Initialize index, if this has not be done yet */
    if (ev.type === "focus" && !this.index_) {

      /* Initialize index */
      const init = data => {
        this.index_ = lunr(function() {
          /* eslint-disable no-invalid-this, lines-around-comment */
          this.field("title", { boost: 10 })
          this.field("text")
          this.ref("location")
          /* eslint-enable no-invalid-this, lines-around-comment */
        })

        /* Index documents */
        this.docs_ = data.reduce((docs, doc) => {
          this.index_.add(doc)
          docs[doc.location] = doc
          return docs
        }, {})
      }

      /* Initialize index after short timeout to account for transition */
      setTimeout(() => {
        return typeof this.data_ === "function"
          ? this.data_().then(init)
          : init(this.data_)
      }, 250)

    /* Execute search on new input event */
    } else if (ev.type === "keyup") {
      const target = ev.target
      if (!(target instanceof HTMLInputElement))
        throw new ReferenceError

      /* Clear current list */
      while (this.list_.firstChild)
        this.list_.removeChild(this.list_.firstChild)

      /* Perform search on index and render documents */
      const result = this.index_.search(target.value)
      result.forEach(item => {
        const doc = this.docs_[item.ref]

        /* Check if it's a anchor link on the current page */
        let [pathname] = doc.location.split("#")
        pathname = pathname.replace(/^(\/?\.{2})+/g, "")

        /* Append search result */
        this.list_.appendChild(
          <li class="md-search-result__item">
            <a href={doc.location} title={doc.title}
              class="md-search-result__link" data-md-rel={
                pathname === document.location.pathname
              ? "anchor" : ""}>
              <article class="md-search-result__article">
                <h1 class="md-search-result__title">
                  {doc.title}
                </h1>
                <p class="md-search-result__teaser">
                  {this.truncate_(doc.text, 140)}
                </p>
              </article>
            </a>
          </li>
        )
      })

      /* Bind click handlers for anchors */
      const anchors = this.list_.querySelectorAll("[data-md-rel=anchor]")
      Array.prototype.forEach.call(anchors, anchor => {
        anchor.addEventListener("click", ev2 => {
          const toggle = document.querySelector("[data-md-toggle=search]")
          if (!(toggle instanceof HTMLInputElement))
            throw new ReferenceError
          if (toggle.checked) {
            toggle.checked = false
            toggle.dispatchEvent(new CustomEvent("change"))
          }

          /* Hack: prevent default, as the navigation needs to be delayed due
             to the search body lock on mobile */
          ev2.preventDefault()
          setTimeout(() => {
            document.location.href = anchor.href
          }, 100)
        })
      })

      /* Update search metadata */
      this.meta_.textContent =
        `${result.length} search result${result.length !== 1 ? "s" : ""}`
    }
  }
}
