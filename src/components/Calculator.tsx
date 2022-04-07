import React, { useState } from 'react';
import InputButton from './InputButton';
import calculate from '../utils/calculate';

function Calculator(): JSX.Element {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(0);

  const handleClick = (content: string): void => {
    setInput(input + content);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const handleDelete = (): void => {
    if (input.length > 0) setInput(input.slice(0, input.length - 1));
    else console.log('input is empry');
  };

  const handleCalculation = (expression: string): void => {
    const res = calculate(input);
    setResult(res);
  };

  return (
    <>
      <input type="text" id="exprInput" value={input} onChange={(e) => handleChange(e)} />
      <p id="result">{result}</p>
      <div className="calculatorLine">
        <InputButton content="C" clicked={() => handleDelete()} />
        <InputButton content="(" clicked={() => handleClick('(')} />
        <InputButton content=")" clicked={() => handleClick(')')} />
        <InputButton content="/" clicked={() => handleClick('/')} />
      </div>
      <div className="calculatorLine">
        <InputButton content="7" clicked={() => handleClick('7')} />
        <InputButton content="8" clicked={() => handleClick('8')} />
        <InputButton content="9" clicked={() => handleClick('9')} />
        <InputButton content="x" clicked={() => handleClick('*')} />
      </div>
      <div className="calculatorLine">
        <InputButton content="4" clicked={() => handleClick('4')} />
        <InputButton content="5" clicked={() => handleClick('5')} />
        <InputButton content="6" clicked={() => handleClick('6')} />
        <InputButton content="-" clicked={() => handleClick('-')} />
      </div>
      <div className="calculatorLine">
        <InputButton content="1" clicked={() => handleClick('1')} />
        <InputButton content="2" clicked={() => handleClick('2')} />
        <InputButton content="3" clicked={() => handleClick('3')} />
        <InputButton content="+" clicked={() => handleClick('+')} />
      </div>
      <div className="calculatorLine">
        <InputButton content="00" clicked={() => handleClick('0.0')} />
        <InputButton content="0" clicked={() => handleClick('0')} />
        <InputButton content="," clicked={() => handleClick('.')} />
        <InputButton content="=" clicked={() => handleCalculation(input)} />
      </div>
    </>
  );
}

export default Calculator;
