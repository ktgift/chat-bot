import { useState } from 'react';
// import ChatMessage from './ChatMessage';
import type { Message } from '../types';
import ChatInput from './ChatInput';
import { Box, Container } from '@mui/material';
import ChatMessage from './ChatMessage';



export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'สวัสดีครับ! ผมอินโฟมากไทยคอนเปรเซ็นต์อีเวนต์พารามิเตอร์ไทย ไลน์ไอดีอีซิแขปนไลซ์ครับ\n\nคุณต้องการให้ผมช่วยอะไรปันอินเปิบพีเคยโอเพจครับ? และคุณสามารถถามอีโยคลอพพารามิเตอร์อย่างต้องการให้ผมเบอนเปิดอัน\nเป็นไลน์ไอดีใดอยครับ',
      isBot: true,
      showActions: false
    },
    {
      id: '2', 
      text: 'ถ้าคุณมีความต้องการพิเศษเกี่ยวกับประเทศของไลค์ (เช่น HTML/CSS, React, หรือภาษาอื่น ๆ) กบกบากฟลได\nมะรับ',
      isBot: true,
      showActions: true
    }
  ]);

  const handleSendMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'ขอบคุณสำหรับข้อความของคุณ นี่คือการตอบกลับจำลองจาก Claude',
        isBot: true,
        showActions: true
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      bgcolor="grey.50"
    >
      <Box
        flex={1}
        overflow="auto"
        p={2}
      >
        <Container maxWidth="lg">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isBot={message.isBot}
              showActions={message.showActions}
            />
          ))}
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ width: '100%' }}>
        <ChatInput onSendMessage={handleSendMessage} />
      </Container>
    </Box>
  );
};

export default ChatInterface;