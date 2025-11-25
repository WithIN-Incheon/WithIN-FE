import { useEffect, useRef } from "react";
import { HOSPITALS, type Hospital } from "../src/pages/LocationPage/hospitals";
import { geocodeByRest } from "./geocode";

interface MapProps {
  onSelectHospital?: (hospital: Hospital | null) => void;
}

export default function Map({ onSelectHospital }: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<naver.maps.Map | null>(null);
  const markersRef = useRef<Record<string, naver.maps.Marker>>({});

  useEffect(() => {
    if (!window.naver?.maps || !mapRef.current) return;

    const map = new window.naver.maps.Map(mapRef.current, {
      center: new window.naver.maps.LatLng(37.463, 126.65),
      zoom: 13,
    });
    mapInstance.current = map;

    const createMarkers = async () => {
      for (const hospital of HOSPITALS) {
        try {
          let lat = (hospital as any).lat;
          let lng = (hospital as any).lng;

          if (!lat || !lng) {
            const pos = await geocodeByRest(hospital.address);
            if (!pos) continue;
            lat = pos.lat;
            lng = pos.lng;
          }

          const position = new window.naver.maps.LatLng(lat, lng);
          const marker = new window.naver.maps.Marker({
            position,
            map,
            title: hospital.name,
          });

          window.naver.maps.Event.addListener(marker, "click", () => {
            map.panTo(position);
            map.setZoom(15);
            onSelectHospital?.(hospital);
          });

          markersRef.current[hospital.id] = marker;
        } catch (err) {
          console.error("Geocode error:", err);
        }
      }
    };

    createMarkers();

    window.naver.maps.Event.addListener(map, "click", () => {
      onSelectHospital?.(null);
    });

    return () => {
      Object.values(markersRef.current).forEach((marker) => marker.setMap(null));
      markersRef.current = {};
      mapInstance.current = null;
    };
  }, [onSelectHospital]);

  return <div ref={mapRef} className="loc-map_canvas" style={{ width: "100%", height: "100%" }} />;
}
