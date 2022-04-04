/* eslint-disable no-constant-condition */
/* eslint-disable lines-between-class-members */
export type Token = {
    type: string;
    value: string;
};

interface iTokenizer {
    nextToken(): Token | undefined;
    peekNextToken(): Token | undefined;
}

class Tokenizer implements iTokenizer {
  private len: number;
  private index: number;
  public expression: string;

  constructor(expression: string) {
    this.expression = expression.replace(/\s/g, '');
    this.len = expression.length;
    this.index = 0;
  }

  static isDigit = (char: string): boolean => char >= '0' && char <= '9';

  static createToken(type: string, value: string): Token {
    return { type, value };
  }

  private getNextChar(): string {
    let char = '';

    if (this.index < this.len) {
      char = this.expression.charAt(this.index);
      this.index += 1;
    }
    return char;
  }

  private peekNextChar(): string {
    return this.index < this.len ? this.expression.charAt(this.index) : '';
  }

  private scanOperator(): Token | undefined {
    const char: string = this.peekNextChar();
    const operators = '+-*/()';

    if (operators.indexOf(char) >= 0) { return Tokenizer.createToken('Operator', this.getNextChar()); }
    return undefined;
  }

  private scanNumber(): Token | undefined {
    let char: string = this.peekNextChar();
    let number = '';

    if (!Tokenizer.isDigit(char) && char !== '.') return undefined;
    if (char !== '.') {
      number = this.getNextChar();

      while (true) {
        char = this.peekNextChar();
        if (!Tokenizer.isDigit(char)) break;
        number += this.getNextChar();
      }
    }

    if (char === '.') {
      number += this.getNextChar();

      while (true) {
        char = this.peekNextChar();
        if (!Tokenizer.isDigit(char)) break;
        number += this.getNextChar();
      }
    }

    return Tokenizer.createToken('Number', number);
  }

  nextToken(): Token | undefined {
    let token: Token | undefined;

    if (this.index >= this.len) return undefined;

    token = this.scanNumber();
    if (token !== undefined) return token; // or should i use typeof token !== undefined? idk

    token = this.scanOperator();
    if (token !== undefined) return token;

    throw new SyntaxError(`Undefined input, token = ${token}`);
  }

  peekNextToken(): Token | undefined {
    let token: Token | undefined;
    const idx: number = this.index;

    try {
      token = this.nextToken();
    } catch (e) {
      token = undefined;
    }
    this.index = idx;
    return token;
  }
}

export { Tokenizer };
