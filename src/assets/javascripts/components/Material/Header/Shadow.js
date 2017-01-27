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

/* ----------------------------------------------------------------------------
 * Class
 * ------------------------------------------------------------------------- */

export default class Shadow {

  /**
   * Show the header shadow depending on scroll offset
   *
   * @constructor
   * @param {(string|HTMLElement)} el - Selector or HTML element
   */
  constructor(el) {
    this.el_ = (typeof el === "string")
      ? document.querySelector(el)
      : el

    /* Grab parent and header */
    this.el_     = this.el_.parentNode
    this.header_ = this.el_.parentNode.previousElementSibling

    /* Initialize height and state */
    this.height_ = 0
    this.active_ = false
  }

  /**
   * Calculate total height of previous nodes
   */
  setup() {
    let current = this.el_
    while ((current = current.previousElementSibling))
      this.height_ += current.offsetHeight
  }

  /**
   * Update shadow state
   */
  update() {
    const active = window.pageYOffset >= this.height_
    if (active !== this.active_)
      this.header_.dataset.mdState = (this.active_ = active) ? "shadow" : ""
  }

  /**
   * Reset shadow state
   */
  reset() {
    this.header_.dataset.mdState = ""
    this.height_ = 0
    this.active_ = false
  }
}
