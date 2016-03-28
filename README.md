# CashCash

[![npm version](https://badge.fury.io/js/cashcash.svg)](https://badge.fury.io/js/cashcash)
[![Code Climate](https://codeclimate.com/github/jgarber623/CashCash/badges/gpa.svg)](https://codeclimate.com/github/jgarber623/CashCash)

CashCash is a very small DOM library inspired by [jQuery](http://jquery.com/). The project's primary goal is to smooth over some of the rough edges in JavaScript's native DOM querying methods.

### Key Features

- Uses JavaScript's native [querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) method
- Dependency-free
- AMD/CommonJS module support

CashCash is also really tiny:

<table>
	<tbody>
		<tr>
			<th>Uncompressed</th>
			<td>1,349 bytes</td>
		</tr>
		<tr>
			<th>Minified</th>
			<td>831 bytes</td>
		</tr>
		<tr>
			<th>Minified and gzipped</th>
			<td>499 bytes</td>
		</tr>
	</tbody>
</table>


## Getting CashCash

Adding CashCash to your project is easy! You've got a couple options:

- [Download a tagged version](https://github.com/jgarber623/CashCash/tags) from GitHub and do it yourself _(old school)_.
- Install via [Bower](http://bower.io/): `bower install cashcash`
- Install via [npm](https://www.npmjs.com/): `npm install cashcash`


## Usage

CashCash takes a similar approach to DOM selection as the aforementioned (and insanely popular) jQuery.

```js
CashCash('p');          // select all `<p>`s on a page
CashCash('#main');      // select the element with the ID of `main`
CashCash('p', '#main'); // select all `<p>`s within an element with the ID of `main`
```

CashCash takes two arguments: a `selector` (a string) and an optional `context` (a string or an `HTMLElement`). For basic DOM selection, you should be fine passing in any supported CSS selector. For more advanced usage, the second `context` argument might prove useful:

```js
var divs = CashCash('div');              // select all `<div>`s on a page
var paragraphs = CashCash('p', divs[0]); // select all `<p>`s within the first container `<div>`
```

When selecting DOM nodes based on the provided `selector` string, CashCash will store references to those selected DOM elements on itself in an array like fashion for easy access to individual DOM nodes.

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
var paragraphs = CashCash('p');

console.log(paragraphs[0]); // logs `<p>Paragraph 1</p>`
console.log(paragraphs[1]); // logs `<p>Paragraph 2</p>`
…
console.log(paragraphs[4]); // logs `<p>Paragraph 5</p>`
```

### Utilities

#### selector

As best as possible, CashCash keeps track of the selector used in a given query, making it available to you by calling:

```js
console.log(CashCash('p').selector);       // logs the string `p`
console.log(CashCash('p', '#container'));  // logs the string `#container p`
console.log(CashCash('p', document.body)); // logs the string `p`
```

#### context

CashCash makes available a reference to the context for a given query (if one is provided and that context is an `HTMLElement`). If no context is given (or if the given context is a string), CashCash will default to `HTMLDocument`.

```js
console.log(CashCash('#container'));      // logs a reference to `HTMLDocument`
console.log(CashCash('p', container[0])); // logs a reference to `container[0]`
```

#### length

For all queries (valid or otherwise), CashCash will return the length (defaulting to `0`) of the queried elements.

```js
var thisManyBodyElements = CashCash('body').length; // returns `1`
```

#### toArray

JavaScript's native `querySelectorAll` method returns a [`NodeList`](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) which is _like_ an array, but lacks at least one useful feature of arrays: the [`forEach`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) method. To ease that particular pain, CashCash objects can be converted to arrays:

```js
var paragraphsArray = CashCash('p').toArray();
```

You can now use any of JavaScript's native array methods. For instance, you can then iterate over the array of `HTMLElement`s:

```js
CashCash('p').toArray().forEach(function(el) {
    console.log(el);
});
```

### Mimicking jQuery

If you want to cut down on some typing (and potentially confuse your teammates), you can reassign `CashCash` to `$` to mimic jQuery:

```html
<script src="./dist/cashcash.js"></script>
<script>
    (function($) {
        var paragraphs = $('p');

        …
    })(CashCash);
</script>
```


## Browser Support

CashCash works in all modern browsers.

It makes use of the [querySelectorAll method](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) which first appeared in Internet Explorer in version 8. To avoid throwing JavaScript errors in browsers that don't support this method, you can [cut the mustard](http://responsivenews.co.uk/post/18948466399/cutting-the-mustard):

```js
if ('querySelector' in document) {
    // Your scripts here…
}
```


## Acknowledgments

CashCash is inspired by [jQuery](http://jquery.com/) and the many micro DOM libraries it inspired (like [Ken Wheeler](http://kenwheeler.github.io/)'s [cash](https://github.com/kenwheeler/cash), for instance).

CashCash is written and maintained by [Jason Garber](https://sixtwothree.org/) and is another in a growing line of small, curiously-named JavaScript utilities:

- [RadioRadio](https://github.com/jgarber623/RadioRadio), a very basic [PubSub](https://en.wikipedia.org/wiki/Publish–subscribe_pattern) library.
- [RouterRouter](https://github.com/jgarber623/RouterRouter), a routing library extracted from [Backbone's Router](http://backbonejs.org/docs/backbone.html#section-169)l


## License

CashCash is freely available under [The MIT License](http://opensource.org/licenses/MIT). Use it, learn from it, fork it, improve it, change it, tailor it to your needs.