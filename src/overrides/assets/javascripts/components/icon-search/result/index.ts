/*
 * Copyright (c) 2016-2021 Martin Donath <martin.donath@squidfunk.com>
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

import { filter as search } from "fuzzaldrin-plus"
import {
  Observable,
  Subject,
  animationFrameScheduler,
  combineLatest,
  merge,
  of
} from "rxjs"
import {
  bufferCount,
  distinctUntilKeyChanged,
  filter,
  finalize,
  map,
  observeOn,
  switchMap,
  tap,
  withLatestFrom,
  zipWith
} from "rxjs/operators"

import {
  addToSearchResultList,
  resetSearchResultList,
  resetSearchResultMeta,
  setSearchResultMeta
} from "~/actions"
import {
  getElementOrThrow,
  watchElementThreshold
} from "~/browser"

import { renderIconSearchResult } from "../../../templates"
import { Component } from "../../_"
import { Icon, IconSearchIndex } from "../_"
import { IconSearchQuery } from "../query"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Icon search result
 */
export interface IconSearchResult {
  data: Icon[]                         /* Search result data */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Mount options
 */
interface MountOptions {
  index$: Observable<IconSearchIndex>  /* Search index observable */
  query$: Observable<IconSearchQuery>  /* Search query observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Mount icon search result
 *
 * @param el - Icon search result element
 * @param options - Options
 *
 * @returns Icon search result component observable
 */
export function mountIconSearchResult(
  el: HTMLElement, { index$, query$ }: MountOptions
): Observable<Component<IconSearchResult, HTMLElement>> {
  const internal$ = new Subject<IconSearchResult>()
  const boundary$ = watchElementThreshold(el)
    .pipe(
      filter(Boolean)
    )

  /* Update search result metadata */
  const meta = getElementOrThrow(":scope > :first-child", el)
  internal$
    .pipe(
      observeOn(animationFrameScheduler),
      withLatestFrom(query$)
    )
      .subscribe(([{ data }, { value }]) => {
        if (value)
          setSearchResultMeta(meta, data.length)
        else
          resetSearchResultMeta(meta)
      })

  /* Update icon search result list */
  const list = getElementOrThrow(":scope > :last-child", el)
  internal$
    .pipe(
      observeOn(animationFrameScheduler),
      tap(() => resetSearchResultList(list)),
      switchMap(({ data }) => merge(
        of(...data.slice(0, 10)),
        of(...data.slice(10))
          .pipe(
            bufferCount(10),
            zipWith(boundary$),
            switchMap(([chunk]) => of(...chunk))
          )
      )),
      withLatestFrom(query$)
    )
      .subscribe(([result, { value }]) => {
        addToSearchResultList(list, renderIconSearchResult(result, value))
      })

  /* Create and return component */
  return combineLatest([
    query$.pipe(distinctUntilKeyChanged("value")),
    index$
      .pipe(
        map(({ icons, emojis }) => [
          ...Object.keys(icons.data),
          ...Object.keys(emojis.data)
        ])
      )
  ])
    .pipe(
      withLatestFrom(index$),
      map(([[{ value }, data], index]) => {
        const results = search(data, value)
        return {
          data: results.map(name => {
            if (name in index.icons.data) {
              return {
                shortcode: name,
                url: `${index.icons.base}${index.icons.data[name]}`
              }
            } else {
              return {
                shortcode: name,
                url: `${index.emojis.base}${index.emojis.data[name]}`
              }
            }
          })
        }
      }),
      tap(internal$),
      finalize(() => internal$.complete()),
      map(state => ({ ref: el, ...state }))
    )
}
