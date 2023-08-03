import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type AuthStore = {
    token: string | null
    isLoggedIn: boolean
    login: (token: string, remember: boolean) => void
    logout: () => void
}

export const useAuth = create(
    persist<AuthStore>(
        (set) => ({
            token: null,
            isLoggedIn: false,
            login: (token, remember) => set({ token, isLoggedIn: remember }),
            logout: () => set({ token: null, isLoggedIn: false }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
        })
)
