
import React, { useEffect, useRef } from 'react';
import { Message } from '@/types';
import MessageBubble from './MessageBubble';

interface ChatMessageListProps {
  messages: Message[];
  loading?: boolean;
}

const ChatMessageList: React.FC<ChatMessageListProps> = ({ 
  messages, 
  loading = false 
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <div className="w-24 h-24 mb-6 text-gray-500">
          <svg width="96" height="96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-30">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 19L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 19L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Start a new conversation</h3>
        <p className="text-gray-400">
          Ask a question or start a conversation with the assistant.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {loading && (
        <div className="flex justify-center items-center py-4">
          <div className="rounded-full h-8 w-8 bg-gray-700 animate-pulse"></div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessageList;
