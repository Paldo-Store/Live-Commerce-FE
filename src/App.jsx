// src/App.jsx
import {  Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import IntroPage from './pages/IntroPage'
import SubscribePage from './pages/SubscribePage'
import ContentPage from './pages/ContentPage'
import MyPage from './pages/MyPage'

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IntroPage />} />
          <Route path="subscribe" element={<SubscribePage />} />
          <Route path="live" element={<ContentPage />} />
          <Route path="my" element={<MyPage />} />
        </Route>
      </Routes>
  )
}
