
import { Conversation, Message } from '@/types';
import { mockConversations } from '@/data/mock-data';

// In a real application, these functions would make API calls
// For now, we'll use mock data

export async function getConversations(): Promise<Conversation[]> {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockConversations;
}

export async function getConversation(id: string): Promise<Conversation | undefined> {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockConversations.find(conv => conv.id === id);
}

export async function sendMessage(
  conversationId: string, 
  content: string
): Promise<Message> {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, this would send the message to the backend and return the created message
  const message: Message = {
    id: Date.now().toString(),
    content,
    role: 'user',
    createdAt: new Date()
  };
  
  return message;
}

export async function getBotResponse(
  conversationId: string, 
  message: string
): Promise<Message> {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // In a real app, this would get a response from the AI backend
  const response: Message = {
    id: Date.now().toString(),
    content: `This is a mock response to: "${message}". In a real application, this would be the response from the AI backend.`,
    role: 'assistant',
    createdAt: new Date()
  };
  
  return response;
}

export async function createConversation(title: string): Promise<Conversation> {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, this would create a new conversation on the backend
  const newConversation: Conversation = {
    id: Date.now().toString(),
    title: title || 'New Conversation',
    updatedAt: new Date(),
    messages: []
  };
  
  return newConversation;
}
