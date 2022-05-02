import React, { useState } from 'react';
import InputButton from './InputButton';
import calculate from '../utils/calculate';
import isValid from '../utils/validation';

function Calculator(): JSX.Element {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | string>(0);

  const handleClick = (content: string): void => {
    setInput(input + content);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCalculation(input);
  };

  const handleDelete = (): void => {
    if (input.length > 0) {
      setInput('');
      setResult(0);
    } else setResult('input is empty');
  };

  const handleCalculation = (expression: string): void => {
    let valid = false;
    try {
      valid = isValid(expression);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setResult(error.message);
      }
    }
    try {
      if (valid) setResult(calculate(expression));
    } catch (error: unknown) {
      if (error instanceof Error) console.log(error.message);
      else console.log(error);
    }
  };

  const resultClasses = `result ${
    result.toString().length > 12 ? 'error' : ''
  }`;

  return (
    <div className="calculator">
      <form action="" className="inputForm" onSubmit={(e) => handleSubmit(e)}>
        <input type="text" className="input" id="exprInput" value={input} onChange={(e) => handleChange(e)} />
      </form>
      <p className={resultClasses} id="result">{result}</p>
      <div className="line">
        <InputButton content="C" clicked={() => handleDelete()} />
        <InputButton content="(" clicked={() => handleClick('(')} />
        <InputButton content=")" clicked={() => handleClick(')')} />
        <InputButton content="/" clicked={() => handleClick('/')} />
      </div>
      <div className="line">
        <InputButton content="7" clicked={() => handleClick('7')} />
        <InputButton content="8" clicked={() => handleClick('8')} />
        <InputButton content="9" clicked={() => handleClick('9')} />
        <InputButton content="x" clicked={() => handleClick('*')} />
      </div>
      <div className="line">
        <InputButton content="4" clicked={() => handleClick('4')} />
        <InputButton content="5" clicked={() => handleClick('5')} />
        <InputButton content="6" clicked={() => handleClick('6')} />
        <InputButton content="-" clicked={() => handleClick('-')} />
      </div>
      <div className="line">
        <InputButton content="1" clicked={() => handleClick('1')} />
        <InputButton content="2" clicked={() => handleClick('2')} />
        <InputButton content="3" clicked={() => handleClick('3')} />
        <InputButton content="+" clicked={() => handleClick('+')} />
      </div>
      <div className="line">
        <InputButton content="00" clicked={() => handleClick('00')} />
        <InputButton content="0" clicked={() => handleClick('0')} />
        <InputButton content="," clicked={() => handleClick('.')} />
        <InputButton content="=" clicked={() => handleCalculation(input)} />
      </div>
    </div>
  );
}

export default Calculator;
