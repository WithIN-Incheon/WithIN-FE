import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FormDataProvider } from "./contexts/FormDataContext";
import { LocalizationProvider } from "./contexts/LocalizationContext";
import usePageTracking from "./hooks/usePageTracking";

import HomePage from "./pages/HomePage/HomePage";
import CasePage from "./pages/CasePage/CasePage";
import CaseDetailPage from "./pages/CasePage/CaseDetailPage";
import GuidePage from "./pages/Comp-GuidePage/Comp-GuidePage";
import ListPage from "./pages/ListPage/ListPage"

import InfoPage from "./pages/InfoPage/InfoPage";
import InfoCompPage from "./pages/InfoPage/InfoCompPage/InfoCompPage";
import InfoProcessPage from "./pages/InfoPage/InfoProcessPage/InfoProcessPage";
import InfoSalaryPage from "./pages/InfoPage/InfoSalaryPage/InfoSalaryPage";
import InfoDictionPage from "./pages/InfoPage/InfoDictionPage/InfoDictionPage";

import MedicarePage from "./pages/Medi-carePage/MedicarePage";
import MedicareGuideFlow from "./pages/Medi-carePage/MedicareGuideFlow";
import LangPage from "./pages/LangPage/LangPage";
import MediAddress1 from "./pages/Medi-carePage/Medi-address-1";

import CenterPage from "./pages/CenterPage/CenterPage";
import SplashPage from "./pages/SplashPage/SplashPage";

// import LocationPage from "./pages/LocationPage/LocationPage";
// import SearchPage from "./pages/LocationPage/SearchPage/SearchPage";
// import InfoTipPage from "./pages/InfoPage/InfoTipPage/InfoTipPage";
// import InfoCenterPage from "./pages/InfoPage/InfoCenterPage/InfoCenterPage";
// import SignupPage from "./pages/SignupPage/SignupPage";
// import BookmarkPage from "./pages/LocationPage/BookmarkPage/BookmarkPage";
// import FavoritePage from "./pages/FavoritePage/FavoritePage";
// import MyPage from "./pages/MyPage/MyPage";
// import EditPage from "./pages/MyPage/EditPage";
// import DataPage from "./pages/MyPage/DataPage";
// import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
  usePageTracking();
  return (
    <Router>
      <LocalizationProvider>
      <FormDataProvider>
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/lang" element={<LangPage />} />
          <Route path="/home" element={<HomePage />} />

          <Route path="/cases" element={<CasePage />} />
          <Route path="/cases/:id" element={<CaseDetailPage />} />

          <Route path="/guide" element={<GuidePage />} />

        <Route path="/list" element={<ListPage />} />

          <Route path="/info" element={<InfoPage />} />
          <Route path="/info/compensation" element={<InfoCompPage />} />
          <Route path="/info/process" element={<InfoProcessPage />} />
          <Route path="/info/salary" element={<InfoSalaryPage />} />
          <Route path="/info/dictionary" element={<InfoDictionPage />} />

          <Route path="/medicare" element={<MedicarePage />} />
          <Route path="/medicare-guide-flow" element={<MedicareGuideFlow />} />
          <Route path="/medi-address-1" element={<MediAddress1 />} />

          <Route path="/center" element={<CenterPage />} />
        </Routes>
      </FormDataProvider>
      </LocalizationProvider>
    </Router> 
  );
}

export default App;
