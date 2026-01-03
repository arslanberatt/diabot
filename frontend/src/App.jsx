import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import WhatIsDiabetes from './pages/WhatIsDiabetes'
import Blogs from './pages/Blogs'
import BlogDetail from './pages/BlogDetail'
import DiabetesAnalysis from './pages/DiabetesAnalysis'
import AdminPanel from './pages/AdminPanel'
import './style.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/diyabet-nedir" element={<WhatIsDiabetes />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/diyabet-analizi" element={<DiabetesAnalysis />} />
        <Route path="/paneldoc" element={<AdminPanel />} />
      </Routes>
    </Router>
  )
}

export default App
