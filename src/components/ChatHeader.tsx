
import React from 'react';
import { useChat } from '@/contexts/ChatContext';
import { ArrowLeft, Edit, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ChatHeaderProps {
  onMenuClick?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onMenuClick }) => {
  const { activeConversation } = useChat();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/conversations');
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
      <div className="flex items-center space-x-3">
        <button
          onClick={handleBackClick}
          className="p-2 rounded-full hover:bg-gray-800"
        >
          <ArrowLeft size={20} className="text-gray-400" />
        </button>
        <button
          onClick={onMenuClick}
          className="p-2 rounded-full hover:bg-gray-800 md:hidden"
        >
          <Menu size={20} className="text-gray-400" />
        </button>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-chatbot-accent flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 19L16 16" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 19L8 16" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 2V6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 18V22" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-white">
              {activeConversation?.title || 'New Conversation'}
            </span>
          </div>
        </div>
      </div>
      <button className="p-2 rounded-full hover:bg-gray-800">
        <Edit size={20} className="text-gray-400" />
      </button>
    </header>
  );
};

export default ChatHeader;
