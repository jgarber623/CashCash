#!/usr/bin/env phantomjs

var fs = require('fs');
var page = require('webpage').create();
var system = require('system');

var colorizedText = function(color, text) {
	return '\033[' + color + 'm' + text + '\033[0m';
};

page.onConsoleMessage = function(message) {
	console.log(message);
};

page.open(system.args[1], function() {
	var statuses = [];
	var pendingSpecs = [];
	var failedSpecs = [];

	var specs = page.evaluate(function() {
		return jsApiReporter.specs();
	});

	specs.forEach(function(spec) {
		if (spec.status === 'failed') {
			failedSpecs.push({
				name: spec.fullName,
				messages: spec.failedExpectations.map(function(expectation) {
					return expectation.message;
				})
			});

			statuses.push({
				color: 31,
				text: 'F'
			});
		} else if (spec.status === 'pending') {
			pendingSpecs.push({
				name: spec.fullName,
				reason: spec.pendingReason
			});

			statuses.push({
				color: 33,
				text: '*'
			});
		} else {
			statuses.push({
				color: 32,
				text: '.'
			});
		}
	});

	console.log(statuses.map(function(status) {
		return colorizedText(status.color, status.text);
	}).join(''));

	console.log('');

	if (pendingSpecs.length) {
		console.log('Pending:');
		console.log('');

		pendingSpecs.forEach(function(spec, index) {
			var normalizedIndex = index + 1;
			var specNamePrefix = '  ' + normalizedIndex + ') ';
			var pendingReasonPrefix = '     ' + (normalizedIndex > 9 ? ' ' : '') + '# ';

			console.log(colorizedText(33, specNamePrefix + spec.name));
			console.log(colorizedText(36, pendingReasonPrefix + (spec.reason.length ? spec.reason : 'No reason given')));
			console.log('');
		});

		console.log('');
	}

	if (failedSpecs.length) {
		console.log('Failures:');
		console.log('');

		failedSpecs.forEach(function(spec, index) {
			var normalizedIndex = index + 1;
			var specNamePrefix = '  ' + normalizedIndex + ') ';
			var messagePrefix = '     ' + (normalizedIndex > 9 ? ' ' : '') + colorizedText(31, 'Failure/Error:') + ' ';

			console.log(specNamePrefix + spec.name);

			spec.messages.forEach(function(message) {
				console.log(messagePrefix + message);
			});

			console.log('');
		});

		console.log('');
	}

	console.log(page.evaluate(function() {
		return document.querySelector('.jasmine-alert > .jasmine-bar').innerHTML + document.querySelector('.jasmine-alert > .jasmine-duration').innerHTML.replace('finished', '') + '.';
	}));

	console.log('');

	phantom.exit(failedSpecs.length ? 1 : 0);
});
