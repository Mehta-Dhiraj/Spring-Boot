import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Fade,
  Avatar,
  Chip,
} from '@mui/material';
import {
  Chat as ChatIcon,
  Send as SendIcon,
  Close as CloseIcon,
  SmartToy as BotIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotProps {
  onSchoolSearch?: (query: string) => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ onSchoolSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I\'m EduBot, your school directory assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    'Find schools in my area',
    'Best rated schools',
    'Schools with bus facility',
    'Affordable schools',
    'How to register?',
  ];

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return 'Hello! Welcome to EduConnect. I can help you find schools, compare ratings, or answer questions about our platform. What would you like to know?';
    }
    
    if (message.includes('find') || message.includes('search') || message.includes('school')) {
      if (message.includes('area') || message.includes('location') || message.includes('city')) {
        return 'I can help you find schools in your area! Use the search filters on the homepage to search by city and area, or tell me which city you\'re interested in.';
      }
      if (message.includes('bus')) {
        return 'Looking for schools with bus facilities? You can filter schools by bus availability using the search options. Many schools in our directory offer transportation services.';
      }
      if (message.includes('rating') || message.includes('best') || message.includes('top')) {
        return 'To find the best-rated schools, you can sort the results by rating or look for schools with 4+ star ratings. Our schools are rated based on infrastructure and overall quality.';
      }
      if (message.includes('fees') || message.includes('affordable') || message.includes('cheap')) {
        return 'Looking for affordable schools? You can browse through our school listings to compare fees. Most schools display their annual fee structure for easy comparison.';
      }
      return 'I can help you search for schools! Use the search filters on the homepage to find schools by city, area, or name. What specific criteria are you looking for?';
    }
    
    if (message.includes('register') || message.includes('sign up') || message.includes('account')) {
      return 'To register as an admin, click the "Login" button in the top navigation and then select "Register". You\'ll need to provide your username, email, city, and a password (minimum 6 characters).';
    }
    
    if (message.includes('admin') || message.includes('add school') || message.includes('manage')) {
      return 'Admin features allow you to add, edit, and manage school listings. After logging in as an admin, you can access the admin dashboard to manage schools in the directory.';
    }
    
    if (message.includes('help') || message.includes('how') || message.includes('what')) {
      return 'EduConnect is a comprehensive school directory where you can:\n• Search for schools by location\n• Compare school ratings and facilities\n• View detailed school information\n• Filter by bus availability and fees\n\nWhat specific help do you need?';
    }
    
    if (message.includes('thank') || message.includes('thanks')) {
      return 'You\'re welcome! I\'m here to help you find the perfect school. Feel free to ask me anything else about our school directory.';
    }
    
    if (message.includes('bye') || message.includes('goodbye')) {
      return 'Goodbye! Thanks for using EduConnect. I hope you find the perfect school for your needs. Have a great day!';
    }
    
    // Default response
    return 'I\'m here to help you with school searches and information about EduConnect. You can ask me about finding schools, comparing ratings, admin features, or how to use the platform. What would you like to know?';
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    handleSendMessage();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
        }}
      >
        <IconButton
          onClick={() => setIsOpen(!isOpen)}
          sx={{
            width: 60,
            height: 60,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            '&:hover': {
              background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
              transform: 'scale(1.05)',
              boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          {isOpen ? <CloseIcon /> : <ChatIcon />}
        </IconButton>
      </Box>

      {/* Chat Window */}
      <Fade in={isOpen}>
        <Paper
          sx={{
            position: 'fixed',
            bottom: 100,
            right: 24,
            width: 380,
            height: 500,
            zIndex: 999,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              p: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)' }}>
              <BotIcon />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                EduBot
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                School Directory Assistant
              </Typography>
            </Box>
          </Box>

          {/* Messages */}
          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
              p: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            {messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1,
                    maxWidth: '80%',
                    flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                  }}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: message.sender === 'user' ? '#667eea' : '#f0f0f0',
                      color: message.sender === 'user' ? 'white' : '#666',
                    }}
                  >
                    {message.sender === 'user' ? <PersonIcon fontSize="small" /> : <BotIcon fontSize="small" />}
                  </Avatar>
                  <Paper
                    sx={{
                      p: 1.5,
                      bgcolor: message.sender === 'user' ? '#667eea' : '#f8f9fa',
                      color: message.sender === 'user' ? 'white' : '#333',
                      borderRadius: message.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                      {message.text}
                    </Typography>
                  </Paper>
                </Box>
              </Box>
            ))}

            {isTyping && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: '#f0f0f0', color: '#666' }}>
                  <BotIcon fontSize="small" />
                </Avatar>
                <Paper
                  sx={{
                    p: 1.5,
                    bgcolor: '#f8f9fa',
                    borderRadius: '16px 16px 16px 4px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    EduBot is typing...
                  </Typography>
                </Paper>
              </Box>
            )}

            <div ref={messagesEndRef} />
          </Box>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <Box sx={{ p: 1, borderTop: '1px solid rgba(0, 0, 0, 0.1)' }}>
              <Typography variant="caption" sx={{ color: '#666', mb: 1, display: 'block' }}>
                Quick questions:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {quickReplies.map((reply, index) => (
                  <Chip
                    key={index}
                    label={reply}
                    size="small"
                    onClick={() => handleQuickReply(reply)}
                    sx={{
                      fontSize: '0.75rem',
                      '&:hover': {
                        bgcolor: '#667eea',
                        color: 'white',
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Input */}
          <Box
            sx={{
              p: 2,
              borderTop: '1px solid rgba(0, 0, 0, 0.1)',
              display: 'flex',
              gap: 1,
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                  bgcolor: '#f8f9fa',
                },
              }}
            />
            <IconButton
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              sx={{
                bgcolor: '#667eea',
                color: 'white',
                '&:hover': {
                  bgcolor: '#764ba2',
                },
                '&:disabled': {
                  bgcolor: '#ccc',
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      </Fade>
    </>
  );
};

export default Chatbot;
