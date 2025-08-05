// src/components/Layout.jsx
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import styled from '@emotion/styled'

import homeUrl from '../assets/home.png'
import subscribeUrl from '../assets/subscribe.png'
import liveUrl from '../assets/live.png'
import myUrl from '../assets/mypage.png'

const AppContainer = styled.div`
  min-height: 100vh;
  background: #f2f4f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;  
  overflow-x: hidden;   
`

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 420px;
  flex: 1;
  background: #ffffff;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  overflow-y: auto;
  overflow-x: hidden;
    &::-webkit-scrollbar {
    display: none;
  }
`

const Header = styled.header`
  box-sizing: border-box;
  width: 100%;
  max-width: 420px;
  height: 56px;
  background: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  padding-left: 16px;
  font-weight: bold;
  font-size: 18px;
`

const BottomNav = styled.nav`
  width: 100%;
  max-width: 420px;
  height: var(--bottom-nav-h);   /* 변수만 사용 */
  background: #ffffff;
  border-top: 1px solid #e0e0e0;
  display: flex;
  z-index: 10;
`

const NavItem = styled.div`
  flex: 1;
  text-align: center;
  padding-top: 8px;
  color: ${p => (p.active ? '#3f51b5' : '#888')};
  font-size: 12px;
  cursor: pointer;
`

export default function Layout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const items = [
    { path: '/',         label: '소개',   url: homeUrl },
    { path: '/subscribe', label: '구독',  url: subscribeUrl },
    { path: '/live',      label: '콘텐츠', url: liveUrl },
    { path: '/my',        label: 'MY',     url: myUrl },
  ]

  return (
    <AppContainer>
      <Header>Paldo SangHoe</Header>

      <ContentWrapper>
        <Outlet />
      </ContentWrapper>

      <BottomNav>
        {items.map(({ path, label, url }) => (
          <NavItem
            key={path}
            active={pathname === path}
            onClick={() => navigate(path)}
          >
            <img src={url} alt={label} width={24} height={24} />
            <div>{label}</div>
          </NavItem>
        ))}
      </BottomNav>
    </AppContainer>
  )
}

