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

import * as fs from "fs/promises"
import { Observable, from } from "rxjs"
import { mapTo, switchMap } from "rxjs/operators"
import glob from "tiny-glob"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Resolve options
 */
interface ResolveOptions {
  cwd: string                          /* Working directory */
}

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * Base directory for compiled files
 */
export const base = "material"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Resolve a pattern
 *
 * @param pattern - Pattern
 * @param options - Options
 *
 * @returns File observable
 */
export function resolve(
  pattern: string, options?: ResolveOptions
): Observable<string> {
  return from(glob(pattern, options))
    .pipe(
      switchMap(files => from(files))
    )
}

/**
 * Recursively create the given directory
 *
 * @param directory - Directory
 *
 * @returns Directory observable
 */
export function mkdir(
  directory: string
): Observable<string> {
  return from(fs.mkdir(directory, { recursive: true }))
    .pipe(
      mapTo(directory)
    )
}

/**
 * Cachebust a file using a content hash
 *
 * @param file - File
 * @param hash - Content hash
 * @param options - Options
 *
 * @returns Cachebusting tuple observable
 */
export function cachebust(
  file: string, hash: string, options: ResolveOptions
): Observable<[string, string]> {
  const name = file.replace(/\b(?=\.)/, `.${hash.slice(0, 8)}.min`)
  return from(fs.rename(
    `${options.cwd}/${file}`,
    `${options.cwd}/${name}`
  ))
    .pipe(
      mapTo([file, name])
    )
}
