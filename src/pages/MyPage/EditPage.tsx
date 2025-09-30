import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import Header from "../../components/Header/Header";
import BottomBar from "../../components/BottomBar/BottomBar";
import "./EditPage.css";

export default function EditPage() {
  const nav = useNavigate();
  const [profileImg, setProfileImg] = useState("/Mypage/default-profile.svg");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onLogout = () => {
    nav("/signup");
  };

  // 카메라 아이콘 클릭 시 input 열기
  const handlePhotoEditClick = () => {
    fileInputRef.current?.click();
  };

  // 이미지 선택 → 미리보기 업데이트
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setProfileImg(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const noop = () => {};

  return (
    <div className="edit-page">
      <Header title="내 정보 수정" />

      {/* 프로필 영역 */}
      <section className="edit-hero">
        <div className="avatar-wrap">
          <img className="avatar" src={profileImg} alt="프로필" />
          <img
            className="avatar-edit"
            src="/Mypage/photo-edit.svg"
            alt="사진 변경"
            onClick={handlePhotoEditClick}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
      </section>

      {/* 정보 리스트 */}
      <div className="info-list">
        <button className="info-row" onClick={noop}>
          <div className="info-label">이름(생년월일)</div>
          <div className="info-value">김윗인 (2002.05.11)</div>
          <img className="row-arrow" src="/arrow-gray.svg" alt="" />
        </button>
        <div className="divider" />

        <button className="info-row" onClick={noop}>
          <div className="info-label">외국인등록번호</div>
          <div className="info-value">823497-30093</div>
          <img className="row-arrow" src="/arrow-gray.svg" alt="" />
        </button>
        <div className="divider" />

        <button className="info-row" onClick={noop}>
          <div className="info-label">휴대폰 번호</div>
          <div className="info-value">010-1234-5678</div>
          <img className="row-arrow" src="/arrow-gray.svg" alt="" />
        </button>
        <div className="divider" />

        <button className="info-row" onClick={noop}>
          <div className="info-label">이메일</div>
          <div className="info-value">within@gmail.com</div>
          <img className="row-arrow" src="/arrow-gray.svg" alt="" />
        </button>
        <div className="divider" />

        <button className="info-row" onClick={noop}>
          <div className="info-label">비밀번호 변경</div>
          <img className="row-arrow" src="/arrow-gray.svg" alt="" />
        </button>
        <div className="divider" />
      </div>

      {/* 로그아웃/회원탈퇴 */}
      <div className="logout-wrap">
        <button className="logout-btn" onClick={onLogout}>로그아웃</button>
        <span className="sep">|</span>
        <button className="withdraw-btn" onClick={noop}>회원탈퇴</button>
      </div>

      <BottomBar />
    </div>
  );
}