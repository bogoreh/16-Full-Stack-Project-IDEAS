import { create } from 'zustand';

export const usePlayerStore = create((set) => ({
  currentTrack: null,
  isPlaying: false,
  queue: [],
  setCurrentTrack: (track) => set({ currentTrack: track }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  addToQueue: (item) => set((state) => ({ queue: [...state.queue, item] })),
}));