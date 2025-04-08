
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useChat } from '@/contexts/ChatContext';
import ChatHeader from '@/components/ChatHeader';
import ChatMessageList from '@/components/ChatMessageList';
import ChatInput from '@/components/ChatInput';
import SuggestionChips from '@/components/SuggestionChips';

const SUGGESTIONS = [
  'Cabin by the lake',
  'Improving eye sight',
  'Roleplay with me',
];

const ChatPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    setActiveConversationId, 
    activeConversation, 
    sendUserMessage, 
    sendingMessage 
  } = useChat();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (id) {
      setActiveConversationId(id);
    } else {
      navigate('/conversations');
    }
  }, [id, setActiveConversationId, navigate]);

  const handleSendMessage = async (message: string) => {
    if (message.trim()) {
      await sendUserMessage(message);
    }
  };

  const handleSuggestionSelect = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (!activeConversation) {
    return (
      <div className="flex items-center justify-center h-screen bg-chatbot-background">
        <div className="animate-pulse w-8 h-8 bg-chatbot-accent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-chatbot-background">
      <ChatHeader onMenuClick={toggleMobileMenu} />
      
      <div className="flex-1 overflow-hidden flex flex-col">
        <ChatMessageList 
          messages={activeConversation.messages} 
          loading={sendingMessage}
        />
        
        {activeConversation.messages.length === 0 && (
          <SuggestionChips 
            suggestions={SUGGESTIONS} 
            onSelect={handleSuggestionSelect} 
          />
        )}
        
        <ChatInput 
          onSendMessage={handleSendMessage} 
          disabled={sendingMessage}
        />
      </div>
    </div>
  );
};

export default ChatPage;
