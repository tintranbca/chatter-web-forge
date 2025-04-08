
import { Conversation, Message, User } from '@/types';

export const mockUser: User = {
  id: '1',
  name: 'Tín Trần',
  avatar: '/lovable-uploads/2455f574-0593-472a-a077-76debf72022b.png'
};

export const mockConversations: Conversation[] = [
  {
    id: '1',
    title: 'Lâu Đài Bị Vây: Vai Trò Người Hát Rong',
    updatedAt: new Date('2025-04-07'),
    lastMessage: 'This is the last message in the conversation',
    messages: []
  },
  {
    id: '2',
    title: 'API Versioning Strategy',
    updatedAt: new Date('2025-03-30'),
    lastMessage: 'This is the last message in the conversation',
    messages: []
  },
  {
    id: '3',
    title: 'Quarkus Transaction Management',
    updatedAt: new Date('2025-03-28'),
    lastMessage: 'This is the last message in the conversation',
    messages: []
  },
  {
    id: '4',
    title: 'Storing Empty Hash in Redis',
    updatedAt: new Date('2025-03-25'),
    lastMessage: 'This is the last message in the conversation',
    messages: [
      {
        id: '1',
        content: 'Can I store empty hash in redis? How',
        role: 'user',
        createdAt: new Date('2025-03-25T10:00:00')
      },
      {
        id: '2',
        content: "Yes, you can store an empty hash in Redis! In Redis, a hash is a data structure that maps fields to values, and it's perfectly valid to have a hash with no fields (i.e., an empty hash). Here's how you can do it and some details to understand the process:",
        role: 'assistant',
        createdAt: new Date('2025-03-25T10:00:30')
      },
      {
        id: '3',
        content: "Storing an Empty Hash\n\nTo store an empty hash, you can simply use the HSET command with no fields or values, but typically, you'd just create the key and leave it empty. In practice, an empty hash is a key that exists in Redis with the hash data type but has no field-value pairs. You can achieve this in a few ways depending on your setup:",
        role: 'assistant',
        createdAt: new Date('2025-03-25T10:01:00')
      },
      {
        id: '4',
        content: "1. Using HSET (or not adding fields): If you don't add any fields to a hash, it remains empty. For example:",
        role: 'assistant',
        createdAt: new Date('2025-03-25T10:01:30')
      }
    ]
  },
  {
    id: '5',
    title: 'Optimizing eCommerce Team Structure',
    updatedAt: new Date('2025-03-22'),
    lastMessage: 'This is the last message in the conversation',
    messages: []
  },
  {
    id: '6',
    title: 'Dynamic User Segmentation System Design',
    updatedAt: new Date('2025-03-22'),
    lastMessage: 'This is the last message in the conversation',
    messages: []
  },
  {
    id: '7',
    title: 'Dynamic User Segmentation System Design',
    updatedAt: new Date('2025-03-22'),
    lastMessage: 'This is the last message in the conversation',
    messages: []
  },
  {
    id: '8',
    title: 'Dynamic User Segmentation System Design',
    updatedAt: new Date('2025-03-22'),
    lastMessage: 'This is the last message in the conversation',
    messages: []
  }
];
