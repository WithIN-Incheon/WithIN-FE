/**
 * MediGuidePage 1~6 컴포넌트의 공통 Props 타입.
 * 스텝 컨트롤러(MedicareGuideFlow)가 각 페이지에 주입하는 콜백과 현재 단계 정보를 담습니다.
 */
export interface MediGuidePageProps {
  onNext?: () => void;
  onBack?: () => void;
  /** 주소 검색 등 서브 페이지 복귀에 사용 (선택) */
  currentStep?: number;
}
