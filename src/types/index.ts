export interface Message {
  id: string;
  text: string;
  isBot: boolean;
  showActions?: boolean;
}