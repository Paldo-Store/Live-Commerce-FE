// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import IntroPage from './pages/IntroPage'
import SubscribePage from './pages/SubscribePage'
import ContentPage from './pages/ContentPage'
import MyPage from './pages/MyPage'
import LivePage from './pages/LivePage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IntroPage />} />
        <Route path="subscribe" element={<SubscribePage />} />
        <Route path="live" element={<ContentPage />} />
        <Route path="/live/:id" element={<LivePage />} />
        <Route path="my" element={<MyPage />} />
      </Route>
    </Routes>
  )
}
