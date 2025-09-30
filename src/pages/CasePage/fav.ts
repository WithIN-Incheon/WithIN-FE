const KEY = "case_favs_v1";

export function loadFavs(): number[] {
  try {
    const raw = localStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch { return []; }
}

export function saveFavs(ids: number[]) {
  localStorage.setItem(KEY, JSON.stringify(ids));
}

export function toggleFav(id: number) {
  const set = new Set(loadFavs());
  if (set.has(id)) {
    set.delete(id);
  } else {
    set.add(id);
  }
  const out = Array.from(set);
  saveFavs(out);
  return out;
}

export function isFav(id: number) {
  return loadFavs().includes(id);
}
