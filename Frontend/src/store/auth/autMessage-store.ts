
import { create } from 'zustand';

interface AuthMessageState {
  showMessage: boolean;
  message: string;
  setShowMessage: (show: boolean, message?: string) => void;
}

export const useAuthMessageStore = create<AuthMessageState>((set) => ({
  showMessage: false,
  message: '',
  setShowMessage: (show, message = '') => set({ showMessage: show, message }),
}));
