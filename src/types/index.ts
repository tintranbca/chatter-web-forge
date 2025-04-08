
export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  createdAt: Date;
}

export interface Conversation {
  id: string;
  title: string;
  lastMessage?: string;
  updatedAt: Date;
  messages: Message[];
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
}
