import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signin } from '../api/auth';
import styled from '@emotion/styled';
import { useEffect } from 'react';

const Wrapper = styled.div`
  width: 400px;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 12px;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #303f9f;
  }
`;

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      navigate('/live');
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const res = await signin({ username, password });
      const { accessToken } = res.data.data; // refreshToken도 있음
      localStorage.setItem('accessToken', accessToken); // 임시 저장
      alert('로그인 성공');
      navigate('/live'); // 로그인 성공 시 라이브 페이지로 이동
    } catch (err) {
      console.error(err);
      alert('로그인 실패');
    }
  };

  return (
    <Wrapper>
      <h2>로그인</h2>
      <Input placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
      <Input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
      <Button onClick={handleLogin}>로그인</Button>
    </Wrapper>
  );
}

export default LoginPage;