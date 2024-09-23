import MarkdownRenderer from '@/lib/MarkdownRenderer';
import React from 'react';

interface Option {
  content: string;
}

interface SelectProps {
  options: Option[];
  selectedOption: number | null; // For single selection
  selectedOptions: number[]; // For multiple selections
  handleOptionChange: (content: number) => void;
  isMultiple: boolean; // To switch between single and multiple selections
}

const Select: React.FC<SelectProps> = ({ options, selectedOption, selectedOptions, handleOptionChange, isMultiple }) => {
  return (
    <div>
      {options.map((option, index) => {
        // Check if the option is selected (single or multiple mode)
        const isSelected = isMultiple
          ? selectedOptions.includes(index) // Multiple selection check
          : selectedOption === index; // Single selection check

        return (
          <div 
            key={index} 
            className={`flex items-center m-2 p-3   rounded-md cursor-pointer ${isSelected ? 'bg-yellow-500' : 'bg-muted hover:bg-yellow-100'}`}
            onClick={() => handleOptionChange(index)}  // Call the handler when clicked
          >
            <div className="inline-flex items-center pr-2">
              <label className="flex items-center cursor-pointer relative">
                <input 
                  type="checkbox" 
                  className={`peer  h-5 w-5 cursor-pointer transition-all appearance-none rounded ${isSelected ? 'bg-white border-yellow-700' : 'border-black'} checked:bg-white checked:border-yellow-800`} 
                  name={option.content}
                  value={option.content}
                  checked={isSelected}  
                  readOnly 
                  id={`check-${index}`} 
                />
                <span className="absolute text-yellow opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </span>
              </label>
            </div>
            <h1 className='cursor-pointer' >
            <MarkdownRenderer content={option.content} />
                {/* {option.content} */}
                </h1>
          </div>
        );
      })}
    </div>
  );
};

export default Select;
