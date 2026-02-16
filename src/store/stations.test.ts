import { describe, it, expect, beforeEach } from 'vitest';
import { useStationsStore } from './useStationsStore';

// Mock Data
const mockStations = [
  { id: "1", name: 'Berlin Hbf', city: 'Berlin', latitude: 52.52, longitude: 13.36 },
  { id: "2", name: 'Munich Hbf', city: 'Munich', latitude: 48.13, longitude: 11.55 },
  { id: "3", name: 'Berlin Ost', city: 'Berlin', latitude: 52.51, longitude: 13.43 },
];

describe('Stations Store Logic', () => {
  // Reset the store before each test to ensure a clean state
  beforeEach(() => {
    const store = useStationsStore.getState();
    useStationsStore.setState({ 
      stations: mockStations, 
      filtered: mockStations, 
      city: '', 
      selected: null 
    });
  });

  it('should initialize with all stations', () => {
    const state = useStationsStore.getState();
    expect(state.stations).toHaveLength(3);
    expect(state.filtered).toHaveLength(3);
  });

  it('should filter stations accurately when a city is set', () => {
    const { setCity } = useStationsStore.getState();
    
    // Action: Filter by Berlin
    setCity('Berlin');
    
    const state = useStationsStore.getState();
    expect(state.city).toBe('Berlin');
    expect(state.filtered).toHaveLength(2);
    expect(state.filtered.every(s => s.city === 'Berlin')).toBe(true);
  });

  it('should clear filters correctly', () => {
    const { setCity } = useStationsStore.getState();
    
    setCity('Munich');
    setCity(''); // Clear
    
    const state = useStationsStore.getState();
    expect(state.filtered).toHaveLength(3);
  });

  it('should update the selected station state', () => {
    const { selectStation } = useStationsStore.getState();
    const targetStation = mockStations[1]; // Munich
    
    selectStation(targetStation);
    
    const state = useStationsStore.getState();
    expect(state.selected?.id).toBe("2");
    expect(state.selected?.name).toBe('Munich Hbf');
  });
});