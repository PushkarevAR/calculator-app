/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable dot-notation */
/* eslint-disable no-prototype-builtins */
import { Tokenizer } from './tokenizer';
import { Node, Parser } from './parser';

function evaluate(tree: Node): number {
  let left: number;
  let right: number;
  let expression: number;

  if (tree === undefined) throw new SyntaxError('Tree - undefined');

  if (tree.hasOwnProperty('Expression')) return evaluate(tree['Expression']!);

  if (tree.hasOwnProperty('Number')) return parseFloat(tree['Number']!);

  if (tree.hasOwnProperty('Binary')) {
    const treeDupe = tree['Binary']!;
    // tree = tree['Binary']!;
    right = evaluate(treeDupe['Right']!);
    left = evaluate(treeDupe['Left']!);
    switch (treeDupe['Operator']) {
      case '+':
        return left + right;
      case '-':
        return left - right;
      case '*':
        return left * right;
      case '/':
        return left / right;
      default:
        throw new SyntaxError(`Unknown operator ${treeDupe['Operator']}`);
    }
  }

  if (tree.hasOwnProperty('Unary')) {
    const treeDupe = tree['Unary']!;
    // tree = tree['Unary']!;
    expression = evaluate(treeDupe['Expression']!);
    switch (treeDupe['Operator']) {
      case '+':
        return expression;
      case '-':
        return -expression;
      default:
        throw new SyntaxError(`Unknown operator ${treeDupe['Operator']}`);
    }
  }

  throw new SyntaxError('Unknown syntax node');
}

function calculate(input: string): number {
  const tokens = new Tokenizer(input);
  const parser = new Parser(tokens);
  return evaluate(parser.parse());
}

export default calculate;
