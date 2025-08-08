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
    '🔍 Find top-rated schools',
    '💰 Show affordable options',
    '🚌 Schools with bus service',
    '📍 Search by location',
    '👨‍💼 Admin registration help',
    '⭐ Explain school ratings',
    '🏫 School facilities info',
    '❓ How does EduConnect work?'
  ];

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return 'Hello! Welcome to EduConnect. I can help you find schools, compare ratings, or answer questions about our platform. What would you like to know?';
    }
    
    // Enhanced school search with intelligent suggestions
    if (message.includes('search') || message.includes('find') || message.includes('school') || message.includes('looking for')) {
      if (message.includes('rating') || message.includes('best') || message.includes('top') || message.includes('excellent')) {
        return "🌟 Looking for top-rated schools? Great choice! Here's how I can help:\n\n• Use the rating filter above to find 4+ star schools\n• Schools with 4.5+ stars are considered exceptional\n• You can also sort by rating to see the best first\n\nWould you like me to help you search in a specific city? Just tell me which area you're interested in!";
      }
      if (message.includes('fees') || message.includes('cost') || message.includes('price') || message.includes('affordable') || message.includes('budget')) {
        return "💰 Budget-conscious? I understand! Here are smart ways to find affordable schools:\n\n• Use the fees filter to set your budget range\n• Compare schools with similar fee structures\n• Look for schools with good value (high rating + reasonable fees)\n\nWhat's your preferred budget range? I can help you find the best options!";
      }
      if (message.includes('bus') || message.includes('transport') || message.includes('pickup') || message.includes('drop')) {
        return "🚌 Transportation is important! I can help you find schools with reliable bus services:\n\n• Use the 'Bus Available' filter in search options\n• Many schools offer door-to-door pickup\n• Bus facilities often include safety features and tracking\n\nWhich area do you need bus service from? This will help narrow down the best options!";
      }
      if (message.includes('city') || message.includes('location') || message.includes('area') || message.includes('near')) {
        return "📍 Location matters! I can help you find schools in your preferred area:\n\n• Use the city dropdown to filter by location\n• Consider proximity to your home or workplace\n• Some schools serve multiple areas with bus routes\n\nWhich city or area are you interested in? I'll help you find the best schools there!";
      }
      return "🔍 I'm here to make your school search super easy! Here's what you can do:\n\n• **Quick Search**: Use the search bar for school names\n• **Smart Filters**: Filter by city, fees, rating, or bus availability\n• **Compare Options**: View detailed information for each school\n\nWhat specific criteria matter most to you? Academic excellence, affordability, location, or facilities?";
    }
    
    // Enhanced admin guidance with step-by-step help
    if (message.includes('admin') || message.includes('manage') || message.includes('add school') || message.includes('register school')) {
      return "👨‍💼 School Administrator? Welcome! Here's how to get started:\n\n**Step 1**: Click 'Login' in the top navigation\n**Step 2**: Register as an admin with your school details\n**Step 3**: Access the admin dashboard to:\n   • Add new schools to the directory\n   • Update existing school information\n   • Manage school details and ratings\n\nNeed help with the registration process? I can guide you through each step!";
    }
    
    // Enhanced help with categorized assistance
    if (message.includes('help') || message.includes('how') || message.includes('what can you do') || message.includes('features')) {
      return "🤖 I'm your intelligent school search assistant! Here's how I can help:\n\n**🔍 School Discovery**\n• Find schools by name, location, or criteria\n• Get personalized recommendations\n• Compare schools side-by-side\n\n**📊 Smart Filtering**\n• Filter by rating, fees, location, bus service\n• Sort results by your preferences\n• Find the best value options\n\n**👥 Admin Support**\n• Guide through admin registration\n• Help with school management\n• Explain platform features\n\nWhat would you like to explore first?";
    }
    
    // Enhanced specific feature explanations
    if (message.includes('rating') || message.includes('stars') || message.includes('review')) {
      return "⭐ School ratings help you make informed decisions!\n\n• **5 Stars**: Exceptional schools with outstanding facilities\n• **4+ Stars**: Excellent schools, highly recommended\n• **3+ Stars**: Good schools with solid academics\n• **Overall Rating**: Combines academics, infrastructure, and facilities\n\nRatings are based on comprehensive evaluations. Would you like to see only highly-rated schools?";
    }
    
    if (message.includes('infrastructure') || message.includes('facilities') || message.includes('building')) {
      return "🏫 Infrastructure quality is crucial for learning! Our schools are rated on:\n\n• **Building Quality**: Modern, safe structures\n• **Classrooms**: Well-equipped learning spaces\n• **Labs & Libraries**: Science labs, computer labs, libraries\n• **Sports Facilities**: Playgrounds, sports equipment\n• **Safety Features**: Security, emergency protocols\n\nLook for schools with high infrastructure ratings for the best learning environment!";
    }
    
    // Conversational responses for thanks and feedback
    if (message.includes('thank') || message.includes('thanks') || message.includes('appreciate')) {
      return "You're very welcome! 😊 I'm happy I could help. If you have any more questions about schools, search features, or anything else, just ask! I'm here whenever you need assistance with your school search journey.";
    }
    
    if (message.includes('good') || message.includes('great') || message.includes('awesome') || message.includes('helpful')) {
      return "Thank you so much! 🌟 That means a lot to me. I'm designed to make your school search as smooth and successful as possible. Is there anything else I can help you with today?";
    }
    
    // Enhanced default response with suggestions
    return "I'm here to be your intelligent school search companion! 🎓 I can help with:\n\n• **Finding Schools**: Search by name, location, or criteria\n• **Smart Recommendations**: Based on your preferences\n• **Detailed Information**: Ratings, fees, facilities, bus services\n• **Admin Guidance**: For school administrators\n\nTry asking me something like:\n• \"Find me schools with good ratings\"\n• \"Show me affordable schools with bus service\"\n• \"How do I register as an admin?\"\n\nWhat would you like to know?";
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
