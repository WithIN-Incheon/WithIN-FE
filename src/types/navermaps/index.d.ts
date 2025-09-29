export {};

declare global {
  namespace naver {
    namespace maps {
      class Map {
        constructor(el: HTMLElement, opts?: {
          center?: LatLng; zoom?: number; [key: string]: unknown;
        });
        setCenter(latlng: LatLng): void;
        setZoom(level: number, withTransition?: boolean): void;
      }

      class LatLng { constructor(lat: number, lng: number); }
      class Size { constructor(width: number, height: number); width: number; height: number; }
      class Point { constructor(x: number, y: number); x: number; y: number; }

      type MarkerIcon = {
        url: string;
        size?: Size;
        scaledSize?: Size;
        origin?: Point;
        anchor?: Point;
      };

      class Marker {
        constructor(opts: {
          position: LatLng;
          map?: Map | null;
          icon?: MarkerIcon;
          zIndex?: number;
          [key: string]: unknown;
        });
        setMap(m: Map | null): void;
        setIcon(icon: MarkerIcon): void;           // ⬅ 추가
        getPosition(): LatLng;                     // ⬅ 추가
      }

      class Circle {
        constructor(opts: {
          map?: Map | null; center: LatLng; radius: number;
          fillColor?: string; fillOpacity?: number; strokeWeight?: number; zIndex?: number;
          [key: string]: unknown;
        });
      }

      class CustomOverlay {
        getElement(): HTMLElement | null {
          throw new Error("Method not implemented.");
        }
        constructor(opts: {
          position: LatLng; content: string | HTMLElement;
          map?: Map | null; xAnchor?: number; yAnchor?: number; zIndex?: number;
          [key: string]: unknown;
        });
        setMap(m: Map | null): void;
      }

      namespace Event {
        function addListener(
          instance: unknown,
          eventName: string,
          listener: (...args: unknown[]) => void
        ): void;
      }

      namespace Service {
        interface GeocodeAddress { x: string; y: string; [key: string]: unknown; }
        interface GeocodeResponse { v2?: { addresses?: GeocodeAddress[]; [k: string]: unknown }; [k: string]: unknown; }
        enum Status { OK = "OK", ERROR = "ERROR", ZERO_RESULT = "ZERO_RESULT" }
        type GeocodeCallback = (status: Status, response: GeocodeResponse) => void;
        function geocode(opts: { query: string }, callback: GeocodeCallback): void;
      }
    }
  }

  interface Window { naver: typeof naver; }
}
