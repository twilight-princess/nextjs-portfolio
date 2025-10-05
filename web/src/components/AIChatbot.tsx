'use client';
import React, { useState, KeyboardEvent } from 'react';
import { useChatbot } from '@/hooks/useChatbot';
import { Message } from '@/types/chatbot';

const MessageComponent: React.FC<{ message: Message }> = ({ message }) => (
  <div className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
    <div 
      className={`max-w-xs p-3 rounded-lg text-sm ${
        message.isBot 
          ? 'bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-slate-200' 
          : 'bg-blue-600 text-white'
      }`}
    >
      {message.text}
    </div>
  </div>
);

const TypingIndicator: React.FC = () => (
  <div className="flex justify-start">
    <div className="bg-gray-100 dark:bg-slate-700 p-3 rounded-lg text-sm text-gray-600 dark:text-slate-300">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
      </div>
    </div>
  </div>
);

export default function AIChatbot() {
  const { messages, isTyping, isOpen, sendMessage, toggleChat, closeChat } = useChatbot();
  const [inputText, setInputText] = useState<string>('');

  const handleSendMessage = async (): Promise<void> => {
    await sendMessage(inputText);
    setInputText('');
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 h-96 bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-gray-200 dark:border-slate-600 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-slate-600 bg-blue-600 text-white rounded-t-lg flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                🤖
              </div>
              <div>
                <h3 className="font-semibold">Portfolio Assistant</h3>
                <p className="text-xs text-blue-100">Ask me anything!</p>
              </div>
            </div>
            <button 
              onClick={closeChat}
              className="text-blue-100 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <MessageComponent key={message.id} message={message} />
            ))}
            
            {isTyping && <TypingIndicator />}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-slate-600">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Elizabeth's experience..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                aria-label="Chat input"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? '✕' : '💬'}
      </button>
    </div>
  );
}