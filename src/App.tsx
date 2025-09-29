import './App.css'
import HomePage from './pages/HomePage/HomePage'
import SignupPage from './pages/SignupPage/SignupPage'
import CasePage from './pages/CasePage/CasePage'
import CaseDetailPage from "./pages/CasePage/CaseDetailPage"
import GuidePage from './pages/Comp-GuidePage/Comp-GuidePage'
import FavoritePage from './pages/FavoritePage/FavoritePage'
import MyPage from './pages/MyPage/MyPage'
import EditPage from './pages/MyPage/EditPage'
import DataPage from './pages/MyPage/DataPage'

import LocationPage from "./pages/LocationPage/LocationPage";
import BookmarkPage from "./pages/LocationPage/BookmarkPage/BookmarkPage";
import SearchPage from "./pages/LocationPage/SearchPage/SearchPage";

import InfoPage from "./pages/InfoPage/InfoPage";
import InfoCompPage from "./pages/InfoPage/InfoCompPage/InfoCompPage";
import InfoProcessPage from "./pages/InfoPage/InfoProcessPage/InfoProcessPage";
import InfoSalaryPage  from "./pages/InfoPage/InfoSalaryPage/InfoSalaryPage";
import InfoDictionPage  from "./pages/InfoPage/InfoDictionPage/InfoDictionPage";
import InfoTipPage from "./pages/InfoPage/InfoTipPage/InfoTipPage";
import InfoCenterPage from "./pages/InfoPage/InfoCenterPage/InfoCenterPage";

import HelperPage from "./pages/HelpPage/HelpPage";

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/cases" element={<CasePage />} />
        <Route path="/cases/:id" element={<CaseDetailPage />} />

        <Route path="/guide" element={<GuidePage/>} />
        <Route path="/favorite" element={<FavoritePage/>} />
        <Route path="/mypage" element={<MyPage/>} />
        <Route path="/mypage/edit" element={<EditPage/>} />
        <Route path="/mypage/data" element={<DataPage/>} />
        <Route path="/helper" element={<HelperPage />} />
        <Route path="/location " element={<LocationPage  />} />
        <Route path="/location/bookmark" element={<BookmarkPage />} />
        <Route path="/location/search" element={<SearchPage />} />

        <Route path="/info" element={<InfoPage />} />
        <Route path="/info/compensation" element={<InfoCompPage />} />
        <Route path="/info/process" element={<InfoProcessPage />} />
        <Route path="/info/salary" element={<InfoSalaryPage />} />
        <Route path="/info/dictionary" element={<InfoDictionPage/>} />
        <Route path="/info/tip" element={<InfoTipPage/>} />
        <Route path="/info/center" element={<InfoCenterPage />} />
        

      </Routes>
    </Router>
  );
}

export default App;
