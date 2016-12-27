/*!
 *  CashCash 0.2.1
 *
 *  A very small DOM library inspired by jQuery.
 *
 *  Source code available at: https://github.com/jgarber623/CashCash
 *
 *  (c) 2016-present Jason Garber (https://sixtwothree.org)
 *
 *  CashCash may be freely distributed under the MIT license.
 */

(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.CashCash = factory();
  }
})(this, function() {
  "use strict";
  var Cash = function(selector, context) {
    selector = typeof selector === "string" ? selector.trim() : "";
    if (selector.length) {
      selector = typeof context === "string" && context.trim().length ? context.trim() + " " + selector : selector;
      context = context instanceof HTMLElement ? context : document;
      var elements = context.querySelectorAll(selector), count = elements.length;
      this.length = count;
      this.context = context;
      this.selector = selector;
      while (count--) {
        this[count] = elements[count];
      }
    }
  };
  var CashCash = function(selector, context) {
    return new Cash(selector, context);
  };
  Cash.prototype = CashCash.prototype = {
    length: 0,
    toArray: function() {
      return Array.prototype.slice.call(this);
    }
  };
  return CashCash;
});