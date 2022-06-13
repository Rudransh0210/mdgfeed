import React from "react";
import  ButtonProps from "../../types/buttonPropType";
import './Button.css';

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { onClick, text } = props;
  return <button className="button" onClick={onClick}>{text}</button>;
};

export default Button;