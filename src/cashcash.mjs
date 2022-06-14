class Cash {
  length = 0;

  #nodes;

  constructor(selector, context) {
    selector = typeof selector === 'string' ? selector.trim() : '';

    if (!selector.length) return;

    selector = this.selector = typeof context === 'string' && context.trim().length ? `${context.trim()} ${selector}` : selector;
    context = this.context = context instanceof HTMLElement ? context : document;

    const nodes = this.nodes = context.querySelectorAll(selector);

    this.length = nodes.length;
    this.forEach = nodes.forEach;

    nodes.forEach((node, index) => this[index] = node);
  }
}

export default function CashCash(selector, context) {
  return new Cash(selector, context);
}
