import React from 'react';

type ButtonProps = {
  content: string;
  clicked(content: string): void;
}

function InputButton({ content, clicked }: ButtonProps): JSX.Element {
  return (
    <button type="button" onClick={() => clicked(content)}>{content}</button>
  );
}

export default InputButton;
