/*!
 * ts-polyfills - https://github.com/nabijaczleweli/ts-polyfills
 * MIT license - https://opensource.org/licenses/MIT
 * nabijaczleweli - http://nabijaczleweli.xyz
 * @preserve
 */

(function() {
  if (!Array.prototype.find) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find#Polyfill
    Array.prototype.find = function(predicate) {
      if (this === null) {
        throw new TypeError('Array.prototype.find called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;
      for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return value;
        }
      }
      return undefined;
    }
  }

  if (!Array.prototype.remove) {
    Array.prototype.remove = function(predicate) {
      if (this === null) {
        throw new TypeError('Array.prototype.remove called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      for (var i = 0; i < length; i++) {
        if (predicate.call(thisArg, list[i], i, list)) {
          return this.splice(i, 1)[0];
        }
      }
      return undefined;
    }
  }

  if (!Array.prototype.removeAll) {
    Array.prototype.removeAll = function(predicate) {
      if (this === null) {
        throw new TypeError('Array.prototype.removeAll called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var values = [];
      for (var i = 0; i < length; i++) {
        if (predicate.call(thisArg, list[i], i, list)) {
          values = values.concat(this.splice(i, 1));
          i--;
        }
      }
      return values;
    }
  }
})();
