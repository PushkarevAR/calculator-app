/* eslint-disable no-unused-expressions */

/* Validation rules:
  --- only numbers & allowed operator & brackets
  --- no operator sequence
  --- number before opening bracket
  --- brackets balance
*/

function isValid(input: string): boolean | never {
  const numbers = /^\d+$/;
  const operators = '.*/+-';
  const brackets = '()';
  let counter = 0;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const nextChar = input[index + 1];

    const isNumber = !!char.match(numbers);
    const isOperator = operators.indexOf(char) >= 0;
    const isBracket = brackets.indexOf(char) >= 0;
    const nextUnary = '+-'.indexOf(nextChar) >= 0;

    if (!isNumber && !isOperator && !isBracket) {
      throw new SyntaxError('Unknown operators');
    }

    if (isOperator && operators.indexOf(nextChar) >= 0 && !nextUnary) {
      throw new SyntaxError('Incorrect operators combination');
    }

    if (isNumber && '('.indexOf(nextChar) >= 0) {
      throw new SyntaxError('Missing operator before (');
    }

    if (isBracket) {
      char === '(' ? counter += 1 : counter -= 1;
    }
  }
  if (counter === 0) return true;
  throw new SyntaxError('Incorrect brackets input');
}

export default isValid;
