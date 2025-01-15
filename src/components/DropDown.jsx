import React, { useState } from 'react';

function CustomDropdown({ tokens, selectedToken, handleTokenChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div
        className="bg-transparent text-white border border-gray-300 rounded px-4 py-2 cursor-pointer"
        onClick={toggleDropdown}
      >
        {selectedToken ? selectedToken : 'Select Token'}
      </div>
      
      {isOpen && (
        <div className="absolute w-full bg-transparent border border-gray-300 rounded mt-1">
          {tokens.map((token, index) => (
            <div
              key={index}
              onClick={() => {
                handleTokenChange(token.symbol);
                setIsOpen(false);
              }}
              className="bg-transparent text-white p-2 hover:bg-gray-700 cursor-pointer"
            >
              {token.name} ({token.symbol})
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomDropdown;
