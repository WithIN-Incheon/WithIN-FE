import Header from "../../components/Header/Header";
import BottomBar from "../../components/BottomBar/BottomBar";
import "./CenterPage.css";
import { useLocalization } from "../../contexts/LocalizationContext";

export default function CenterPage() {
  const { t } = useLocalization();

  return (
    <div>
      <Header title="센터 소개" />

      <BottomBar />
    </div>
  );
}
