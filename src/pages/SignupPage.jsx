import { useState } from 'react';
import { signup } from '../api/auth';
import styled from '@emotion/styled';

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

function SignupPage() {
  const [form, setForm] = useState({
    username: 'xodnd8384',
    password: 'Password123!',
    email: 'xodnd8384@gmail.com',
    nickname: '서태웅',
    alarmConsent: true,
    userRole: 'MASTER',
    masterKey: 'mK9#Gz$82sL!vRp1@bTq',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      // 백엔드 통신 필요
      const res = await signup(form);
      alert('회원가입 성공!');
    } catch (err) {
      console.error(err);
      alert('회원가입 실패');
    }
  };

  return (
    <Wrapper>
      <h2>회원가입</h2>
      <Input name="username" placeholder="username" value={form.username} onChange={handleChange} />
      <Input name="password" type="password" placeholder="password" value={form.password} onChange={handleChange} />
      <Input name="email" placeholder="email" value={form.email} onChange={handleChange} />
      <Input name="nickname" placeholder="nickname" value={form.nickname} onChange={handleChange} />
      <Input name="masterKey" placeholder="master key" value={form.masterKey} onChange={handleChange} />
      <Button onClick={handleSignup}>회원가입</Button>
    </Wrapper>
  );
}

export default SignupPage;