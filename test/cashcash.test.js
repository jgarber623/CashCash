import { JSDOM } from 'jsdom';
import test from 'ava';

import CashCash from '../src/cashcash.js';

const html = `
  <!doctype html>
  <html>
  <body>
    <div id="fixtures">
      <header>
        <h1>CashCash: Tests</h1>
      </header>

      <p>1</p>
      <p>2</p>
      <p>3</p>
      <p>4</p>
      <p>5</p>
    </div>
  </body>
  </html>
`;

const invalidArguments = [undefined, null, function() {}, {}, '', ' '];

test.before(() => {
  const { window } = new JSDOM(html);

  const { document, HTMLElement } = window;

  Object.assign(globalThis, { document, HTMLElement, window });
});

test('invalid selector, no context', t => {
  for (const invalidArgument of invalidArguments) {
    const cash = CashCash(invalidArgument);

    t.is(cash.context, undefined);
    t.is(cash.selector, undefined);
    t.is(cash.length, 0);
  }
});

test('valid non-matching selector', t => {
  const cash = CashCash('#foo');

  t.is(cash.context, document);
  t.is(cash.selector, '#foo');
  t.is(cash.length, 0);
});

test('valid non-matching selector, invalid context', t => {
  for (const invalidArgument of invalidArguments) {
    const cash = CashCash('#foo', invalidArgument);

    t.is(cash.context, document);
    t.is(cash.selector, '#foo');
    t.is(cash.length, 0);
  }
});

test('valid non-matching selector, valid non-matching context (String)', t => {
  const cash = CashCash('#foo', '#bar');

  t.is(cash.context, document);
  t.is(cash.selector, '#bar #foo');
  t.is(cash.length, 0);
});

test('valid non-matching selector, valid non-matching context (HTMLElement)', t => {
  const context = document.querySelector('#bar');
  const cash = CashCash('#foo', context);

  t.is(cash.context, document);
  t.is(cash.selector, '#foo');
  t.is(cash.length, 0);
});

test('valid non-matching selector, valid matching context (String)', t => {
  const cash = CashCash('#foo', '#fixtures');

  t.is(cash.context, document);
  t.is(cash.selector, '#fixtures #foo');
  t.is(cash.length, 0);
});

test('valid non-matching selector, valid matching context (HTMLElement)', t => {
  const context = document.querySelector('#fixtures');
  const cash = CashCash('#foo', context);

  t.is(cash.context, context);
  t.is(cash.selector, '#foo');
  t.is(cash.length, 0);
});

test('valid matching selector', t => {
  const cash = CashCash('#fixtures p');

  t.is(cash.context, document);
  t.is(cash.selector, '#fixtures p');
  t.is(cash.length, 5);
});

test('valid matching selector, invalid context', t => {
  for (const invalidArgument of invalidArguments) {
    const cash = CashCash('p', invalidArgument);

    t.is(cash.context, document);
    t.is(cash.selector, 'p');
    t.is(cash.length, 5);
  }
});

test('valid matching selector, valid non-matching context (String)', t => {
  const cash = CashCash('p', '#foo');

  t.is(cash.context, document);
  t.is(cash.selector, '#foo p');
  t.is(cash.length, 0);
});

test('valid matching selector, valid non-matching context (HTMLElement)', t => {
  const context = document.querySelector('#foo');
  const cash = CashCash('p', context);

  t.is(cash.context, document);
  t.is(cash.selector, 'p');
  t.is(cash.length, 5);
});

test('valid matching selector, valid matching context (String)', t => {
  const cash = CashCash('p', '#fixtures');

  t.is(cash.context, document);
  t.is(cash.selector, '#fixtures p');
  t.is(cash.length, 5);
});

test('valid matching selector, valid matching context (HTMLElement)', t => {
  const context = document.querySelector('#fixtures');
  const cash = CashCash('p', context);

  t.is(cash.context, context);
  t.is(cash.selector, 'p');
  t.is(cash.length, 5);
});
