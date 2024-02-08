import { create } from 'zustand'
import { UserData } from '@/interfaces';

interface State {
  loading: boolean;
  isAuthenticated: boolean;
  userData: UserData | null;

  setAuthenticated: (isAuthenticated: boolean) => void;
  setData: (userData: UserData | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore  = create<State>((set) => ({
  isAuthenticated: false,
  userData: null,
  loading: false,

  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setData: (userData) => set({ userData }),
  setLoading: (loading) => set({ loading }),
}));