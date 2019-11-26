/*
 * Copyright (c) 2016-2019 Martin Donath <martin.donath@squidfunk.com>
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

import { Observable, combineLatest } from "rxjs"
import {
  distinctUntilChanged,
  map,
  pluck,
  shareReplay
} from "rxjs/operators"

import { ViewportOffset, ViewportSize } from "../../../ui"
import { Header } from "../header"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Main area
 */
export interface Main {
  offset: number                       /* Main area top offset */
  height: number                       /* Main area visible height */
  active: boolean                      /* Scrolled past top offset */
}

/* ----------------------------------------------------------------------------
 * Function types
 * ------------------------------------------------------------------------- */

/**
 * Options
 */
interface Options {
  size$: Observable<ViewportSize>      /* Viewport size observable */
  offset$: Observable<ViewportOffset>  /* Viewport offset observable */
  header$: Observable<Header>          /* Header observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch main area
 *
 * This function returns an observable that computes the visual parameters of
 * the main area from the viewport height and vertical offset, as well as the
 * height of the header element. The height of the main area is corrected by
 * the height of the header (if fixed) and footer element.
 *
 * @param el - Main area element
 * @param options - Options
 *
 * @return Main area observable
 */
export function watchMain(
  el: HTMLElement, { size$, offset$, header$ }: Options
): Observable<Main> {

  /* Compute necessary adjustment for header */
  const adjust$ = header$
    .pipe(
      pluck("height")
    )

  /* Compute the main area's visible height */
  const height$ = combineLatest([offset$, size$, adjust$])
    .pipe(
      map(([{ y }, { height }, adjust]) => {
        const top    = el.offsetTop
        const bottom = el.offsetHeight + top
        return height
          - Math.max(0, top    - y,  adjust)
          - Math.max(0, height + y - bottom)
      }),
      distinctUntilChanged()
    )

  /* Compute whether the viewport offset is past the main area's top */
  const active$ = combineLatest([offset$, adjust$])
    .pipe(
      map(([{ y }, adjust]) => y >= el.offsetTop - adjust),
      distinctUntilChanged()
    )

  /* Combine into a single hot observable */
  return combineLatest([height$, adjust$, active$])
    .pipe(
      map(([height, adjust, active]) => ({
        offset: el.offsetTop - adjust,
        height,
        active
      })),
      shareReplay(1)
    )
}
