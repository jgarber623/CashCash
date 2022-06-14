/*!
 *  CashCash v3.0.0
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
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, 
  global.CashCash = factory());
})(this, (function() {
  "use strict";
  class Cash {
    length=0;
    #nodes;
    constructor(selector, context) {
      selector = typeof selector === "string" ? selector.trim() : "";
      if (!selector.length) return;
      selector = this.selector = typeof context === "string" && context.trim().length ? `${context.trim()} ${selector}` : selector;
      context = this.context = context instanceof HTMLElement ? context : document;
      const nodes = this.nodes = context.querySelectorAll(selector);
      this.length = nodes.length;
      this.forEach = nodes.forEach;
      nodes.forEach(((node, index) => this[index] = node));
    }
  }
  function CashCash(selector, context) {
    return new Cash(selector, context);
  }
  return CashCash;
}));
