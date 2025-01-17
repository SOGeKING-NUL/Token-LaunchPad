import React, { useState } from 'react';

function CustomDropdown({ tokens, selectedToken, handleTokenChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-64"> {/* Set consistent width */}
      <div
        className="bg-transparent text-white border border-gray-300 rounded px-4 py-3 cursor-pointer flex items-center justify-between h-12" // Adjust height and padding
        onClick={toggleDropdown}
      >
        <span className="truncate">
          {selectedToken ? `${selectedToken.name} (${selectedToken.symbol})` : 'Select Token'}
        </span>
        <svg
          className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M5.23 7.21a.75.75 0 011.06-.02L10 10.792l3.71-3.604a.75.75 0 011.04 1.084l-4.25 4.125a.75.75 0 01-1.04 0L5.25 8.27a.75.75 0 01-.02-1.06z" />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute w-full bg-comp_color border border-gray-300 rounded mt-1">
          {tokens.map((token, index) => (
            <div
              key={index}
              onClick={() => {
                handleTokenChange(token); // Pass the entire token object
                setIsOpen(false);
              }}
              className="p-3 bg-transparent text-white hover:bg-comp_hover cursor-pointer flex items-center h-12" // Increase height
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
