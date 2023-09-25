import React from 'react';

const SelectionButton = ({ className, onClick, children }) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default SelectionButton;