// src/pages/IntroPage.jsx
import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NotificationModal from '../components/NotificationModal'
import styled from '@emotion/styled'
import subscribeIcon from '../assets/subscribe.png'

// ── 데이터 (나중에 동적/핀시아 반영 예정) ─────────────────────────
const featuredData = {
  id: 1,
  thumb: 'https://picsum.photos/400/300?random=99',
  title: 'LIVE 특가: 역대급 혜택 대공개',
  subtitle: '내일 오후 7시',
  previews: [
    { price: '25,900원', label: '[특가] 추천 상품 #1', img: 'https://picsum.photos/40/40?random=1' },
    { price: '25,900원', label: '[특가] 추천 상품 #2', img: 'https://picsum.photos/40/40?random=2' },
  ],
}

const livesData = [
  { id: 1, title: '여름맞이 특가', host: '팔도상회 호스트', time: '2025-08-03 14:00' },
  { id: 2, title: '가을 신상 소개', host: '팔도상회 패션', time: '2025-08-04 16:00' },
  { id: 3, title: '겨울 준비 SALE', host: '팔도상회 윈터', time: '2025-08-05 18:00' },
  { id: 4, title: '스페셜 게스트 방송', host: '팔도상회 스페셜', time: '2025-08-06 20:00' },
]

const productsData = [
  { id: 1, title: '상품 #1', price: '25,900원', img: 'https://picsum.photos/300/200?random=21' },
  { id: 2, title: '상품 #2', price: '25,900원', img: 'https://picsum.photos/300/200?random=22' },
  { id: 3, title: '상품 #3', price: '25,900원', img: 'https://picsum.photos/300/200?random=23' },
  { id: 4, title: '상품 #4', price: '25,900원', img: 'https://picsum.photos/300/200?random=24' },
]

// ── 스타일드 컴포넌트 ────────────────────────────────────
const Wrapper = styled.div`
  padding: 16px;
  max-width: 420px;
  margin: 0 auto;
  background: #ffffff;
`
const SectionTitle = styled.h3`
  margin-top: 32px;
  margin-bottom: 16px;
  font-size: 1.25rem;
  font-weight: 600;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 4px;
  color: #333;
`

// Featured
const FeaturedWrapper = styled.div`
  position: relative;
  margin-bottom: 32px;
`
const FeaturedBg = styled.div`
  position: absolute;
  top: 0; left: 50%;
  transform: translateX(-50%);
  width: 100vw; height: 100%;
  // background-color: #c0c0c0ff; // 특가 배경인데 없는게 더 이뻐보임. 
  z-index: 0;
`
const FeaturedContent = styled.div`
  position: relative;
  display: flex;
  overflow: hidden;
  gap: 16px;
  z-index: 1;
`
const Thumb = styled.img`
  flex: 0 0 45%;
  max-width: 45%;
  border-radius: 8px;
  object-fit: cover;
`
const Details = styled.div`
  flex: 1 1 55%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  h3 { margin: 0 0 4px; font-size: 1.25rem; color: #222; }
  .sub { margin: 0 0 12px; color: #666; font-size: 0.9rem; }
  .alert-btn {
    display: inline-flex; align-items: center; margin-bottom: 16px;
    background: #fff; border: 1px solid #e0e0e0; border-radius: 20px;
    padding: 4px 12px; font-size: 0.85rem; cursor: pointer;
    img { margin-right: 4px; }
    &:hover { background: #dddddd; }
  }
  .preview-list { display: flex; flex-direction: column; gap: 8px;
    .preview-item { display: flex; gap: 4px; align-items: center;
      img { width: 40px; height: 40px; border-radius: 4px; object-fit: cover; }
      div { font-size: 0.8rem; line-height: 1.2;
        strong { display: block; color: #e55353; }
      }
    }
  }
`

// Carousel
const CarouselContainer = styled.div`
  position: relative;
  overflow: hidden;
  padding: 0 16px;
  margin-bottom: 24px;
`
const SlideList = styled.div`
  display: flex;
  transition: transform 0.3s ease;
`
const LiveCard = styled.div`
  padding: 8px;
  box-sizing: border-box;
  flex: 0 0 auto;

  .card-inner {
    background: #fafafa; border: 1px solid #e0e0e0;
    border-radius: 8px; overflow: hidden;
    display: flex; flex-direction: column; height: 100%;
  }
  img { width: 100%; height: 120px; object-fit: cover; }
  .info {
    padding: 12px; flex: 1;
    display: flex; flex-direction: column; justify-content: space-between;
    .text-group p { margin: 4px 0; color: #444; font-size: 0.9rem;
      &:first-of-type { font-weight: 600; font-size: 1rem; }
    }
    .product-preview { margin-top: 8px; display: flex; align-items: center;
      img { width: 40px; height: 40px; border-radius: 4px; margin-right: 8px; }
      .title { flex: 1; font-size: 0.9rem; color: #333; }
    }
    .alert-btn { margin-top: 8px; align-self: flex-start;
      display: flex; align-items: center; background: #fff;
      border: 1px solid #e0e0e0; border-radius: 20px;
      padding: 4px 8px; font-size: 0.85rem; cursor: pointer;
      &:hover { background: #f2f2f2; }
      img { margin-right: 4px; }
    }
  }
`
const NavButton = styled.button`
  position: absolute; top: 50%; transform: translateY(-50%);
  ${p => (p.left ? 'left: 4px' : 'right: 4px')};
  background: rgba(255,255,255,0.8); border: 1px solid #ccc;
  border-radius: 50%; width: 32px; height: 32px; cursor: pointer;
`

// Product Grid
const ProductGrid = styled.div`
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 12px; margin: 24px 0;
`
const ProductCard = styled.div`
  background: #fff; border: 1px solid #e0e0e0;
  border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  overflow: hidden; display: flex; flex-direction: column;
  img { width: 100%; height: 100px; object-fit: cover; }
  .content { padding: 8px; flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
  .title { font-size: 0.95rem; color: #333; font-weight: 500; }
  .price { font-size: 0.85rem; color: #e55353; font-weight: 600; }
  .alert-btn { display: flex; align-items: center; background: #fff; border: 1px solid #e0e0e0; border-radius: 20px; padding: 4px 8px; font-size: 0.8rem; cursor: pointer; margin-top: 8px;
    img { margin-right: 4px; }
    &:hover { background: #f2f2f2; }
  }
`



// ── 서브컴포넌트 ────────────────────────────────────────────
function FeaturedSection() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const goToLive = () => navigate(`/live/${featuredData.id}`)

  return (
    <FeaturedWrapper
      onClick={goToLive}
      style={{ cursor: 'pointer' }}       // 클릭 가능한 느낌
    >
      <FeaturedBg />
      <FeaturedContent>
        <Thumb src={featuredData.thumb} alt="대표 라이브 썸네일" />
        <Details>
          <h3>{featuredData.title}</h3>
          <p className="sub">{featuredData.subtitle}</p>
          <button 
          className="alert-btn" 
            onClick={e => { e.stopPropagation(); openModal() }}
          >
            <img src={subscribeIcon} alt="알림" style={{ width: 16, height: 16 }} />
            알림 받기
          </button>
          <div className="preview-list">
            {featuredData.previews.map((p, i) => (
              <div className="preview-item" key={i}>
                <img src={p.img} alt="상품 미리보기" />
                <div>
                  <strong>{p.price}</strong>
                  {p.label}
                </div>
              </div>
            ))}
          </div>
        </Details>
      </FeaturedContent>
      <NotificationModal
        isOpen={isModalOpen}
        title="팔도상회"
        description="라이브 알림을 받아보시겠습니까?"
        onCancel={closeModal}
        onConfirm={closeModal}
      />
    </FeaturedWrapper>
  )
}

function LiveCarousel() {
  const [index, setIndex] = useState(0)
  const visibleCount = 2
  const maxIndex = livesData.length - visibleCount
  const [cardWidth, setCardWidth] = useState(0)
  const carouselRef = useRef(null)

  useEffect(() => {
    const updateWidth = () => {
      if (!carouselRef.current) return
      setCardWidth((carouselRef.current.clientWidth - 32) / visibleCount)
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  return (
    <CarouselContainer ref={carouselRef}>
      <SlideList style={{ transform: `translateX(-${index * cardWidth}px)` }}>
        {livesData.map(l => (
          <LiveCard key={l.id} style={{ flex: `0 0 ${cardWidth}px`, width: `${cardWidth}px` }}>
            <div className="card-inner">
              <img src={`https://picsum.photos/300/200?random=${l.id}`} alt="라이브 썸네일" />
              <div className="info">
                <div className="text-group">
                  <p>{`LIVE ${l.id}: ${l.title}`}</p>
                  <p>{`진행자: ${l.host}`}</p>
                  <p>{`시작: ${l.time}`}</p>
                </div>
                <div className="product-preview">
                  <img src="https://picsum.photos/40/40?random=10" alt="상품 미리보기" />
                  <div className="title">추천 상품명</div>
                </div>
                <button className="alert-btn" onClick={() => setIndex(index)}>
                  <img src={subscribeIcon} alt="알림" style={{ width: 16, height: 16 }} />
                  알림 받기
                </button>
              </div>
            </div>
          </LiveCard>
        ))}
      </SlideList>
      {index > 0 && <NavButton left onClick={() => setIndex(i => i - 1)}>&lt;</NavButton>}
      {index < maxIndex && <NavButton onClick={() => setIndex(i => i + 1)}>&gt;</NavButton>}
    </CarouselContainer>
  )
}

function ProductGridSection() {
  return (
    <ProductGrid>
      {productsData.map(p => (
        <ProductCard key={p.id}>
          <img src={p.img} alt={p.title} />
          <div className="content">
            <div>
              <div className="title">{p.title}</div>
              <div className="price">{p.price}</div>
            </div>
            <button className="alert-btn" onClick={() => { }}>
              <img src={subscribeIcon} alt="알림" style={{ width: 16, height: 16 }} />
              알림 받기
            </button>
          </div>
        </ProductCard>
      ))}
    </ProductGrid>
  )
}

// ── 메인 컴포넌트 ───────────────────────────────────────────
export default function IntroPage() {
  return (
    <Wrapper>
      <SectionTitle>오늘 놓치지 마세요!</SectionTitle>
      <FeaturedSection />

      <SectionTitle>오늘의 라이브 방송</SectionTitle>
      <LiveCarousel />

      <SectionTitle>추천 상품</SectionTitle>
      <ProductGridSection />
    </Wrapper>
  )
}
