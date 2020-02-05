/*!
 *  CashCash v2.0.0
 *
 *  A very small DOM library inspired by jQuery.
 *
 *  Source code available at: https://github.com/jgarber623/CashCash
 *
 *  (c) 2016-present Jason Garber (https://sixtwothree.org)
 *
 *  CashCash may be freely distributed under the MIT license.
 */

(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = global || self, 
  global.CashCash = factory());
})(this, (function() {
  "use strict";
  class Cash {
    constructor(selector, context) {
      this.length = 0;
      selector = typeof selector === "string" ? selector.trim() : "";
      if (selector.length) {
        selector = typeof context === "string" && context.trim().length ? `${context.trim()} ${selector}` : selector;
        context = context instanceof HTMLElement ? context : document;
        const elements = context.querySelectorAll(selector);
        this.selector = selector;
        this.context = context;
        this.length = elements.length;
        elements.forEach((element, index) => {
          this[index] = element;
        });
      }
    }
  }
  function CashCash(selector, context) {
    return new Cash(selector, context);
  }
  return CashCash;
}));
