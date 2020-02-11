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

import { Observable, fromEvent } from "rxjs"
import { map, startWith } from "rxjs/operators"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Set toggle
 *
 * Simulating a click event seems to be the most cross-browser compatible way
 * of changing the value while also emitting a `change` event. Before, Material
 * used `CustomEvent` to programatically change the value of a toggle, but this
 * is a much simpler and cleaner solution.
 *
 * @param el - Toggle element
 * @param value - Toggle value
 */
export function setToggle(
  el: HTMLInputElement, value: boolean
): void {
  if (el.checked !== value)
    el.click()
}

/* ------------------------------------------------------------------------- */

/**
 * Watch toggle
 *
 * @param el - Toggle element
 *
 * @return Toggle observable
 */
export function watchToggle(
  el: HTMLInputElement
): Observable<boolean> {
  return fromEvent(el, "change")
    .pipe(
      map(() => el.checked),
      startWith(el.checked)
    )
}
