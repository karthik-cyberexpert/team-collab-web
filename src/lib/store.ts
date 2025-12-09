import { create } from 'zustand'

export interface Project {
  id: string
  title: string
  status: 'todo' | 'in-progress' | 'done'
  tasks: number
  users: number
}

export interface TeamMember {
  id: string
  name: string
  role: 'Leader' | 'Member' | 'Admin'
  status: 'online' | 'offline' | 'busy'
  avatar: string
}

export interface UserState {
  name: string
  coins: number
  xp: number
  level: number
  role: 'Admin' | 'Leader' | 'Member' | 'User'
}

interface AppState {
  user: UserState
  projects: Project[]
  teamMembers: TeamMember[]
  notifications: string[]
  
  // Actions
  addProject: (project: Project) => void
  removeProject: (id: string) => void
  moveProject: (id: string, status: Project['status']) => void
  
  addTeamMember: (member: TeamMember) => void
  removeTeamMember: (id: string) => void
  
  addNotification: (message: string) => void
  clearNotifications: () => void

  spendCoins: (amount: number) => boolean
  addXp: (amount: number) => void
  addCoins: (amount: number) => void
}

export const useStore = create<AppState>((set, get) => ({
  user: {
    name: "Demo User",
    coins: 1250,
    xp: 4500,
    level: 12,
    role: 'Admin'
  },
  projects: [
    { id: '1', title: 'Neon Dashboard', status: 'in-progress', tasks: 12, users: 3 },
    { id: '2', title: 'Cyber Auth', status: 'done', tasks: 8, users: 2 },
    { id: '3', title: 'API Gateway', status: 'todo', tasks: 5, users: 1 },
  ],
  teamMembers: [
    { id: '1', name: "Cipher", role: "Leader", status: "online", avatar: "/avatars/01.png" },
    { id: '2', name: "Glitch", role: "Member", status: "busy", avatar: "/avatars/02.png" },
    { id: '3', name: "Pixel", role: "Member", status: "offline", avatar: "/avatars/03.png" },
  ],
  notifications: [],

  addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  removeProject: (id) => set((state) => ({ projects: state.projects.filter((p) => p.id !== id) })),
  moveProject: (id, status) => set((state) => ({
    projects: state.projects.map((p) => (p.id === id ? { ...p, status } : p))
  })),

  addTeamMember: (member) => set((state) => ({ teamMembers: [...state.teamMembers, member] })),
  removeTeamMember: (id) => set((state) => ({ teamMembers: state.teamMembers.filter((m) => m.id !== id) })),

  addNotification: (message) => set((state) => ({ notifications: [message, ...state.notifications] })),
  clearNotifications: () => set({ notifications: [] }),

  spendCoins: (amount) => {
    const { user } = get()
    if (user.coins >= amount) {
        set((state) => ({ user: { ...state.user, coins: state.user.coins - amount } }))
        return true
    }
    return false
  },
  addXp: (amount) => set((state) => {
      const newXp = state.user.xp + amount
      const newLevel = Math.floor(Math.sqrt(newXp / 100)) + 1 // Basic Level Formula
      
      return { 
          user: { 
              ...state.user, 
              xp: newXp,
              level: newLevel
          } 
      }
  }),
  addCoins: (amount: number) => set((state) => ({ user: { ...state.user, coins: state.user.coins + amount } }))
}))
