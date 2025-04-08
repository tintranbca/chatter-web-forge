
import React from 'react';

interface SuggestionChipsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

const SuggestionChips: React.FC<SuggestionChipsProps> = ({ 
  suggestions, 
  onSelect 
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4 px-4">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion}
          onClick={() => onSelect(suggestion)}
          className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm hover:bg-gray-700 transition-colors"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
};

export default SuggestionChips;
