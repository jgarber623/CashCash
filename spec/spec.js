describe('CashCash', function() {
	var invalidArguments = [undefined, null, function() {}, {}, '', ' '];

	beforeEach(function() {
		var div = document.createElement('div');

		div.id = 'jasmine-fixtures';
		div.innerHTML = '<header><h1>CashCash: Tests</h1></header><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p>';

		document.body.appendChild(div);
	});

	afterEach(function() {
		document.getElementById('jasmine-fixtures').remove();
	});

	describe('[i]', function() {
		describe('when given an invalid selector', function() {
			it('is undefined when given any context.', function() {
				invalidArguments.forEach(function(selector) {
					invalidArguments.forEach(function(context) {
						expect(CashCash(selector, context)[0]).toBe(undefined);
					});

					expect(CashCash(selector, '#jasmine-fixtures')[0]).toBe(undefined);
					expect(CashCash(selector, document.body)[0]).toBe(undefined);
				});
			});
		});

		describe('when given a valid, non-matching selector', function() {
			it('is undefined when given any context.', function() {
				invalidArguments.forEach(function(context) {
					expect(CashCash('#foo', context)[0]).toBe(undefined);
				});

				expect(CashCash('#foo', '#jasmine-fixtures')[0]).toBe(undefined);
				expect(CashCash('#foo', document.body)[0]).toBe(undefined);
			});
		});

		describe('when given a valid, matching selector', function() {
			it('returns an HTMLElement when given an invalid context.', function() {
				invalidArguments.forEach(function(context) {
					expect(CashCash('#jasmine-fixtures', context)[0]).toEqual(jasmine.any(HTMLElement));
				});
			});

			it('is undefined when given a valid, non-matching context.', function() {
				expect(CashCash('#jasmine-fixtures', '#foo')[0]).toBe(undefined);
			});

			it('returns an HTMLElement when given a valid, matching context.', function() {
				expect(CashCash('p', '#jasmine-fixtures')[0]).toEqual(jasmine.any(HTMLElement));
			});
		});
	});

	describe('.context', function() {
		it('is undefined when given an invalid selector and any context.', function() {
			invalidArguments.forEach(function(selector) {
				invalidArguments.forEach(function(context) {
					expect(CashCash(selector, context).context).toBe(undefined);
				});

				expect(CashCash(selector, '#jasmine-fixtures').context).toBe(undefined);
				expect(CashCash(selector, document.body).context).toBe(undefined);
			});
		});

		it('returns document when given a valid selector and context is a string.', function() {
			expect(CashCash('#foo', '#bar').context).toBe(document);
		});

		it('returns an HTMLElement when given a valid selector and context is an HTMLElement.', function() {
			expect(CashCash('#foo', document.body).context).toBe(document.body);
		});
	});

	describe('.length', function() {
		it('returns zero when given an invalid selector.', function() {
			invalidArguments.forEach(function(selector) {
				expect(CashCash(selector).length).toBe(0);
			});
		});

		it('returns zero when given a valid, non-matching selector.', function() {
			expect(CashCash('#foo').length).toBe(0);
		});

		it('returns an integer greater than zero given a valid, matching selector.', function() {
			expect(CashCash('#jasmine-fixtures').length).toBeGreaterThan(0);
			expect(CashCash('#jasmine-fixtures p').length).toBeGreaterThan(0);
		});
	});

	describe('.selector', function() {
		it('is undefined when given an invalid selector.', function() {
			invalidArguments.forEach(function(selector) {
				expect(CashCash(selector).selector).toBe(undefined);
			});
		});

		it('returns a string when given a valid selector.', function() {
			expect(CashCash('foo bar').selector).toBe('foo bar');
		});
	});

	describe('.toArray()', function() {
		it('returns an empty array when given an invalid selector.', function() {
			invalidArguments.forEach(function(selector) {
				expect(CashCash(selector).toArray()).toEqual([]);
			});
		});

		it('returns an empty array when given a valid, non-matching selector.', function() {
			expect(CashCash('#foo').toArray()).toEqual([]);
		});

		it('returns a non-empty array when given a valid, matching selector.', function() {
			var container = document.getElementById('jasmine-fixtures');

			expect(CashCash('#jasmine-fixtures').toArray()).toContain(container);
			expect(CashCash('#jasmine-fixtures p').toArray()).toContain(container.querySelector('p'));
		});
	});
});