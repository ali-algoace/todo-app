import { create, StateCreator } from 'zustand';
import { sliceResetFns } from '../utils';

type AuthState = {
  isAuthenticate: boolean;
};

const initialAuthState: AuthState = {
  isAuthenticate: false,
};

export type AuthSlice = AuthState & {
  isAuthenticate: boolean;
  setAuthenticate: (e: boolean) => void;
};

type appStore = AuthSlice;

export const createAuthSlice: StateCreator<AuthSlice> = set => {
  sliceResetFns.add(() => set(initialAuthState));
  return {
    ...initialAuthState,
    setAuthenticate(e) {
      set({ isAuthenticate: e });
    },
  };
};

export const useAuthStore = create<appStore>()((...a) => ({
  ...createAuthSlice(...a),
}));
