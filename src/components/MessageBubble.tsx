
import React from 'react';
import { Message } from '@/types';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={cn(
      "message-container flex w-full mb-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "chat-bubble", 
        isUser ? "chat-bubble-user" : "chat-bubble-assistant"
      )}>
        <div className="message-content whitespace-pre-line">
          {message.content}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
