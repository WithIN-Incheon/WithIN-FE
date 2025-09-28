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
import MedicarePage from "./pages/Medi-carePage/MedicarePage";
import MedicareGuideFlow from "./pages/Medi-carePage/MedicareGuideFlow";
import MediGuidePage1 from "./pages/Medi-carePage/Medi-GuidePage-1";
import MediGuidePage2 from "./pages/Medi-carePage/Medi-GuidePage-2";
import MediGuidePage3 from "./pages/Medi-carePage/Medi-GuidePage-3";
import MediGuidePage4 from "./pages/Medi-carePage/Medi-GuidePage-4";
import MediGuidePage5 from "./pages/Medi-carePage/Medi-GuidePage-5";
import MediGuidePage6 from "./pages/Medi-carePage/Medi-GuidePage-6";
import MediResult from "./pages/Medi-carePage/Medicare-result";
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
        <Route path="/medicare" element={<MedicarePage />} />
        <Route path="/medicare-guide-flow" element={<MedicareGuideFlow />} />
        <Route path="/medi-guide-1" element={<MediGuidePage1 />} />
        <Route path="/medi-guide-2" element={<MediGuidePage2 />} />
        <Route path="/medi-guide-3" element={<MediGuidePage3 />} />
        <Route path="/medi-guide-4" element={<MediGuidePage4 />} />
        <Route path="/medi-guide-5" element={<MediGuidePage5 />} />
        <Route path="/medi-guide-6" element={<MediGuidePage6 />} />
        <Route path="/medi-result" element={<MediResult />} />
      </Routes>
    </Router>
  );
}

export default App;
