import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  membershipTier: string
  verified: boolean
}

interface Match {
  id: string
  user: {
    id: string
    name: string
    age: number
    photo?: string
  }
  compatibility: number
  matchedAt: string
}

interface AppState {
  // User state
  user: User | null
  setUser: (user: User | null) => void
  
  // Matches state  
  matches: Match[]
  setMatches: (matches: Match[]) => void
  addMatch: (match: Match) => void
  
  // UI state
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  
  // Demo mode
  isDemoMode: boolean
  setDemoMode: (demo: boolean) => void
  
  // Notifications
  notifications: Array<{
    id: string
    type: 'match' | 'message' | 'like'
    message: string
    timestamp: Date
  }>
  addNotification: (notification: Omit<AppState['notifications'][0], 'id'>) => void
  removeNotification: (id: string) => void
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // User state
      user: null,
      setUser: (user) => set({ user }),
      
      // Matches state
      matches: [],
      setMatches: (matches) => set({ matches }),
      addMatch: (match) => set((state) => ({ 
        matches: [match, ...state.matches] 
      })),
      
      // UI state
      isLoading: false,
      setIsLoading: (isLoading) => set({ isLoading }),
      
      // Demo mode
      isDemoMode: true, // 포트폴리오용으로 기본 활성화
      setDemoMode: (isDemoMode) => set({ isDemoMode }),
      
      // Notifications
      notifications: [],
      addNotification: (notification) => set((state) => ({
        notifications: [
          {
            ...notification,
            id: Date.now().toString(),
          },
          ...state.notifications
        ]
      })),
      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      })),
    }),
    {
      name: 'aura-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isDemoMode: state.isDemoMode 
      })
    }
  )
)