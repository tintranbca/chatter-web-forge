
import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  conversations: { id: string; title: string }[];
  onSelectConversation: (id: string) => void;
}

const SearchDialog: React.FC<SearchDialogProps> = ({
  isOpen,
  onClose,
  conversations,
  onSelectConversation,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  const filteredConversations = searchTerm
    ? conversations.filter(c => 
        c.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
  
  const handleSelect = (id: string) => {
    onSelectConversation(id);
    onClose();
    setSearchTerm('');
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-start justify-center pt-16 px-4">
      <div className="bg-chatbot-card rounded-lg w-full max-w-xl overflow-hidden animate-fade-in">
        <div className="flex items-center border-b border-gray-800 p-4">
          <Search size={20} className="text-gray-400 mr-2" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search conversations..."
            className="bg-transparent flex-1 outline-none text-white"
          />
          <button onClick={onClose} className="p-1">
            <X size={20} className="text-gray-400" />
          </button>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {searchTerm && filteredConversations.length === 0 ? (
            <div className="p-4 text-center text-gray-400">
              No results found
            </div>
          ) : (
            filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className="p-4 hover:bg-gray-800 cursor-pointer"
                onClick={() => handleSelect(conversation.id)}
              >
                <p className="text-white">{conversation.title}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchDialog;
