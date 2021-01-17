# CashCash

**A very small DOM library inspired by [jQuery](https://jquery.com) that smooths over some of the rough edges in JavaScript's native DOM querying methods.**

[![npm](https://img.shields.io/npm/v/@jgarber/cashcash.svg?logo=npm&style=for-the-badge)](https://www.npmjs.com/package/@jgarber/cashcash)
[![Downloads](https://img.shields.io/npm/dt/@jgarber/cashcash.svg?logo=npm&style=for-the-badge)](https://www.npmjs.com/package/@jgarber/cashcash)
[![Build](https://img.shields.io/circleci/build/github/jgarber623/CashCash?logo=circleci&style=for-the-badge)](https://app.circleci.com/pipelines/github/jgarber623/CashCash)
[![Maintainability](https://img.shields.io/codeclimate/maintainability/jgarber623/CashCash.svg?logo=code-climate&style=for-the-badge)](https://codeclimate.com/github/jgarber623/CashCash)
[![Coverage](https://img.shields.io/codeclimate/coverage/jgarber623/CashCash.svg?logo=code-climate&style=for-the-badge)](https://codeclimate.com/github/jgarber623/CashCash)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/jgarber623/CashCash?logo=snyk&style=for-the-badge)](https://snyk.io/test/github/jgarber623/CashCash)

### Key Features

- Uses JavaScript's native [`querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) method
- Dependency-free
- ES2015/AMD/Node module support

CashCash is also really tiny:

| Format                 | File Size   | Minified Size | Gzipped Size |
|:-----------------------|:------------|:--------------|:-------------|
| Uncompressed (module)  | 992 bytes   | 647 bytes     | 422 bytes    |
| Uncompressed (browser) | 1,313 bytes | 810 bytes     | 498 bytes    |
| Minified (browser)     | 812 bytes   | 810 bytes     | 498 bytes    |

## Getting CashCash

You've got a couple options for adding CashCash to your project:

- [Download a tagged version](https://github.com/jgarber623/CashCash/tags) from GitHub and do it yourself _(old school)_.
- Install using [npm](https://www.npmjs.com/package/@jgarber/cashcash): `npm install @jgarber/cashcash --save`
- Install using [Yarn](https://yarnpkg.com/en/package/@jgarber/cashcash): `yarn add @jgarber/cashcash`
- Install using [Bower](https://bower.io/search/?q=cashcash): `bower install cashcash --save`

## Usage

CashCash takes a similar approach to DOM selection as the aforementioned (and insanely popular) jQuery.

```js
CashCash('p');          // select all `<p>`s on a page
CashCash('#main');      // select the element with the ID of `main`
CashCash('p', '#main'); // select all `<p>`s within an element with the ID of `main`
```

CashCash accepts two arguments: a `selector` (a string) and an optional `context` (a string or an `HTMLElement`). For basic DOM selection, you should be fine passing in any supported CSS selector. For more advanced usage, the second `context` argument might prove useful:

```js
const divs = CashCash('div');              // select all `<div>`s on a page
const paragraphs = CashCash('p', divs[0]); // select all `<p>`s within the first `<div>`
```

Under the covers, CashCash uses the browser's native [`querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) method and therefore supports the same CSS selectors.

When selecting DOM nodes based on the provided `selector` string, CashCash will store references to those selected DOM elements on itself in an array-like fashion for easy access to individual DOM nodes.

Given the following markup:

```html
<p>Paragraph 1</p>
<p>Paragraph 2</p>
<p>Paragraph 3</p>
<p>Paragraph 4</p>
<p>Paragraph 5</p>
```

You can do the following:

```js
const paragraphs = CashCash('p');

console.log(paragraphs[0]); // logs `<p>Paragraph 1</p>`
console.log(paragraphs[1]); // logs `<p>Paragraph 2</p>`
// …
console.log(paragraphs[4]); // logs `<p>Paragraph 5</p>`
```

### Properties and Methods

#### `length`

For all queries (valid or otherwise), CashCash will return the length (defaulting to `0`) of the queried elements.

```js
const thisManyBodyElements = CashCash('body').length; // returns `1`
```

#### `selector`

As best as possible, CashCash keeps track of the selector used in a given query, making it available to you by calling:

```js
console.log(CashCash('p').selector);                // logs the string `p`
console.log(CashCash('p', '#container').selector);  // logs the string `#container p`
console.log(CashCash('p', document.body).selector); // logs the string `p`
```

#### `context`

CashCash makes available a reference to the context for a given query (if one is provided and that context is an `HTMLElement`). If no context is given (or if the given context is a string), CashCash will default to `HTMLDocument`.

```js
console.log(CashCash('p').context);                // logs a reference to `HTMLDocument`
console.log(CashCash('p', '#container').context);  // logs a reference to `HTMLDocument`
console.log(CashCash('p', document.body).context); // logs a reference to `<body>`

const container = CashCash('#container');

console.log(CashCash('p', container[0]).context); // logs a reference to `<div id="container">`
```

### Example

For a full-featured CashCash demonstration, check out [the included example file](https://github.com/jgarber623/CashCash/blob/main/example/index.html).

## Tips and Tricks

### Mimicking jQuery

If you want to cut down on some typing (and potentially confuse your teammates), you can reassign `CashCash` to `$` to mimic jQuery:

```html
<script src="./dist/cashcash.js"></script>
<script>
  (function($) {
    const paragraphs = $('p');

    // …
  })(CashCash);
</script>
```

## Browser Support

CashCash works in modern browsers. The library makes use of several new(ish) JavaScript features, including:

- Arrow function expressions ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions))
- Classes ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes))
- Template literals ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals))
- `Document.querySelectorAll()` ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll))
- `NodeList.prototype.forEach` ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach))

CashCash, in an effort to remain as lightweight and dependency-free as possible, leaves it up to you to choose whether or not to polyfill features for older browsers.

## Acknowledgments

CashCash is inspired by [jQuery](https://jquery.com) and the many micro DOM libraries it inspired (like [Ken Wheeler](http://kenwheeler.github.io)'s [cash](https://github.com/kenwheeler/cash), for instance).

CashCash is written and maintained by [Jason Garber](https://sixtwothree.org) and is another in a growing line of small, curiously-named JavaScript utilities:

- [RadioRadio](https://github.com/jgarber623/RadioRadio), a very small [PubSub](https://en.wikipedia.org/wiki/Publish–subscribe_pattern) library.
- [RouterRouter](https://github.com/jgarber623/RouterRouter), a very small routing library extracted from [Backbone's Router](http://backbonejs.org/docs/backbone.html#section-185).
- [TemplateTemplate](https://github.com/jgarber623/TemplateTemplate), a very small `<template>` manipulation library.

## License

CashCash is freely available under the [MIT License](https://opensource.org/licenses/MIT). Use it, learn from it, fork it, improve it, change it, tailor it to your needs.
