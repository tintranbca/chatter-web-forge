
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '@/contexts/ChatContext';
import ConversationList from '@/components/ConversationList';
import UserProfile from '@/components/UserProfile';
import SearchDialog from '@/components/SearchDialog';
import { mockUser } from '@/data/mock-data';

const ConversationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    conversations, 
    activeConversation, 
    startNewConversation,
    isSearchOpen,
    setIsSearchOpen
  } = useChat();

  const handleSelectConversation = (id: string) => {
    navigate(`/chat/${id}`);
  };

  const handleNewConversation = async () => {
    await startNewConversation();
    if (activeConversation) {
      navigate(`/chat/${activeConversation.id}`);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-chatbot-background">
      <ConversationList
        conversations={conversations}
        activeConversationId={activeConversation?.id || null}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
      
      <UserProfile user={mockUser} />
      
      <SearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        conversations={conversations}
        onSelectConversation={handleSelectConversation}
      />
    </div>
  );
};

export default ConversationsPage;
