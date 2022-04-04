/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable quote-props */
/* eslint-disable lines-between-class-members */
import { Token, Tokenizer } from './tokenizer';

export interface Node {
    'Expression'?: Node;
    'Operator'?: string;
    'Number'?: string;
    'Binary'?: Node;
    'Unary'?: Node;
    'Left'?: Node;
    'Right'?: Node;
}

class Parser {
  private T: Tokenizer;

  constructor(T: Tokenizer) {
    this.T = T;
  }

  static matchOperator(token: Token, operator: string): boolean {
    return (
      token !== undefined && token.type === 'Operator' && token.value === operator
    );
  }

  static isToken(token: Token | undefined): boolean {
    return token !== undefined;
  }

  private parsePrimary(): Node {
    let token: Token;
    let expr: Node;

    if (!Parser.isToken(this.T.peekNextToken())) throw new SyntaxError('Token is undefined');

    token = this.T.peekNextToken()!;

    if (token?.type === 'Number') {
      token = this.T.nextToken()!;
      return {
        'Number': token?.value,
      };
    }

    if (Parser.matchOperator(token, '(')) {
      this.T.nextToken();
      expr = this.parseAdditive();
      token = this.T.nextToken()!;

      if (!Parser.matchOperator(token, ')')) throw new SyntaxError('Expecting )');

      return {
        'Expression': expr,
      };
    }

    throw new SyntaxError(`Parse error, cant process token${token?.value}`);
  }

  private parseUnary(): Node {
    let token: Token;
    let expr: Node;

    token = this.T.peekNextToken()!;

    if (Parser.matchOperator(token, '-') || Parser.matchOperator(token, '+')) {
      token = this.T.nextToken()!;
      expr = this.parseUnary();
      return {
        'Unary': {
          'Operator': token?.value,
          'Expression': expr,
        },
      };
    }
    return this.parsePrimary();
  }

  private parseMultiplicative(): Node {
    let token: Token;
    let expr: Node;

    expr = this.parseUnary();
    token = this.T.peekNextToken()!;

    while (Parser.matchOperator(token, '*') || Parser.matchOperator(token, '/')) {
      token = this.T.nextToken()!;
      expr = {
        'Binary': {
          'Operator': token?.value,
          'Left': expr,
          'Right': this.parseUnary(),
        },
      };
      token = this.T.peekNextToken()!;
    }
    return expr;
  }

  private parseAdditive(): Node {
    let token: Token;
    let expr: Node;

    expr = this.parseMultiplicative();
    token = this.T.peekNextToken()!; // peek next token

    while (Parser.matchOperator(token, '+') || Parser.matchOperator(token, '-')) {
      token = this.T.nextToken()!; // move to t next token
      expr = {
        'Binary': {
          'Operator': token?.value,
          'Left': expr,
          'Right': this.parseMultiplicative(),
        },
      };
      token = this.T.peekNextToken()!; // peek next token
    }
    return expr;
  }

  parse(): Node {
    const expr = this.parseAdditive();

    return {
      'Expression': expr,
    };
  }
}

export { Parser };
