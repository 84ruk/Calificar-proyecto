import { create } from 'zustand'
import { UserData } from '@/interfaces';


interface State {
  isAuthenticated: boolean;
  userData: UserData | null;
  sessionChecked: boolean,
  loaded: boolean;

  setSessionData: (sessionData) => void;
  clearSession: () => void;
}

export const useAuthStore = create<State>((set) => ({
  isAuthenticated: false,
  loaded: false,
  userData: null,
  sessionChecked: false, // Nuevo estado para indicar si la sesión ha sido verificada

  // Acción para actualizar el estado de la sesión
  setSessionData: (sessionData) =>
    set((state) => ({
      isAuthenticated: true,
      userData: sessionData,
      sessionChecked: true,
      loaded: true,
    })),

  clearSession: () =>
    set(() => ({
      isAuthenticated: false,
      userData: null,
      sessionChecked: true,
      loaded: true,
    })),
}));
