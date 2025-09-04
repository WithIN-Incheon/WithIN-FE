import React from "react";
import "./HomePage.css";
import BottomBar from "../../components/BottomBar";

export default function App() {
  return (
    <div className="app">
        <div className="hero">
            <div className="topbar">
                <div className="username"> 
                    김윗인 님<img className="vector" src="/Home/Vector.svg"/>
                </div>
                <img className="search" src="/Home/SearchIcon.svg"/>
            </div>
            <img className="bg-icon" src="/Home/BgIcon.png"/>
            <div className="headline">
                <div className="subtitle">옆에서 차근차근 도와주는</div>
                <div className="title">산재 가이드, WithIN</div>
            </div>
            <a
            className="quick-link"
            href="https://www.iscfr.or.kr/"
            target="_blank"
            rel="noreferrer"
            >
            인천외국인종합지원센터 바로 가기
            <img className="vector2" src="/Home/Vector2.svg" alt="go" />
            </a>

            <div className="hero-spacing"></div>
        </div>

        <div className="content">
            <div className="tip-label">💡 당신을 위한 산재 TIP</div>
            <div className="tip-pill">산재 신청은 사고 발생 3일 이내가 좋아요!</div>

            <div className="photo-group">
                <img className="shadow-img" src="/Home/Home_Guide.svg" alt="산재 신청 가이드" />
                <img className="shadow-img" src="/Home/Home_ExSearch.svg" alt="사례 검색" />
                <img className="shadow-img" src="/Home/Home_HosSearch.svg" alt="의료기관 검색" />
            </div>
        </div>
        <BottomBar />
        <img className="chat" src="/Home/Chat.svg" alt="chat" />
    </div>
  );
}
