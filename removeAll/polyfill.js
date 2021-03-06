function(predicate) {
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
