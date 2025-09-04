import './App.css'
import HomePage from './pages/Home/HomePage'
import SignupPage from './pages/SignupPage/SignupPage'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App
