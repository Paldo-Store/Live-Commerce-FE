// src/pages/SubscribePage.jsx
import { useState } from 'react'
import styled from '@emotion/styled'

const PageWrapper = styled.div`
  padding: 16px;
`
// 2열 그리드
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`
// 카드 플레이스홀더
const Card = styled.div`
  height: 120px;
  background: #f5f5f5;
  border-radius: 8px;
`
// 페이지네이션
const Pagination = styled.div`
  margin-top: 16px;
  text-align: center;
  & > button {
    margin: 0 4px;
    padding: 4px 8px;
    border: none;
    background: #eee;
    cursor: pointer;
    &:hover { background: #ddd; }
  }
  & > button.active {
    background: #3f51b5;
    color: #fff;
  }
`

export default function SubscribePage() {
  const totalItems = 20      // 예시: 총 20개
  const perPage = 4
  const totalPages = Math.ceil(totalItems / perPage)

  const [page, setPage] = useState(1)

  // 페이지에 따라 가려질 목업 데이터
  const items = Array.from({ length: totalItems }).map((_, i) => i + 1)
  const visible = items.slice((page-1)*perPage, page*perPage)

  return (
    <PageWrapper>
      <h2>구독하기</h2>
      <Grid>
        {visible.map(i => <Card key={i} />)}
      </Grid>
      <Pagination>
        {Array.from({ length: totalPages }).map((_, idx) => {
          const num = idx + 1
          return (
            <button
              key={num}
              className={num === page ? 'active' : ''}
              onClick={() => setPage(num)}
            >
              {num}
            </button>
          )
        })}
      </Pagination>
    </PageWrapper>
  )
}
