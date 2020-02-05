class Cash {
  constructor(selector, context) {
    this.length = 0;

    selector = typeof selector === 'string' ? selector.trim() : '';

    if (selector.length) {
      selector = typeof context === 'string' && context.trim().length ? `${context.trim()} ${selector}` : selector;
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

export default function CashCash(selector, context) {
  return new Cash(selector, context);
}
