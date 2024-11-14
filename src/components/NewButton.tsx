import React from 'react';
import './NewButton.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button className="NewButton" onClick={onClick}>
      {children}
    </button>
  );
};
