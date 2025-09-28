import './App.css'
import HomePage from './pages/HomePage/HomePage'
import SignupPage from './pages/SignupPage/SignupPage'
import CasePage from './pages/CasePage/CasePage'
import GuidePage from './pages/Comp-GuidePage/Comp-GuidePage'
import HospitalPage from './pages/HospitalPage/HospitalPage'
import BookmarkPage from './pages/BookmarkPage/BookmarkPage'
import MyPage from './pages/MyPage/MyPage'
import InfoPage from "./pages/InfoPage/InfoPage";
import HelperPage from "./pages/HelpPage/HelpPage";

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/case" element={<CasePage />} />
        <Route path="/guide" element={<GuidePage/>} />
        <Route path="/hospital" element={<HospitalPage/>} />
        <Route path="/bookmark" element={<BookmarkPage/>} />
        <Route path="/mypage" element={<MyPage/>} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/helper" element={<HelperPage />} />
      </Routes>
    </Router>
  );
}

export default App;
