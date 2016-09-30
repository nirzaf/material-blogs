/*
 * Copyright (c) 2016 Martin Donath <martin.donath@squidfunk.com>
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

/* ----------------------------------------------------------------------------
 * Imports
 * ------------------------------------------------------------------------- */

import FastClick from "fastclick"
import lunr from "lunr"

// import Expander from "./components/expander"
import Sidebar from "./components/sidebar"
import ScrollSpy from "./components/scrollspy"

// import Search from './components/search';

/* ----------------------------------------------------------------------------
 * Application
 * ------------------------------------------------------------------------- */

/* Initialize application upon DOM ready */
document.addEventListener("DOMContentLoaded", () => {

  /* Test for iOS */
  Modernizr.addTest("ios", () => {
    return !!navigator.userAgent.match(/(iPad|iPhone|iPod)/g)
  })

  /* Test for web application context */
  Modernizr.addTest("standalone", () => {
    return !!navigator.standalone
  })

  /* Attack FastClick to mitigate 300ms delay on touch devices */
  FastClick.attach(document.body)

  const width = window.matchMedia("(min-width: 1200px)")

  const sidebar = new Sidebar(".md-sidebar--primary")
  const handler = function() {
    if (width.matches) {
      sidebar.listen()
    } else {
      sidebar.unlisten()
    }
  }
  handler() // check listen!

  const toc = new Sidebar(".md-sidebar--secondary")
  toc.listen()

  const spy =
    new ScrollSpy(".md-sidebar--secondary .md-nav--secondary .md-nav__link")
  spy.listen()

  window.addEventListener("resize", handler)

  const query = document.getElementById("query")
  query.addEventListener("focus", () => {
    document.querySelector(".md-search").classList.add("md-js__search--locked")
  })

  /* Intercept click on search mode toggle */
  let offset = 0
  const toggle = document.getElementById("search")
  toggle.addEventListener("click", ev => {
    const list = document.body.classList
    const lock = !matchMedia("only screen and (min-width: 960px)").matches

    /* Exiting search mode */
    if (list.contains("md-js__body--locked")) {
      list.remove("md-js__body--locked")

      /* Scroll to former position, but wait for 100ms to prevent flashes
         on iOS. A short timeout seems to do the trick */
      if (lock)
        setTimeout(() => {
          window.scrollTo(0, offset)
        }, 100)

    /* Entering search mode */
    } else {
      offset = window.scrollY

      /* First timeout: scroll to top after transition, to omit flickering */
      if (lock)
        setTimeout(() => {
          window.scrollTo(0, 0)
        }, 400)

      /* Second timeout: Lock body after finishing transition and scrolling to
         top and focus input field. Sadly, the focus event is not dispatched
         on iOS Safari and there's nothing we can do about it. */
      setTimeout(() => {

        /* This additional check is necessary to handle fast subsequent clicks
           on the toggle and the timeout to lock the body must be cancelled */
        if (ev.target.checked) {
          if (lock)
            list.add("md-js__body--locked")
          setTimeout(() => {
            document.getElementById("md-search").focus()
          }, 200)
        }
      }, 450)
    }
  })

  // var toc = new Sidebar('.md-sidebar--secondary');
  // toc.listen();

  const toggles =
    document.querySelectorAll(".md-nav__item--nested > .md-nav__link");
  [].forEach.call(toggles, togglex => {
    const nav = togglex.nextElementSibling

    // 1.

    nav.style.maxHeight = `${nav.getBoundingClientRect().height}px`

    togglex.addEventListener("click", () => {
      const first = nav.getBoundingClientRect().height
      if (first) {
        // console.log('closing');
        nav.style.maxHeight = `${first}px` // reset!
        requestAnimationFrame(() => {

          nav.classList.add("md-nav--transitioning")
          nav.style.maxHeight = "0px"
        })
      } else {
        // console.log('opening');

        /* Toggle and read height */
        nav.style.maxHeight = ""

        nav.classList.add("md-nav--toggled")
        const last = nav.getBoundingClientRect().height
        nav.classList.remove("md-nav--toggled")

        // Initial state
        nav.style.maxHeight = "0px"

        /* Enable animations */
        requestAnimationFrame(() => {
          nav.classList.add("md-nav--transitioning")
          nav.style.maxHeight = `${last}px`
        })
      }

    })

    // Capture the end with transitionend
    nav.addEventListener("transitionend", ev => {
      ev.target.classList.remove("md-nav--transitioning")
      if (ev.target.getBoundingClientRect().height > 0) {
        ev.target.style.maxHeight = "100%"
      }
    })
  })

// setTimeout(function() {
  fetch("https://api.github.com/repos/squidfunk/mkdocs-material")
    .then(response => {
      return response.json()
    })
    .then(data => {
      const stars = data.stargazers_count
      const forks = data.forks_count
      // store in session!!!
      const lists = document.querySelectorAll(".md-source__facts"); // TODO 2x list in drawer and header
      [].forEach.call(lists, list => {

        let li = document.createElement("li")
        li.className = "md-source__fact md-source__fact--hidden"
        li.innerText = `${stars} Stars`
        list.appendChild(li)

        setTimeout(lix => {
          lix.classList.remove("md-source__fact--hidden")
        }, 100, li)

        li = document.createElement("li")
        li.className = "md-source__fact md-source__fact--hidden"
        li.innerText = `${forks} Forks`
        list.appendChild(li)

        setTimeout(lix => {
          lix.classList.remove("md-source__fact--hidden")
        }, 500, li)
      })

      // setTimeout(function() {
      //   li.classList.remove('md-source__fact--hidden');
      // }, 100);

    })
    .catch(() => {
      // console.log("parsing failed", ex)

    })

    // setTimeout(function() {
  fetch("/mkdocs/search_index.json") // TODO: prepend BASE URL!!!
    .then(response => {
      return response.json()
    })
    .then(data => {
      // console.log(data)

          /* Create index */
      const index = lunr(() => {
        /* eslint-disable no-invalid-this, lines-around-comment */
        this.field("title", {boost: 10})
        this.field("text")
        this.ref("location")
        /* eslint-enable no-invalid-this, lines-around-comment */
      })

          /* Index articles */
      const articles = {}
      data.docs.forEach(article => {

            // TODO: match for two whitespaces, then replace unnecessary whitespace after string
        article.text = article.text.replace(/\s(\.,\:)\s/gi, (string, g1) => {
          return `${g1} `
        })
        // TODO: window.baseUrl sucks...
        article.location = window.baseUrl + article.location
        articles[article.location] = article
        index.add(article)
      })

          /* Register keyhandler to execute search on key up */
      const queryx = document.getElementById("query")
      queryx.addEventListener("keyup", () => {
        const container = document.querySelector(".md-search-result__list")
        while (container.firstChild)
          container.removeChild(container.firstChild)

            // /* Abort, if the query is empty */
            // var bar = document.querySelector('.bar.search');
            // if (!query.value.length) {
            //   while (meta.firstChild)
            //     meta.removeChild(meta.firstChild);
            //
            //   /* Restore state */
            //   bar.classList.remove('non-empty');
            //   return;
            // }

            /* Show reset button */
            // bar.classList.add('non-empty');

            /* Execute search */
        const results = index.search(query.value)
        results.forEach(result => {
          const article = articles[result.ref]

              /* Create a link referring to the article */
          const link = document.createElement("a")
          link.classList.add("md-search-result__link")
          link.href = article.location

              // /* Create article container */
          const li = document.createElement("li")
          li.classList.add("md-search-result__item")
          li.appendChild(link)

              /* Create title element */
          const title = document.createElement("div")
          title.classList.add("md-search-result__title")

              // article.title.split(//)

          title.innerHTML = article.title
          link.appendChild(title)

              /* Create text element */
          const text = document.createElement("p")
          text.classList.add("md-search-result__description")
          text.innerHTML = article.text // .truncate(140);
          link.appendChild(text)

          container.appendChild(li)
        })

            /* Show number of search results */
            // var number = document.createElement('strong');

        const meta = document.querySelector(".md-search-result__meta")
        meta.innerHTML = `${results.length} search result${
          results.length !== 1
            ? "s"
            : ""}`

            /* Update number */
            // while (meta.firstChild)
            //   meta.removeChild(meta.firstChild);
            // meta.appendChild(number);
      })

          // setTimeout(function() {
          //   li.classList.remove('md-source__fact--hidden');
          // }, 100);

    })
    .catch(() => {
      // console.log("parsing failed", ex)
    })
// }, 1000);

})
