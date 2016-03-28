(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.CashCash = factory();
	}
}(this, function() {
	'use strict';

	var CashCash = function(selector, context) {
		selector = typeof selector === 'string' ? selector.trim() : '';

		if (selector.length) {
			selector = typeof context === 'string' && context.trim().length ? (context + ' ' + selector) : selector;
			context = context instanceof HTMLElement ? context : document;

			var elements = context.querySelectorAll(selector),
				count = elements.length;

			this.length = count;
			this.context = context;
			this.selector = selector;

			while (count--) {
				this[count] = elements[count];
			}
		}

		return this;
	};

	CashCash.prototype = {
		length: 0,
		toArray: function() {
			return Array.prototype.slice.call(this);
		}
	};

	return function(selector, context) {
		return new CashCash(selector, context);
	};
}));