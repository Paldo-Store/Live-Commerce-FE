// src/pages/LivePage.jsx
import React, { useRef, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import likeIcon from '../assets/like.png'
import couponIcon from '../assets/coupon.png'

const promoItems = [
  { img: 'https://picsum.photos/80/80?random=5', title: '추천 상품 #1', price: '25,900원' },
  { img: 'https://picsum.photos/80/80?random=6', title: '추천 상품 #2', price: '19,900원' },
  { img: 'https://picsum.photos/80/80?random=7', title: '추천 상품 #3', price: '29,900원' },
]

const coupons = [
  { id: 1, code: 'ABC123', description: '10% 할인 쿠폰', href: '#' },
  { id: 2, code: 'DEF456', description: '무료 배송 쿠폰', href: '#' },
  { id: 3, code: 'GHI789', description: '5,000원 할인 쿠폰', href: '#' },
]

// ── Styled Components ────────────────────────────────────

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const VideoWrapper = styled.div`
  position: relative;
  flex: 1;
  background: #000;
  overflow: hidden;
`

const VideoElement = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const IconOverlay = styled.div`
  position: absolute;
  bottom: 120px;
  right: 16px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  z-index: 2;

  img {
    width: 32px;
    height: 32px;
    cursor: pointer;
  }
`

const ChatOverlay = styled.div`
  position: absolute;
  bottom: 120px;
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

const ProductBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px 16px 8px;
  display: flex;
  gap: 12px;
  background: rgba(255,255,255,0.9);
  z-index: 1;

  overflow-x: auto;
  overflow-y: hidden;

  &::-webkit-scrollbar { height: 0; }
  scrollbar-width: none;
  -ms-overflow-style: none;

  cursor: grab;
  &:active { cursor: grabbing; }
`

const ProductItem = styled.div`
  display: flex;
  align-items: center;
  min-width: 140px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 4px 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);

  img {
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
    margin-right: 8px;
  }
`

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  white-space: nowrap;

  .title {
    font-size: 0.9rem;
    font-weight: bold;
    color: #333;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .price {
    font-size: 0.8rem;
    color: #e55353;
    margin-top: 4px;
    text-overflow: ellipsis;
    overflow: hidden;
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

const CouponPanel = styled.div`
  position: fixed;
  bottom: 45px;              /* 하단 탭바 높이(필요하면 조정) */
  left: 50%;
  width: 90%;
  max-width: 420px;
  height: 40%;

  background: #fff;

  /* 열림 ↔ 닫힘 */
  transform: ${({ visible }) =>
    visible ? 'translate(-50%, 0)'      /* 제자리 */
            : 'translate(-50%, 110%)'}; /* 화면 아래로 완전 이동 */

  transition: transform 0.7s ease-in-out;

  z-index: 3;
  display: flex;
  flex-direction: column;

  pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};

`

const CouponHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
  font-weight: bold;
`

const CloseButton = styled.button`
  border: none;
  background: transparent;
  font-size: 1.25rem;
  cursor: pointer;
`

const CouponList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px 16px;
`

const CouponItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
`

const DownloadButton = styled.a`
  background: #3f51b5;
  color: #fff;
  padding: 4px 12px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.85rem;
`

export default function LivePage() {
  const { id } = useParams()
  const videoRef = useRef(null)
  const barRef = useRef(null)

  const [messages, setMessages] = useState([
    '환영합니다! 라이브에 참여해 주세요.',
    '첫 구매 고객에겐 추가 쿠폰을 드립니다.',
  ])
  const [input, setInput] = useState('')
  const [isDown, setIsDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [showCoupons, setShowCoupons] = useState(false)

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const onMouseDown = e => {
      setIsDown(true)
      setStartX(e.pageX - bar.offsetLeft)
      setScrollLeft(bar.scrollLeft)
    }
    const onMouseUp = () => setIsDown(false)
    const onMouseLeave = () => setIsDown(false)
    const onMouseMove = e => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - bar.offsetLeft
      const walk = x - startX
      bar.scrollLeft = scrollLeft - walk
    }
    const onWheel = e => {
      e.preventDefault()
      bar.scrollLeft += e.deltaY
    }

    bar.addEventListener('mousedown', onMouseDown)
    bar.addEventListener('mouseup', onMouseUp)
    bar.addEventListener('mouseleave', onMouseLeave)
    bar.addEventListener('mousemove', onMouseMove)
    bar.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      bar.removeEventListener('mousedown', onMouseDown)
      bar.removeEventListener('mouseup', onMouseUp)
      bar.removeEventListener('mouseleave', onMouseLeave)
      bar.removeEventListener('mousemove', onMouseMove)
      bar.removeEventListener('wheel', onWheel)
    }
  }, [isDown, startX, scrollLeft])

  const sendMessage = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, input.trim()])
    setInput('')
  }

  return (
    <PageContainer>
      {/* 영상 + 오버레이 */}
      <VideoWrapper>
        <VideoElement
          ref={videoRef}
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          loop
          muted
          autoPlay
        />

        <IconOverlay>
          <img
            src={likeIcon}
            alt="좋아요"
            onClick={() => {/* 좋아요 로직 */}}
          />
          <img
            src={couponIcon}
            alt="쿠폰"
            onClick={() => setShowCoupons(true)}
          />
        </IconOverlay>

        <ChatOverlay>
          {messages.map((m, i) => (
            <div key={i}>{m}</div>
          ))}
        </ChatOverlay>

        {/* 상품 바 */}
        <ProductBar ref={barRef}>
          {promoItems.map((p, i) => (
            <ProductItem key={i}>
              <img src={p.img} alt={p.title} />
              <ProductInfo>
                <div className="title">{p.title}</div>
                <div className="price">{p.price}</div>
              </ProductInfo>
            </ProductItem>
          ))}
        </ProductBar>
      </VideoWrapper>

      {/* 채팅 입력부 */}
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

      {/* 쿠폰 패널 */}
      <CouponPanel visible={showCoupons}>
        <CouponHeader>
          <div>쿠폰 목록</div>
          <CloseButton onClick={() => setShowCoupons(false)}>✕</CloseButton>
        </CouponHeader>
        <CouponList>
          {coupons.map(c => (
            <CouponItem key={c.id}>
              <div>{c.description} ({c.code})</div>
              <DownloadButton href={c.href}>다운로드</DownloadButton>
            </CouponItem>
          ))}
        </CouponList>
      </CouponPanel>
    </PageContainer>
  )
}
