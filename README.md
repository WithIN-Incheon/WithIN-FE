# With IN – 외국인 근로자 산재보험 가이드 웹앱

## 📌 Project Overview

한국에서 근로 중인 외국인 노동자들은 산재보험 관련 정보가 대부분 한국어 기반으로 제공되고, 용어가 어렵고, 기관마다 정보가 분산되어 있어 정확한 안내를 받기 어려운 상황에 놓여 있습니다.
**With IN** 웹앱은 이러한 문제를 해결하기 위해 개발된 **다국어 산재보험 가이드 웹앱 서비스**입니다. 
인천시 외국인종합지원센터와 협업하여 프론트엔드 2명, 기획 2명, 디자이너 1명에서 진행한 프로젝트입니다. 26년 1월 출시 목표로 실제 민원 데이터를 기반으로 설계되었으며, 외국인 근로자가 복잡한 산재보험 절차를 쉽고 빠르게 신청할 수 있도록 돕습니다.
<!-- 첫 번째 행: 3개 이미지 -->
<p align="center">
  <img width="300" alt="Frame 5176" src="https://github.com/user-attachments/assets/de404a22-3aed-408b-b7d3-bd6c7c6d8cb3" />
  <img width="300" alt="Frame 5178" src="https://github.com/user-attachments/assets/229e8e6a-baad-40e4-903f-8b4994cf2197" />
  <img width="300" alt="Frame 5179" src="https://github.com/user-attachments/assets/5fbb430d-1536-40a3-9beb-d4b69187ef95" />
</p>

<!-- 두 번째 행: 2개 이미지 -->
<p align="center">
  <img width="300" alt="Frame 5180" src="https://github.com/user-attachments/assets/a07e10ec-9c23-49b8-b50f-1fc9910b9a10" />
  <img width="300" alt="Frame 5181" src="https://github.com/user-attachments/assets/34e06812-a091-4048-9374-6910483113cb" />
</p>

---

## 🚀 Features

### ✔ 다국어 지원 (Localization)
* **한국어(KO), 미얀마어(MM), 베트남어(VN), 인도네시아어(ID), 영어(EN), 네팔어(NP), 태국어(TH), 러시아어(RU)** 지원
* `localization.json` 기반 중앙 집중형 번역 관리
* `LocalizationContext`로 언어 상태 전역 관리
* 사용자가 선택한 언어는 `localStorage`로 저장되어 새로고침 후에도 유지

### ✔ 입력 폼 자동 저장 (Form Persistence)
* 모든 입력 데이터는 `sessionStorage`에 자동 저장
* 페이지 이동 및 새로고침 시에도 입력 정보 유지
* `FormDataContext` 기반 전역 관리
* 단일 JSON으로 최종 제출 정보 생성 기능 제공

### ✔ PDF 산재신청서 자동 생성
* Node.js + pdf-lib 기반 PDF 엔진 사용
* 템플릿 PDF(templates/template.pdf) 위에 입력 데이터를 오버레이
* 한글 폰트 지원(예: NotoSansKR-Regular.otf)으로 글 깨짐 방지
* 주민등록번호 마스킹, 글자 간격 조정, 페이지별 좌표 설정 가능
* React에서 버튼 클릭 시 서버에 데이터를 전송 → PDF 다운로드 가능
* 좌표 기반 설계로 정확한 텍스트 위치 반영

### ✔ React + TypeScript 기반 아키텍처
* 모든 컴포넌트 및 컨텍스트를 TypeScript로 정교하게 타이핑
* 안정성과 유지보수성을 고려한 디렉토리 구조
* 재사용 가능한 UI 컴포넌트 분리 설계

### ✔ 모바일 퍼스트 UI
* 외국인 근로자 실사용 시나리오 기반
* 큰 글자, 명확한 UI, 직관적인 흐름
  
---

## 🗂️ Project Structure

```
WithIN-FE/
 ├─ src/
 │   ├─ components/          # 공통 UI 컴포넌트
 │   ├─ contexts/            # Localization / FormData 컨텍스트
 │   ├─ pages/               # 페이지 단위 화면
 │   ├─ hooks/               # 커스텀 훅
 │   ├─ assets/              # 이미지 및 정적 리소스
 │   ├─ localization.json    # 다국어 번역 데이터
 │   └─ main.tsx
 └─ .github/
     └─ workflows/ci.yml     # CI (lint, test, build)
```

---

## 🌐 Localization Architecture

### `localization.json`

```json
{
  "WELCOME_TITLE": {
    "KO": "산재보험 종합 가이드",
    "EN": "Industrial Accident Insurance Guide",
    "VN": "Hướng dẫn bảo hiểm tai nạn lao động"
  }
}
```

### `LocalizationContext.tsx`

* 언어 변경 → `setLanguage`
* 번역 함수 → `t(key)`
* 타입 안전성을 위해 `LocalizationKey` 자동 생성

---

## 📝 Form Data Architecture

### 기능

* 모든 입력값 자동 저장
* 제출 전 `getJsonData()`로 JSON 변환 가능
* 페이지별 데이터 스키마 관리

---

## 🛠️ Tech Stack

* **React (Vite)**
* **TypeScript**
* **React Router**
* **Context API**

---

## 💡
* 서비스가 아닌 **도구형 구조(다국어 엔진 + 산재 신청 양식 pdf 작성 기능)** 포함
* 프로젝트의 문제 정의 & 해결 과정 명확
* TypeScript 기반의 정제된 구조
* CI, 테스트, 폴더 구조, 번역 시스템 등 **코드 품질 중심 설계**

---


