describe('CashCash', function() {
	'use strict';

	var invalidArguments = [undefined, null, function() {}, {}, '', ' '],
		div;

	describe('its prototype', function() {
		describe('.length', function() {
			it('defaults to zero.', function() {
				expect(CashCash.prototype.length).toEqual(0);
			});
		});

		describe('.toArray()', function() {
			it('is a function.', function() {
				expect(typeof CashCash.prototype.toArray === 'function').toBe(true);
			});
		});
	});

	describe('an instance', function() {
		beforeEach(function() {
			div = document.createElement('div');

			div.id = 'jasmine-fixtures';
			div.innerHTML = '<header><h1>CashCash: Tests</h1></header><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p>';

			document.body.appendChild(div);
		});

		afterEach(function() {
			document.getElementById('jasmine-fixtures').remove();
		});

		it('is an instance of CashCash.', function() {
			expect(CashCash('#jasmine-fixtures') instanceof CashCash).toBe(true);
		});

		describe('[i]', function() {
			describe('given an invalid selector', function() {
				describe('given any context', function() {
					it('is undefined.', function() {
						invalidArguments.forEach(function(selector) {
							invalidArguments.forEach(function(context) {
								expect(CashCash(selector, context)[0]).toBe(undefined);
							});

							expect(CashCash(selector, '#jasmine-fixtures')[0]).toBe(undefined);
							expect(CashCash(selector, document.body)[0]).toBe(undefined);
						});
					});
				});
			});

			describe('given a valid, non-matching selector', function() {
				describe('given any context', function() {
					it('is undefined.', function() {
						invalidArguments.forEach(function(context) {
							expect(CashCash('#foo', context)[0]).toBe(undefined);
						});

						expect(CashCash('#foo', '#jasmine-fixtures')[0]).toBe(undefined);
						expect(CashCash('#foo', document.body)[0]).toBe(undefined);
					});
				});
			});

			describe('given a valid, matching selector', function() {
				describe('given an invalid context', function() {
					it('returns an HTMLElement.', function() {
						invalidArguments.forEach(function(context) {
							expect(CashCash('#jasmine-fixtures', context)[0]).toEqual(jasmine.any(HTMLElement));
						});
					});
				});

				describe('given a valid, non-matching context', function() {
					it('is undefined.', function() {
						expect(CashCash('#jasmine-fixtures', '#foo')[0]).toBe(undefined);
					});
				});

				describe('given a valid, matching context', function() {
					it('returns an HTMLElement.', function() {
						expect(CashCash('p', '#jasmine-fixtures')[0]).toEqual(jasmine.any(HTMLElement));
					});
				});
			});
		});

		describe('.selector', function() {
			describe('given an invalid selector', function() {
				it('is undefined.', function() {
					invalidArguments.forEach(function(selector) {
						expect(CashCash(selector).selector).toBe(undefined);
					});
				});
			});

			describe('given a valid selector', function() {
				it('returns a string.', function() {
					expect(CashCash('foo bar').selector).toBe('foo bar');
				});
			});
		});

		describe('.context', function() {
			describe('given an invalid selector and any context', function() {
				it('is undefined.', function() {
					invalidArguments.forEach(function(selector) {
						invalidArguments.forEach(function(context) {
							expect(CashCash(selector, context).context).toBe(undefined);
						});

						expect(CashCash(selector, '#jasmine-fixtures').context).toBe(undefined);
						expect(CashCash(selector, document.body).context).toBe(undefined);
					});
				});
			});

			describe('given a valid selector', function() {
				describe('and context is a string', function() {
					it('returns document.', function() {
						expect(CashCash('#foo', '#bar').context).toBe(document);
					});
				});

				describe('and context is an HTMLElement', function() {
					it('returns an HTMLElement.', function() {
						expect(CashCash('#foo', document.body).context).toBe(document.body);
					});
				});
			});
		});

		describe('.length', function() {
			describe('given an invalid selector', function() {
				it('returns zero.', function() {
					invalidArguments.forEach(function(selector) {
						expect(CashCash(selector).length).toBe(0);
					});
				});
			});

			describe('given a valid, non-matching selector', function() {
				it('returns zero.', function() {
					expect(CashCash('#foo').length).toBe(0);
				});
			});

			describe('given a valid, matching selector', function() {
				it('returns an integer greater than zero.', function() {
					expect(CashCash('#jasmine-fixtures').length).toBeGreaterThan(0);
					expect(CashCash('#jasmine-fixtures p').length).toBeGreaterThan(0);
				});
			});
		});

		describe('.toArray()', function() {
			describe('given an invalid selector', function() {
				it('returns an empty array.', function() {
					invalidArguments.forEach(function(selector) {
						expect(CashCash(selector).toArray()).toEqual([]);
					});
				});
			});

			describe('given a valid, non-matching selector', function() {
				it('returns an empty array.', function() {
					expect(CashCash('#foo').toArray()).toEqual([]);
				});
			});

			describe('given a valid, matching selector', function() {
				it('returns a non-empty array.', function() {
					var container = document.getElementById('jasmine-fixtures');

					expect(CashCash('#jasmine-fixtures').toArray()).toContain(container);
					expect(CashCash('#jasmine-fixtures p').toArray()).toContain(container.querySelector('p'));
				});
			});
		});
	});
});