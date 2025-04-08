
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Conversation, Message } from '@/types';
import { getConversations, getConversation, sendMessage, getBotResponse, createConversation } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';

interface ChatContextType {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  loading: boolean;
  sendingMessage: boolean;
  setActiveConversationId: (id: string | null) => void;
  sendUserMessage: (content: string) => Promise<void>;
  startNewConversation: () => Promise<void>;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { toast } = useToast();

  // Fetch conversations on mount
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await getConversations();
        setConversations(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
        toast({
          title: 'Error',
          description: 'Failed to load conversations',
          variant: 'destructive',
        });
        setLoading(false);
      }
    };

    fetchConversations();
  }, [toast]);

  // Fetch the active conversation when activeConversationId changes
  useEffect(() => {
    const fetchActiveConversation = async () => {
      if (!activeConversationId) {
        setActiveConversation(null);
        return;
      }

      try {
        const conversation = await getConversation(activeConversationId);
        if (conversation) {
          setActiveConversation(conversation);
        } else {
          toast({
            title: 'Error',
            description: 'Conversation not found',
            variant: 'destructive',
          });
          setActiveConversationId(null);
        }
      } catch (error) {
        console.error('Failed to fetch conversation:', error);
        toast({
          title: 'Error',
          description: 'Failed to load conversation',
          variant: 'destructive',
        });
      }
    };

    fetchActiveConversation();
  }, [activeConversationId, toast]);

  const sendUserMessage = async (content: string) => {
    if (!activeConversation) return;
    
    setSendingMessage(true);
    
    try {
      // Add the user message to the UI immediately
      const userMessage: Message = {
        id: `temp-${Date.now()}`,
        content,
        role: 'user',
        createdAt: new Date(),
      };
      
      const updatedConversation = {
        ...activeConversation,
        messages: [...activeConversation.messages, userMessage],
        updatedAt: new Date(),
      };
      
      setActiveConversation(updatedConversation);
      
      // Update conversations list with the new message
      setConversations(prevConversations =>
        prevConversations.map(conv =>
          conv.id === activeConversation.id
            ? { ...conv, lastMessage: content, updatedAt: new Date() }
            : conv
        )
      );
      
      // Send message to API
      await sendMessage(activeConversation.id, content);
      
      // Get bot response
      const botResponse = await getBotResponse(activeConversation.id, content);
      
      // Update conversation with bot response
      const finalConversation = {
        ...updatedConversation,
        messages: [...updatedConversation.messages, botResponse],
      };
      
      setActiveConversation(finalConversation);
      
      // Update conversations list
      setConversations(prevConversations =>
        prevConversations.map(conv =>
          conv.id === activeConversation.id
            ? { 
                ...conv, 
                lastMessage: botResponse.content.slice(0, 50) + (botResponse.content.length > 50 ? '...' : ''),
              }
            : conv
        )
      );
    } catch (error) {
      console.error('Failed to send message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive',
      });
    } finally {
      setSendingMessage(false);
    }
  };

  const startNewConversation = async () => {
    try {
      const newConversation = await createConversation('New Conversation');
      setConversations(prevConversations => [newConversation, ...prevConversations]);
      setActiveConversationId(newConversation.id);
      return;
    } catch (error) {
      console.error('Failed to create conversation:', error);
      toast({
        title: 'Error',
        description: 'Failed to create new conversation',
        variant: 'destructive',
      });
    }
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeConversation,
        loading,
        sendingMessage,
        setActiveConversationId,
        sendUserMessage,
        startNewConversation,
        isSearchOpen,
        setIsSearchOpen,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
