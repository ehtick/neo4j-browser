/*
 * Copyright (c) "Neo4j"
 * Neo4j Sweden AB [http://neo4j.com]
 *
 * This file is part of Neo4j.
 *
 * Neo4j is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import { guessSemverVersion } from './featureDuck.utils'

describe('guessSemverVersion', () => {
  const tests: [any, any][] = [
    [, null],
    [null, null],
    ['', null],
    [false, null],
    [true, null],
    ['3.5.3', '3.5.3'],
    ['3.5', '3.5.0'],
    ['3.5-test', '3.5.0'],
    ['4.0-aura', '4.0.0'],
    ['2025.01.0', '2025.1.0'],
    ['2025.07.15-1242', '2025.7.15-1242'],
    ['2025.12.1', '2025.12.1'],
    ['2025.1.1', '2025.1.1']
  ]

  test.each(tests)(
    'guesses the server version correctly for %s',
    (input, expected) => {
      expect(guessSemverVersion(input)).toEqual(expected)
    }
  )
})
