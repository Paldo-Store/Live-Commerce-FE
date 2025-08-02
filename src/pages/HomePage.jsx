import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import paldoImage from '../assets/paldo-sanghoe.png'; // 팔도 상회 이미지 경로

const Wrapper = styled.div`
  width: 350px;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  text-align: center;
`;

const PaldoImage = styled.img`
  width: 180px; /* 이미지 크기 조정 */
  height: auto;
  margin: 0 auto 20px; /* 이미지 상하간격 */
  border-radius: 12px;
  object-fit: contain; /* 이미지를 비율에 맞춰서 잘라냄 */
`;

const Heading = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #3f51b5; /* Live Commerce 색상 */
`;

const Button = styled.button`
  padding: 12px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  margin-bottom: 12px;

  &:hover {
    background-color: #303f9f;
  }
`;

function HomePage() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      {/* 팔도 상회 이미지 추가 */}
      <PaldoImage src={paldoImage} alt="팔도 상회 로고" />
      <Heading>Welcome to Live Commerce</Heading>
      <Button onClick={() => navigate('/login')}>로그인</Button>
      <Button onClick={() => navigate('/signup')}>회원가입</Button>
    </Wrapper>
  );
}

export default HomePage;
