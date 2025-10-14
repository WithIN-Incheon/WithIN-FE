import { useRef, useEffect } from "react";
import { useNaverMap } from "../hooks/useNaverMap";

interface Props {
  onSelect: (id: string) => void;
}

export default function MapView({ onSelect }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const { map, handleSelectHospital } = useNaverMap(mapRef);

  useEffect(() => {
    if (map) console.log("🗺️ 네이버 지도 로드 완료");
  }, [map]);

  return (
    <div className="loc-map" style={{ position: "relative" }}>
      <div ref={mapRef} className="loc-map_canvas" />

      {map && (
        <div className="loc-zoomctrl">
          <button
            onClick={() => map.setZoom(map.getZoom() + 1, true)}
            className="loc-zoombtn"
          >
            ＋
          </button>
          <button
            onClick={() => map.setZoom(map.getZoom() - 1, true)}
            className="loc-zoombtn"
          >
            －
          </button>
        </div>
      )}
    </div>
  );
}
