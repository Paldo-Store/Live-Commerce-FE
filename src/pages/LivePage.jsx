import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useState } from 'react';

const Wrapper = styled.div`
  width: 800px;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 12px;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LiveBox = styled.div`
  height: 400px;
  background-color: #000;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-size: 24px;
  position: relative; /* To position buttons inside the LiveBox */
`;

const Button = styled.button`
  padding: 12px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  width: 200px;

  &:hover {
    background-color: #303f9f;
  }
`;

const LeftButton = styled(Button)`
  position: absolute;
  bottom: 20px;
  left: 20px;
`;

const RightButton = styled(Button)`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

const ChatBox = styled.div`
  height: 200px;
  background-color: #f4f4f4;
  border-radius: 8px;
  padding: 15px;
  margin-top: 20px;
  overflow-y: auto;
`;

const MessageInput = styled.input`
  padding: 10px;
  width: calc(100% - 22px); /* 100% width minus padding */
  border-radius: 6px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
`;

const SendButton = styled(Button)`
  width: 100%;
  margin-top: 10px;
`;

function LivePage() {
  const navigate = useNavigate();

  const goToProduct = () => {
    navigate('/products');
  };

  const goToHome = () => {
    navigate('/');
  };

  // State for chat messages
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  // Handle sending the message
  const sendMessage = () => {
    if (message.trim() !== '') {
      setMessages([...messages, { text: message, sender: 'You' }]);
      setMessage('');
    }
  };

  // Handle Enter key to send message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <Wrapper>
      <LiveBox>📺 라이브 방송 영역 (예시)</LiveBox>

      {/* Positioned Buttons */}
      <LeftButton onClick={goToHome}>🏠 홈으로 돌아가기</LeftButton>
      <RightButton onClick={goToProduct}>🛍 상품 둘러보기</RightButton>

      {/* Chat box */}
      <ChatBox>
        {/* Display chat messages */}
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}: </strong>{msg.text}
          </div>
        ))}
      </ChatBox>

      {/* Message input */}
      <MessageInput
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="채팅 입력"
      />
      <SendButton onClick={sendMessage}>보내기</SendButton>
    </Wrapper>
  );
}

export default LivePage;
