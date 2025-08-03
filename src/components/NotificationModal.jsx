// src/components/NotificationModal.jsx
import React from 'react'
import styled from '@emotion/styled'

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(4px);
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const Dialog = styled.div`
  width: 90%; max-width: 360px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
`

const Header = styled.div`
  padding: 16px;
  font-weight: bold;
  font-size: 1.125rem;
  border-bottom: 1px solid #e0e0e0;
`

const Body = styled.div`
  padding: 16px;
  font-size: 0.95rem;
  color: #333;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-top: 1px solid #e0e0e0;
`

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;

  &.cancel {
    background: #f2f2f2;
    color: #555;
  }
  &.confirm {
    background: #3f51b5;
    color: #fff;
  }
`

export default function Modal({
  isOpen,
  title,
  description,
  onCancel,
  onConfirm
}) {
  return (
    <Overlay isOpen={isOpen}>
      <Dialog>
        <Header>{title}</Header>
        <Body>{description}</Body>
        <Footer>
          <Button className="cancel" onClick={onCancel}>
            취소
          </Button>
          <Button className="confirm" onClick={onConfirm}>
            신청하기
          </Button>
        </Footer>
      </Dialog>
    </Overlay>
  )
}
