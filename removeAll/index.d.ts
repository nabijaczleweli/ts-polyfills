/*!
 * ts-polyfills - https://github.com/nabijaczleweli/ts-polyfills
 * MIT license - https://opensource.org/licenses/MIT
 * nabijaczleweli - http://nabijaczleweli.xyz
 * @preserve
 */

interface Array<T> {
  /** Removes all elements for which the predicate is true. Returns the removed items or [].
    * @param predicate deleteAll calls predicate once for each element of the array, in ascending
    * order. All elements the predicate returns true are removed and returned.
    * @param thisArg If provided, it will be used as the this value for each invocation of
    * predicate. If it is not provided, undefined is used instead.
    */
  removeAll(predicate: (value: T, index: number, array: Array<T>) => boolean, thisArg?: any): Array<T>;
}
