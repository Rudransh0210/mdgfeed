import React from "react";
import  ButtonProps from "../../types/buttonPropType";

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { onClick, text } = props;
  return <button onClick={onClick}>{text}</button>;
};

export default Button;