import CashCash from '../src/cashcash.js';

describe('CashCash', () => {
  const invalidArguments = [undefined, null, function() {}, {}, '', ' '];
  let div;

  beforeEach(() => {
    div = document.createElement('div');

    div.id = 'jasmine-fixtures';
    div.innerHTML = '<header><h1>CashCash: Tests</h1></header><p>1</p><p>2</p><p>3</p><p>4</p><p>5</p>';

    document.body.appendChild(div);
  });

  afterEach(() => {
    document.getElementById('jasmine-fixtures').remove();
  });

  describe('[i]', () => {
    describe('given an invalid selector', () => {
      describe('given any context', () => {
        it('is undefined.', () => {
          invalidArguments.forEach(selector => {
            invalidArguments.forEach(context => {
              expect(CashCash(selector, context)[0]).toBe(undefined);
            });

            expect(CashCash(selector, '#jasmine-fixtures')[0]).toBe(undefined);
            expect(CashCash(selector, document.body)[0]).toBe(undefined);
          });
        });
      });
    });

    describe('given a valid, non-matching selector', () => {
      describe('given any context', () => {
        it('is undefined.', () => {
          invalidArguments.forEach(context => {
            expect(CashCash('#foo', context)[0]).toBe(undefined);
          });

          expect(CashCash('#foo', '#jasmine-fixtures')[0]).toBe(undefined);
          expect(CashCash('#foo', document.body)[0]).toBe(undefined);
        });
      });
    });

    describe('given a valid, matching selector', () => {
      describe('given an invalid context', () => {
        it('returns an HTMLElement.', () => {
          invalidArguments.forEach(context => {
            expect(CashCash('#jasmine-fixtures', context)[0]).toEqual(jasmine.any(HTMLElement));
          });
        });
      });

      describe('given a valid, non-matching context', () => {
        it('is undefined.', () => {
          expect(CashCash('#jasmine-fixtures', '#foo')[0]).toBe(undefined);
        });
      });

      describe('given a valid, matching context', () => {
        it('returns an HTMLElement.', () => {
          expect(CashCash('p', '#jasmine-fixtures')[0]).toEqual(jasmine.any(HTMLElement));
        });
      });
    });
  });

  describe('.selector', () => {
    describe('given an invalid selector', () => {
      it('is undefined.', () => {
        invalidArguments.forEach(selector => {
          expect(CashCash(selector).selector).toBe(undefined);
        });
      });
    });

    describe('given a valid selector', () => {
      it('returns a string.', () => {
        expect(CashCash('foo bar').selector).toBe('foo bar');
      });
    });
  });

  describe('.context', () => {
    describe('given an invalid selector and any context', () => {
      it('is undefined.', () => {
        invalidArguments.forEach(selector => {
          invalidArguments.forEach(context => {
            expect(CashCash(selector, context).context).toBe(undefined);
          });

          expect(CashCash(selector, '#jasmine-fixtures').context).toBe(undefined);
          expect(CashCash(selector, document.body).context).toBe(undefined);
        });
      });
    });

    describe('given a valid selector', () => {
      describe('and context is a string', () => {
        it('returns document.', () => {
          expect(CashCash('#foo', '#bar').context).toBe(document);
        });
      });

      describe('and context is an HTMLElement', () => {
        it('returns an HTMLElement.', () => {
          expect(CashCash('#foo', document.body).context).toBe(document.body);
        });
      });
    });
  });

  describe('.length', () => {
    describe('given an invalid selector', () => {
      it('returns zero.', () => {
        invalidArguments.forEach(selector => {
          expect(CashCash(selector).length).toBe(0);
        });
      });
    });

    describe('given a valid, non-matching selector', () => {
      it('returns zero.', () => {
        expect(CashCash('#foo').length).toBe(0);
      });
    });

    describe('given a valid, matching selector', () => {
      it('returns an integer greater than zero.', () => {
        expect(CashCash('#jasmine-fixtures').length).toBeGreaterThan(0);
        expect(CashCash('#jasmine-fixtures p').length).toBeGreaterThan(0);
      });
    });
  });
});
