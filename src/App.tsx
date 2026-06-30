import { HashRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BlogPage from './pages/BlogPage'
import TulaPage from './pages/TulaPage'
import TverPage from './pages/TverPage'
import CrimeaPage from './pages/CrimeaPage'
import MoscowPage from './pages/MoscowPage'
import InstallmentPage from './pages/InstallmentPage'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/tula" element={<TulaPage />} />
        <Route path="/tver" element={<TverPage />} />
        <Route path="/crimea" element={<CrimeaPage />} />
        <Route path="/moscow" element={<MoscowPage />} />
        <Route path="/installment/:land?" element={<InstallmentPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App
