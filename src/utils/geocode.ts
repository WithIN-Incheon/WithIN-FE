const CLIENT_ID = "pvngw60boi";
const CLIENT_SECRET = "pQerQ8RH43mXRUitA0yZS0fv8az2y3AR2NAJ1GR3";

export async function geocodeByRest(address: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const res = await fetch(
      `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(address)}`,
      {
        headers: {
          "X-NCP-APIGW-API-KEY-ID": CLIENT_ID,
          "X-NCP-APIGW-API-KEY": CLIENT_SECRET,
        },
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    const item = data.addresses?.[0];
    if (!item) return null;

    return { lat: parseFloat(item.y), lng: parseFloat(item.x) };
  } catch {
    return null;
  }
}
