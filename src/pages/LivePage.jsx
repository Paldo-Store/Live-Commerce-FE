// src/pages/LivePage.jsx
import React, { useRef, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import likeIcon from '../assets/like.png'
import couponIcon from '../assets/coupon.png'

const promoItems = [
  { img: 'https://picsum.photos/80/80?random=5', title: '추천 상품 #1', price: '25,900원' },
  { img: 'https://picsum.photos/80/80?random=6', title: '추천 상품 #2', price: '19,900원' },
]

// ── 스타일드 컴포넌트 ─────────────────────────────────

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;         /* 부모(ContentWrapper) 높이 전부 */
`

const VideoWrapper = styled.div`
  position: relative;
  flex: 1;               /* 입력부 제외한 나머지 전부 차지 */
  background: #000;
  overflow: hidden;
`

const VideoElement = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ProductOverlay = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 2;

  .promo {
    display: flex;
    align-items: center;
    background: rgba(255,255,255,0.8);
    padding: 4px 8px;
    border-radius: 4px;

    img {
      width: 40px; height: 40px;
      border-radius: 4px;
      object-fit: cover;
      margin-right: 8px;
    }

    .info {
      font-size: 0.85rem;

      .title { font-weight: bold; }
      .price { color: #e55353; }
    }
  }
`

const IconOverlay = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;  /* 세로 배치 */
  gap: 12px;
  z-index: 2;

  img {
    width: 32px; height: 32px;
    cursor: pointer;
  }
`

const ChatOverlay = styled.div`
  position: absolute;
  bottom: 80px;            /* 입력창 위, 영상 왼쪽 아래 */
  left: 16px;
  max-width: 60%;
  max-height: 40%;
  overflow-y: auto;
  padding: 8px;
  background: rgba(0,0,0,0.4);
  border-radius: 4px;
  color: #fff;
  font-size: 0.8rem;
  z-index: 2;

  div + div {
    margin-top: 4px;
  }
`

const ChatInputWrapper = styled.div`
  padding: 8px 16px;
  border-top: 1px solid #e0e0e0;
  background: #fafafa;
  display: flex;
`

const ChatInput = styled.input`
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  font-size: 0.9rem;
  margin-right: 8px;
`

const ChatButton = styled.button`
  padding: 8px 16px;
  background: #3f51b5;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
`

// ── 컴포넌트 ─────────────────────────────────────────────

export default function LivePage() {
  const { id } = useParams()
  const videoRef = useRef(null)
  const [messages, setMessages] = useState([
    '환영합니다! 라이브에 참여해 주세요.',
    '첫 구매 고객에겐 추가 쿠폰을 드립니다.',
  ])
  const [input, setInput] = useState('')

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

  const sendMessage = () => {
    if (input.trim() === '') return
    setMessages(prev => [...prev, input.trim()])
    setInput('')
  }

  return (
    <PageContainer>
      {/* 1) 영상 + 오버레이 */}
      <VideoWrapper>
        <VideoElement
          ref={videoRef}
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          loop
          muted
          autoPlay
        />

        <ProductOverlay>
          {promoItems.map((p, i) => (
            <div className="promo" key={i}>
              <img src={p.img} alt={p.title} />
              <div className="info">
                <div className="title">{p.title}</div>
                <div className="price">{p.price}</div>
              </div>
            </div>
          ))}
        </ProductOverlay>

        <IconOverlay>
          <img src={likeIcon} alt="좋아요" />
          <img src={couponIcon} alt="쿠폰" />
        </IconOverlay>

        <ChatOverlay>
          {messages.map((m, i) => (
            <div key={i}>{m}</div>
          ))}
        </ChatOverlay>
      </VideoWrapper>

      {/* 2) 채팅 입력부 (맨 하단 고정) */}
      <ChatInputWrapper>
        <ChatInput
          type="text"
          placeholder="실시간 채팅에 참여하세요"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <ChatButton onClick={sendMessage}>전송</ChatButton>
      </ChatInputWrapper>
    </PageContainer>
  )
}
