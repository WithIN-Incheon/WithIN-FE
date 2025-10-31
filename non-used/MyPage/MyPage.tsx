// import { useNavigate } from "react-router-dom";
// import Header from "../../src/components/Header/Header";
// import BottomBar from "../../src/components/BottomBar/BottomBar";
// import "./MyPage.css";

// export default function MyPage() {
//   const nav = useNavigate();

//   const goEdit = () => nav("/mypage/edit");
//   const goData = () => nav("/mypage/data");

//   return (
//     <div className="mypage">
//       <Header title="마이페이지" />

//       {/* 프로필 영역 */}
//       <section className="mp-hero">
//         <button className="avatar-wrap" onClick={goEdit} aria-label="프로필 수정">
//           <img
//             className="avatar"
//             src="/Mypage/default-profile.svg"
//             width={92}
//             height={92}
//             alt="기본 프로필"
//           />
//           <img
//             className="avatar-edit"
//             src="/Mypage/photo-edit.svg"
//             width={24}
//             height={24}
//             alt=""
//           />
//         </button>
//         <div className="profile-name">김윗인</div>
//       </section>

//       {/* 내 정보 */}
//       <div className="section-title" style={{ marginTop: 24 }}>
//         내 정보
//       </div>
//       <div className="list-row" onClick={goEdit} role="button" tabIndex={0}>
//         <span className="row-text">정보 수정</span>
//         <img className="row-arrow" src="/arrow-gray.svg" alt="" />
//       </div>

//       <div className="gap-strip" />

//       {/* 데이터 관리 */}
//       <div className="section-title">데이터 관리</div>
//       <div className="list-row" onClick={goData} role="button" tabIndex={0}>
//         <span className="row-text">서류 관리</span>
//         <img className="row-arrow" src="/arrow-gray.svg" alt="" />
//       </div>

//       <BottomBar />
//     </div>
//   );
// }
