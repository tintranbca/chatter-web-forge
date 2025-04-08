
import React from 'react';
import { Conversation } from '@/types';
import ConversationItem from './ConversationItem';
import { Plus, Search } from 'lucide-react';
import { useChat } from '@/contexts/ChatContext';

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onOpenSearch: () => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onOpenSearch,
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <div 
          className="flex items-center bg-gray-800 rounded-full px-4 py-3 cursor-pointer"
          onClick={onOpenSearch}
        >
          <Search size={20} className="text-gray-400 mr-2" />
          <span className="text-gray-400">Search</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <h2 className="font-semibold text-white">CONVERSATIONS</h2>
        <button 
          onClick={onNewConversation}
          className="flex items-center text-white bg-gray-800 rounded-full p-1"
        >
          <span className="mr-1">New</span>
          <Plus size={18} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No conversations yet</p>
          </div>
        ) : (
          conversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isActive={activeConversationId === conversation.id}
              onClick={() => onSelectConversation(conversation.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ConversationList;
