export async function fetchStations() {
    const res = await fetch(import.meta.env.VITE_STATIONS_URL);
    if (!res.ok) {
        throw new Error("Failed to fetch stations");
    }

    return res.json();
}
