import assert from "node:assert";
import test from "node:test";

import { JSDOM } from "jsdom";

import CashCash from "@jgarber/cashcash";

const html = `\
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

const invalidArguments = [undefined, null, function() {}, {}, "", " "];

test.before(() => {
  const { window } = new JSDOM(html);

  const { document, HTMLElement } = window;

  Object.assign(globalThis, { document, HTMLElement, window });
});

test("invalid selector, no context", () => {
  for (const invalidArgument of invalidArguments) {
    const cash = CashCash(invalidArgument);

    assert.strictEqual(cash.context, undefined);
    assert.strictEqual(cash.selector, undefined);
    assert.strictEqual(cash.length, 0);
  }
});

test("valid non-matching selector", () => {
  const cash = CashCash("#foo");

  assert.strictEqual(cash.context, document);
  assert.strictEqual(cash.selector, "#foo");
  assert.strictEqual(cash.length, 0);
});

test("valid non-matching selector, invalid context", () => {
  for (const invalidArgument of invalidArguments) {
    const cash = CashCash("#foo", invalidArgument);

    assert.strictEqual(cash.context, document);
    assert.strictEqual(cash.selector, "#foo");
    assert.strictEqual(cash.length, 0);
  }
});

test("valid non-matching selector, valid non-matching context (String)", () => {
  const cash = CashCash("#foo", "#bar");

  assert.strictEqual(cash.context, document);
  assert.strictEqual(cash.selector, "#bar #foo");
  assert.strictEqual(cash.length, 0);
});

test("valid non-matching selector, valid non-matching context (HTMLElement)", () => {
  const context = document.querySelector("#bar");
  const cash = CashCash("#foo", context);

  assert.strictEqual(cash.context, document);
  assert.strictEqual(cash.selector, "#foo");
  assert.strictEqual(cash.length, 0);
});

test("valid non-matching selector, valid matching context (String)", () => {
  const cash = CashCash("#foo", "#fixtures");

  assert.strictEqual(cash.context, document);
  assert.strictEqual(cash.selector, "#fixtures #foo");
  assert.strictEqual(cash.length, 0);
});

test("valid non-matching selector, valid matching context (HTMLElement)", () => {
  const context = document.querySelector("#fixtures");
  const cash = CashCash("#foo", context);

  assert.strictEqual(cash.context, context);
  assert.strictEqual(cash.selector, "#foo");
  assert.strictEqual(cash.length, 0);
});

test("valid matching selector", () => {
  const cash = CashCash("#fixtures p");

  assert.strictEqual(cash.context, document);
  assert.strictEqual(cash.selector, "#fixtures p");
  assert.strictEqual(cash.length, 5);
});

test("valid matching selector, invalid context", () => {
  for (const invalidArgument of invalidArguments) {
    const cash = CashCash("p", invalidArgument);

    assert.strictEqual(cash.context, document);
    assert.strictEqual(cash.selector, "p");
    assert.strictEqual(cash.length, 5);
  }
});

test("valid matching selector, valid non-matching context (String)", () => {
  const cash = CashCash("p", "#foo");

  assert.strictEqual(cash.context, document);
  assert.strictEqual(cash.selector, "#foo p");
  assert.strictEqual(cash.length, 0);
});

test("valid matching selector, valid non-matching context (HTMLElement)", () => {
  const context = document.querySelector("#foo");
  const cash = CashCash("p", context);

  assert.strictEqual(cash.context, document);
  assert.strictEqual(cash.selector, "p");
  assert.strictEqual(cash.length, 5);
});

test("valid matching selector, valid matching context (String)", () => {
  const cash = CashCash("p", "#fixtures");

  assert.strictEqual(cash.context, document);
  assert.strictEqual(cash.selector, "#fixtures p");
  assert.strictEqual(cash.length, 5);
});

test("valid matching selector, valid matching context (HTMLElement)", () => {
  const context = document.querySelector("#fixtures");
  const cash = CashCash("p", context);

  assert.strictEqual(cash.context, context);
  assert.strictEqual(cash.selector, "p");
  assert.strictEqual(cash.length, 5);
});
