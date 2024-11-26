import React from 'react';
import '../../styles/estoque/NewButton.css';

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
