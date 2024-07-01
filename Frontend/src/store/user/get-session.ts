import { create } from 'zustand'
import { UserData } from '@/interfaces';
import { persist, createJSONStorage } from 'zustand/middleware'


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

  // Acción para limpiar la sesión
  clearSession: () =>
    set((state) => ({
      userData: null,
      sessionChecked: true,
      loaded: true,
    })),
}));


/* import { create } from 'zustand'
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

 */

/* 
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { UserData } from '@/interfaces';

interface State {
  isAuthenticated: boolean;
  userData: UserData | null;
  sessionChecked: boolean;
  loaded: boolean;
  
  setSessionData: (sessionData: UserData) => void;
  clearSession: () => void;
}

export const useAuthStore = create<State>(persist((set) => ({
  isAuthenticated: false,
  loaded: false,
  userData: null,
  sessionChecked: false,

  // Acción para actualizar el estado de la sesión
  setSessionData: (sessionData) => {
    set((state) => ({
      isAuthenticated: true,
      userData: sessionData,
      sessionChecked: true,
    }));
  },

  // Acción para limpiar la sesión
  clearSession: () => {
    set((state) => ({
      isAuthenticated: false,
      userData: null,
      sessionChecked: true,
    }));
  },
}), {
  name: 'auth-store', // Nombre del almacén para el persist
}));
 */