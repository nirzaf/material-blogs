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

import FastClick from "fastclick"
import Material from "./components/Material"

/* ----------------------------------------------------------------------------
 * Application
 * ------------------------------------------------------------------------- */

export default class Application {

  /**
   * Create the application
   *
   * @constructor
   * @param  {object} config Configuration object
   */
  constructor(config) {
    this.config_ = config
  }

  /**
   * Initialize all components and listeners
   */
  initialize() {

    /* Initialize Modernizr and Fastclick */
    new Material.Event.Listener(document, "DOMContentLoaded", () => {

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

      /* Wrap all data tables */
      const tables = document.querySelectorAll("table:not([class])")
      for (const table of tables) {
        const wrap = document.createElement("div")
        wrap.classList.add("md-typeset__table")
        if (table.nextSibling) {
          table.parentNode.insertBefore(wrap, table.nextSibling)
        } else {
          table.parentNode.appendChild(wrap)
        }
        wrap.appendChild(table)
      }
    }).listen()

    /* Cross-browser helper to dispatch/fire an event */
    const dispatch = (el, event) => {
      return document.createEvent
        ? el.dispatchEvent(new Event(event))
        : el.fireEvent(`on${event}`, document.createEventObject())
    }

    /* Component: sidebar container */
    if (!Modernizr.csscalc)
      new Material.Event.MatchMedia("(min-width: 960px)",
        new Material.Event.Listener(window, [
          "resize", "orientationchange"
        ], new Material.Sidebar.Container("[data-md-component=container]")))

    /* Component: sidebar with navigation */
    new Material.Event.MatchMedia("(min-width: 1200px)",
      new Material.Event.Listener(window, [
        "scroll", "resize", "orientationchange"
      ], new Material.Sidebar.Position("[data-md-component=navigation]")))

    /* Component: sidebar with table of contents */
    new Material.Event.MatchMedia("(min-width: 960px)",
      new Material.Event.Listener(window, [
        "scroll", "resize", "orientationchange"
      ], new Material.Sidebar.Position("[data-md-component=toc]")))

    /* Component: link blurring for table of contents */
    new Material.Event.MatchMedia("(min-width: 960px)",
      new Material.Event.Listener(window, "scroll",
        new Material.Nav.Blur("[data-md-component=toc] .md-nav__link")))

    /* Component: collapsible elements for navigation */
    const collapsibles =
      document.querySelectorAll("[data-md-component=collapsible]")
    for (const collapse of collapsibles)
      new Material.Event.MatchMedia("(min-width: 1200px)",
        new Material.Event.Listener(collapse.previousElementSibling, "click",
          new Material.Nav.Collapse(collapse)))

    /* Component: pane monitor for iOS scrolling fixes */
    new Material.Event.MatchMedia("(max-width: 1199px)",
      new Material.Event.Listener(
        "[data-md-component=navigation] [data-md-toggle]", "change",
          new Material.Nav.Scrolling("[data-md-component=navigation] nav")))

    /* Component: search body lock for mobile */
    new Material.Event.MatchMedia("(max-width: 959px)",
      new Material.Event.Listener("[data-md-toggle=search]", "change",
        new Material.Search.Lock("[data-md-toggle=search]")))

    /* Component: search results */
    new Material.Event.Listener(document.forms.search.query, [
      "focus", "keyup"
    ], new Material.Search.Result("[data-md-component=result]", () => {
      return fetch(`${this.config_.url.base}/mkdocs/search_index.json`)
        .then(response => response.json())
        .then(data => {
          return data.docs.map(doc => {
            doc.location = this.config_.url.base + doc.location
            return doc
          })
        })
    })).listen()

    /* Listener: prevent touches on overlay if navigation is active */
    new Material.Event.MatchMedia("(max-width: 1199px)",
      new Material.Event.Listener("[data-md-component=overlay]", "touchstart",
        ev => ev.preventDefault()))

    /* Listener: close drawer when anchor links are clicked */
    new Material.Event.MatchMedia("(max-width: 959px)",
      new Material.Event.Listener("[data-md-component=navigation] [href^='#']",
        "click", () => {
          const toggle = document.querySelector("[data-md-toggle=drawer]")
          if (toggle.checked) {
            toggle.checked = false
            dispatch(toggle, "change")
          }
        }))

    /* Listener: focus input after activating search */
    new Material.Event.Listener("[data-md-toggle=search]", "change", ev => {
      setTimeout(toggle => {
        const query = document.forms.search.query
        if (toggle.checked)
          query.focus()
      }, 400, ev.target)
    }).listen()

    /* Listener: activate search on focus */
    new Material.Event.MatchMedia("(min-width: 960px)",
      new Material.Event.Listener(document.forms.search.query, "focus", () => {
        const toggle = document.querySelector("[data-md-toggle=search]")
        if (!toggle.checked) {
          toggle.checked = true
          dispatch(toggle, "change")
        }
      }))

    /* Listener: disable search when clicking outside */
    new Material.Event.MatchMedia("(min-width: 960px)",
      new Material.Event.Listener(document.body, "click", () => {
        const toggle = document.querySelector("[data-md-toggle=search]")
        if (toggle.checked) {
          toggle.checked = false
          dispatch(toggle, "change")
        }
      }))

    /* Listener: fix unclickable toggle due to blur handler */
    new Material.Event.MatchMedia("(min-width: 960px)",
      new Material.Event.Listener("[data-md-toggle=search]", "click",
        ev => ev.stopPropagation()))

    /* Listener: prevent search from closing when clicking */
    new Material.Event.MatchMedia("(min-width: 960px)",
      new Material.Event.Listener("[data-md-component=search]", "click",
        ev => ev.stopPropagation()))

    /* Retrieve the facts for the given repository type */
    ;(() => {
      const el = document.querySelector("[data-md-source]")
      if (!el) return Promise.resolve([])
      switch (el.dataset.mdSource) {
        case "github": return new Material.Source.Adapter.GitHub(el).fetch()
        default: return Promise.resolve([])
      }

    /* Render repository source information */
    })().then(facts => {
      const sources = document.querySelectorAll("[data-md-source]")
      for (const source of sources)
        new Material.Source.Repository(source)
          .initialize(facts)
    })
  }
}
