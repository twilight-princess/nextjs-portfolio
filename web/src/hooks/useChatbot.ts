import { useState, useCallback, useEffect } from 'react';
import { Message } from '@/types/chatbot';

export const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [conversationId, setConversationId] = useState<number | null>(null);

  // Initialize conversation when chat is first opened
  useEffect(() => {
    if (isOpen && !conversationId) {
      initializeConversation();
    }
  }, [isOpen, conversationId]);

  const initializeConversation = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/chat/conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: `session_${Date.now()}` })
      });
      
      if (!response.ok) {
        throw new Error('Failed to create conversation');
      }
      
      const data = await response.json();
      setConversationId(data.conversationId);
      
      // Add welcome message
      setMessages([{
        id: 1,
        text: "Hi! Im here to help answer questions about Elizabeth's experience, skills, and projects. What would you like to know?",
        isBot: true,
        timestamp: new Date()
      }]);
      
    } catch (error) {
      console.error('Failed to initialize conversation:', error);
      // Fallback welcome message
      setMessages([{
        id: 1,
        text: "Hi! I'm here to help answer questions about Elizabeth's experience, skills, and projects. What would you like to know?",
        isBot: true,
        timestamp: new Date()
      }]);
    }
  };

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || !conversationId) return;

    const userMessage: Message = {
      id: Date.now(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await fetch(`http://localhost:3001/api/chat/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ 
          message: text.trim() 
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      const botResponse: Message = {
        id: Date.now() + 1,
        text: data.message,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      
    } catch (error) {
      console.error('Failed to send message:', error);
      
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble connecting right now. Please try again or reach out to Elizabeth directly at 3lizabeth3vans@gmail.com!",
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [conversationId]);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    messages,
    isTyping,
    isOpen,
    sendMessage,
    toggleChat,
    closeChat
  };
};