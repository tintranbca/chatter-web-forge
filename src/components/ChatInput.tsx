
import React, { useState, useRef, useEffect } from 'react';
import { Mic, Plus, Search, Send, Sparkles } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  disabled = false 
}) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-800 p-4">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <div className="flex-1 flex items-center bg-chatbot-input rounded-full">
            <button className="action-button mr-1">
              <Plus size={18} />
            </button>
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Anything"
              className="chat-input flex-1"
              disabled={disabled}
            />
            <div className="flex items-center space-x-1 px-2">
              <button 
                className="action-button"
                onClick={handleSend}
                disabled={!message.trim() || disabled}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center space-x-4">
            <button className="flex items-center justify-center rounded-full p-3 hover:bg-gray-800">
              <Plus size={20} className="text-gray-400" />
            </button>
            <button className="flex items-center space-x-1 bg-gray-800 rounded-full py-2 px-4">
              <Search size={16} />
              <span className="text-sm">DeepSearch</span>
            </button>
            <button className="flex items-center space-x-1 bg-gray-800 rounded-full py-2 px-4">
              <Sparkles size={16} />
              <span className="text-sm">Think</span>
            </button>
          </div>
          <button className="flex items-center justify-center rounded-full p-3 hover:bg-gray-800">
            <Mic size={20} className="text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
