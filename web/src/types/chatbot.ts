export interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp?: Date;
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
  isOpen: boolean;
}