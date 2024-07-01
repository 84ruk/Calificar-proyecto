import create from 'zustand';

interface AlertState {
  showAlert: boolean;
  setShowAlert: (show: boolean) => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  showAlert: false,
  setShowAlert: (show) => set({ showAlert: show }),
}));
