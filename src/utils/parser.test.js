import { Tokenizer } from './tokenizer';
import { Parser } from './parser';

const sumTokens = new Tokenizer('1+2');
const sumParser = new Parser(sumTokens);
const sumResult = {
  Expression: {
    Binary: {
      Left: {
        Number: '1',
      },
      Operator: '+',
      Right: {
        Number: '2',
      },
    },
  },
};

const tokens = new Tokenizer('1+-2*(4/2)');
const parser = new Parser(tokens);
const result = {
  Expression: {
    Binary: {
      Operator: '+',
      Left: {
        Number: '1',
      },
      Right: {
        Binary: {
          Operator: '*',
          Left: {
            Unary: {
              Operator: '-',
              Expression: {
                Number: '2',
              },
            },
          },
          Right: {
            Expression: {
              Binary: {
                Operator: '/',
                Left: {
                  Number: '4',
                },
                Right: {
                  Number: '2',
                },
              },
            },
          },
        },
      },
    },
  },
};

const sumParseFn = (x) => sumParser.parse(x);
const parseFn = (x) => parser.parse(x);

it('parser tests:', () => {
  expect(sumParseFn(sumTokens)).toEqual(sumResult);
  expect(parseFn(tokens)).toEqual(result);
});
