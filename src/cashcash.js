class Cash {
  length = 0;

  constructor(selector, context) {
    selector = typeof selector === 'string' ? selector.trim() : '';

    if (selector.length === 0) return;

    selector = this.selector = typeof context === 'string' && context.trim().length > 0 ? `${context.trim()} ${selector}` : selector;
    context = this.context = context instanceof HTMLElement ? context : document;

    const nodes = context.querySelectorAll(selector);

    this.length = nodes.length;
    this.forEach = nodes.forEach;

    for (const [index, node] of nodes.entries()) {
      this[index] = node;
    }
  }
}

/**
 * @param {string} selector Any valid CSS selector.
 * @param {string|HTMLElement} context Optional search context.
 *
 * @returns {Cash} An instance of the Cash class
 */
export default function CashCash(selector, context) {
  return new Cash(selector, context);
}
