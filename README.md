> [!IMPORTANT]
> This project has moved to [codeberg.org/jgarber/CashCash](https://codeberg.org/jgarber/CashCash).

# CashCash

**A very small DOM library inspired by [jQuery](https://jquery.com) that smooths over some of the rough edges in JavaScript's native DOM querying methods.**

[![npm](https://img.shields.io/npm/v/@jgarber/cashcash.svg?logo=npm&style=for-the-badge)](https://www.npmjs.com/package/@jgarber/cashcash)
[![Downloads](https://img.shields.io/npm/dt/@jgarber/cashcash.svg?logo=npm&style=for-the-badge)](https://www.npmjs.com/package/@jgarber/cashcash)
[![Build](https://img.shields.io/github/actions/workflow/status/jgarber623/CashCash/ci.yml?branch=main&logo=github&style=for-the-badge)](https://github.com/jgarber623/CashCash/actions/workflows/ci.yml)

> [!NOTE]
> CashCash is feature complete and will only be updated to address bugs or security issues.

### Key Features

- Uses JavaScript's native [`querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) method
- Dependency-free
- JavaScript module (ESM) support

## Getting CashCash

You've got a couple options for adding CashCash to your project:

- [Download a release](https://github.com/jgarber623/CashCash/releases) from GitHub and do it yourself _(old school)_.
- Install using [npm](https://www.npmjs.com/package/@jgarber/cashcash): `npm install @jgarber/cashcash --save`
- Install using [Yarn](https://yarnpkg.com/en/package/@jgarber/cashcash): `yarn add @jgarber/cashcash`

## Usage

CashCash takes a similar approach to DOM selection as the aforementioned (and insanely popular) jQuery.

```js
CashCash("p");          // select all `<p>`s on a page
CashCash("#main");      // select the element with the ID of `main`
CashCash("p", "#main"); // select all `<p>`s within an element with the ID of `main`
```

CashCash accepts two arguments: a `selector` (a string) and an optional `context` (a string or an `HTMLElement`). For basic DOM selection, you should be fine passing in any supported CSS selector. For more advanced usage, the second `context` argument might prove useful:

```js
const divs = CashCash("div");              // select all `<div>`s on a page
const paragraphs = CashCash("p", divs[0]); // select all `<p>`s within the first `<div>`
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
const paragraphs = CashCash("p");

paragraphs.forEach(paragraph => console.log(paragraph)); // logs `<p>Paragraph 1</p>`, `<p>Paragraph 2</p>`, etc.
```

### Collection Properties

#### `length`

For all queries (valid or otherwise), CashCash will return the length (defaulting to `0`) of the queried elements.

```js
const thisManyBodyElements = CashCash("body").length; // returns `1`
```

#### `selector`

As best as possible, CashCash keeps track of the selector used in a given query, making it available to you by calling:

```js
console.log(CashCash("p").selector);                // logs the string `p`
console.log(CashCash("p", "#container").selector);  // logs the string `#container p`
console.log(CashCash("p", document.body).selector); // logs the string `p`
```

#### `context`

CashCash makes available a reference to the context for a given query (if one is provided and that context is an `HTMLElement`). If no context is given (or if the given context is a string), CashCash will default to `HTMLDocument`.

```js
console.log(CashCash("p").context);                // logs a reference to `HTMLDocument`
console.log(CashCash("p", "#container").context);  // logs a reference to `HTMLDocument`
console.log(CashCash("p", document.body).context); // logs a reference to `<body>`

const container = CashCash("#container");

console.log(CashCash("p", container[0]).context); // logs a reference to `<div id="container">`
```

### Example

For a full-featured CashCash demonstration, check out [the demo page](https://jgarber623.github.io/CashCash/example/) and [the example file](https://github.com/jgarber623/CashCash/blob/main/example/index.html).

## Tips and Tricks

### Mimicking jQuery

If you want to cut down on some typing (and potentially confuse your teammates), you can reassign `CashCash` to `$` to mimic jQuery:

```html
<script type="module">
  import { default as $ } from "@jgarber/cashcash";

  const paragraphs = $("p");

  // …
</script>
```

## Browser Support

**CashCash works in modern browsers.** The library makes use of several new(ish) JavaScript features and, in an effort to remain as lightweight and dependency-free as possible, leaves it up to you to choose whether or not to polyfill features for older browsers.

## Acknowledgments

CashCash is inspired by [jQuery](https://jquery.com) and the many micro DOM libraries it inspired (like [Ken Wheeler](http://kenwheeler.github.io)'s [cash](https://github.com/kenwheeler/cash), for instance).

CashCash is written and maintained by [Jason Garber](https://sixtwothree.org) and is another in a growing line of small, curiously-named JavaScript utilities:

- [RadioRadio](https://github.com/jgarber623/RadioRadio), a very small [PubSub](https://en.wikipedia.org/wiki/Publish–subscribe_pattern) library.
- [RouterRouter](https://github.com/jgarber623/RouterRouter), a very small routing library extracted from [Backbone's Router](http://backbonejs.org/docs/backbone.html#section-185).
- [TemplateTemplate](https://github.com/jgarber623/TemplateTemplate), a very small `<template>` manipulation library.

## License

CashCash is freely available under the [MIT License](https://opensource.org/licenses/MIT). Use it, learn from it, fork it, improve it, change it, tailor it to your needs.
