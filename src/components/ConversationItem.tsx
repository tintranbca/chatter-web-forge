
import React from 'react';
import { Conversation } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  isActive,
  onClick,
}) => {
  const formattedDate = 
    conversation.updatedAt.getFullYear() === new Date().getFullYear()
      ? formatDistanceToNow(conversation.updatedAt, { addSuffix: false })
      : conversation.updatedAt.toLocaleDateString();

  return (
    <div
      className={cn(
        "p-4 hover:bg-gray-800 cursor-pointer transition-colors",
        isActive && "bg-gray-800"
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-1">
        <h3 className="font-medium text-white truncate flex-1">
          {conversation.title}
        </h3>
        <span className="text-sm text-gray-400 whitespace-nowrap ml-2">
          {formattedDate === "less than a minute ago" 
            ? "just now" 
            : formattedDate === "1 day ago"
              ? "Yesterday"
              : formattedDate}
        </span>
      </div>
      {conversation.lastMessage && (
        <p className="text-gray-400 text-sm truncate">
          {conversation.lastMessage}
        </p>
      )}
    </div>
  );
};

export default ConversationItem;
