import { SxProps, Theme } from '@mui/material/styles';

export const chatbotStyles = {
  // Floating toggle button
  toggleButton: {
    position: 'fixed',
    bottom: 24,
    right: 24,
    zIndex: 1000,
  } as SxProps<Theme>,

  toggleIconButton: {
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
  } as SxProps<Theme>,

  // Chat window
  chatWindow: {
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
  } as SxProps<Theme>,

  // Header
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    p: 2,
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  } as SxProps<Theme>,

  headerAvatar: {
    bgcolor: 'rgba(255, 255, 255, 0.2)',
  } as SxProps<Theme>,

  headerTitle: {
    fontWeight: 600,
  } as SxProps<Theme>,

  headerSubtitle: {
    opacity: 0.9,
  } as SxProps<Theme>,

  // Messages container
  messagesContainer: {
    flex: 1,
    overflow: 'auto',
    p: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  } as SxProps<Theme>,

  messageRow: {
    display: 'flex',
    mb: 1,
  } as SxProps<Theme>,

  userMessageRow: {
    justifyContent: 'flex-end',
  } as SxProps<Theme>,

  botMessageRow: {
    justifyContent: 'flex-start',
  } as SxProps<Theme>,

  messageContent: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 1,
    maxWidth: '80%',
  } as SxProps<Theme>,

  userMessageContent: {
    flexDirection: 'row-reverse',
  } as SxProps<Theme>,

  botMessageContent: {
    flexDirection: 'row',
  } as SxProps<Theme>,

  // Message avatars
  userAvatar: {
    width: 32,
    height: 32,
    bgcolor: '#667eea',
    color: 'white',
  } as SxProps<Theme>,

  botAvatar: {
    width: 32,
    height: 32,
    bgcolor: '#f0f0f0',
    color: '#666',
  } as SxProps<Theme>,

  // Message bubbles
  userMessageBubble: {
    p: 1.5,
    bgcolor: '#667eea',
    color: 'white',
    borderRadius: '16px 16px 4px 16px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  } as SxProps<Theme>,

  botMessageBubble: {
    p: 1.5,
    bgcolor: '#f8f9fa',
    color: '#333',
    borderRadius: '16px 16px 16px 4px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  } as SxProps<Theme>,

  messageText: {
    whiteSpace: 'pre-line',
  } as SxProps<Theme>,

  // Typing indicator
  typingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    ml: 1,
  } as SxProps<Theme>,

  typingBubble: {
    p: 1.5,
    bgcolor: '#f8f9fa',
    borderRadius: '16px 16px 16px 4px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  } as SxProps<Theme>,

  typingText: {
    color: '#666',
  } as SxProps<Theme>,

  // Quick replies
  quickRepliesContainer: {
    p: 1,
    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
  } as SxProps<Theme>,

  quickRepliesLabel: {
    color: '#666',
    mb: 1,
    display: 'block',
  } as SxProps<Theme>,

  quickRepliesChips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 0.5,
  } as SxProps<Theme>,

  quickReplyChip: {
    fontSize: '0.75rem',
    '&:hover': {
      bgcolor: '#667eea',
      color: 'white',
    },
  } as SxProps<Theme>,

  // Input area
  inputContainer: {
    p: 2,
    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
    display: 'flex',
    gap: 1,
  } as SxProps<Theme>,

  inputField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '20px',
      bgcolor: '#f8f9fa',
    },
  } as SxProps<Theme>,

  sendButton: {
    bgcolor: '#667eea',
    color: 'white',
    '&:hover': {
      bgcolor: '#764ba2',
    },
    '&:disabled': {
      bgcolor: '#ccc',
    },
  } as SxProps<Theme>,
};

// Named export to match other style files pattern
