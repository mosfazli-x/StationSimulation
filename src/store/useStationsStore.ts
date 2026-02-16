import { create } from "zustand";
import { fetchStations } from "../api/stationsApi";
import type { Station } from "../types/station";

interface Store {
    stations: Station[];
    filtered: Station[];
    loading: boolean;
    error: string | null;
    city: string;
    selected: Station | null;

    fetchAll: () => Promise<void>;
    setCity: (city: string) => void;
    selectStation: (s: Station) => void;
}

export const useStationsStore = create<Store>((set, get) => ({
    stations: [],
    filtered: [],
    loading: false,
    error: null,
    city: "",
    selected: null,

    fetchAll: async () => {
        set({ loading: true });
        try {
            const data = await fetchStations();

            const normalized = data.map((s: any, i: number) => ({
                id: s.id ?? i,
                name: s.name,
                city: s.city,
                latitude: Number(s.lat ?? s.lat),
                longitude: Number(s.lng ?? s.lon)
            }));
            set({
                stations: normalized,
                filtered: normalized,
                loading: false
            });
        } catch {
            set({ error: "Failed to load stations", loading: false });
        }
    },

    setCity: (city) => {
        const all = get().stations;
        const filtered = all.filter(s =>
            s.city.toLowerCase().includes(city.toLowerCase())
        );

        set({ city, filtered });
    },

    selectStation: (s) => set({ selected: s })
}));
