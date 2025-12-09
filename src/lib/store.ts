import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface Task {
  id: string
  title: string
  completed: boolean
}

export interface Project {
  id: string
  title: string
  description?: string
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
  status: 'todo' | 'in-progress' | 'done'
  tasks: Task[]
  owner: string
  members: string[]
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
  updateProject: (id: string, updates: Partial<Project>) => void
  moveProject: (id: string, status: Project['status']) => void
  
  addTask: (projectId: string, taskTitle: string) => void
  toggleTask: (projectId: string, taskId: string) => void
  deleteTask: (projectId: string, taskId: string) => void

  addTeamMember: (member: TeamMember) => void
  removeTeamMember: (id: string) => void
  
  // Project Member Actions
  addProjectMember: (projectId: string, memberName: string) => void
  removeProjectMember: (projectId: string, memberName: string) => void

  // Auction Actions
  addAuction: (auction: Auction) => void
  placeBid: (auctionId: string, bidder: string, amount: number) => void

  addNotification: (message: string) => void
  clearNotifications: () => void

  spendCoins: (amount: number) => boolean
  addXp: (amount: number) => void
  addCoins: (amount: number) => void
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: {
        name: "Demo User",
        coins: 1250,
        xp: 4500,
        level: 12,
        role: 'Admin'
      },
      projects: [
        { 
          id: '1', 
          title: 'Neon Dashboard', 
          description: 'Revamping the main HUD with cyberpunk aesthetics.',
          priority: 'high',
          dueDate: '2025-05-01',
          status: 'in-progress', 
          tasks: [
            { id: 't1', title: 'Design Component Library', completed: true },
            { id: 't2', title: 'Integrate Recharts', completed: false }
          ],
          owner: 'Demo User',
          members: ['Demo User', 'Cipher', 'Glitch']
        },
        { 
          id: '2', 
          title: 'Cyber Auth', 
          description: 'Implementing biometric logic for login.',
          priority: 'medium',
          status: 'done', 
          tasks: [
             { id: '2a', title: 'Setup Clerk', completed: true }
          ],
          owner: 'Cipher',
          members: ['Cipher', 'Pixel']
        },
        { 
          id: '3', 
          title: 'API Gateway', 
          description: 'Setting up the main backend entry point.',
          priority: 'low',
          status: 'todo', 
          tasks: [],
          owner: 'Demo User', 
          members: ['Demo User']
        },
      ],
      teamMembers: [
        { id: '1', name: "Cipher", role: "Leader", status: "online", avatar: "/avatars/01.png" },
        { id: '2', name: "Glitch", role: "Member", status: "busy", avatar: "/avatars/02.png" },
        { id: '3', name: "Pixel", role: "Member", status: "offline", avatar: "/avatars/03.png" },
      ],
      notifications: [],

      addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
      removeProject: (id) => set((state) => ({ projects: state.projects.filter((p) => p.id !== id) })),
      updateProject: (id, updates) => set((state) => ({
        projects: state.projects.map((p) => p.id === id ? { ...p, ...updates } : p)
      })),
      moveProject: (id, status) => set((state) => ({
        projects: state.projects.map((p) => (p.id === id ? { ...p, status } : p))
      })),

      addTask: (projectId, taskTitle) => set((state) => ({
        projects: state.projects.map(p => {
          if (p.id !== projectId) return p;
          const newTask: Task = {
            id: Math.random().toString(36).substr(2, 9),
            title: taskTitle,
            completed: false
          };
          return { ...p, tasks: [...p.tasks, newTask] };
        })
      })),

      toggleTask: (projectId, taskId) => set((state) => ({
        projects: state.projects.map(p => {
          if (p.id !== projectId) return p;
          return {
            ...p,
            tasks: p.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
          };
        })
      })),

      deleteTask: (projectId, taskId) => set((state) => ({
        projects: state.projects.map(p => {
          if (p.id !== projectId) return p;
          return { ...p, tasks: p.tasks.filter(t => t.id !== taskId) };
        })
      })),

      addTeamMember: (member) => set((state) => ({ teamMembers: [...state.teamMembers, member] })),
      removeTeamMember: (id) => set((state) => ({ teamMembers: state.teamMembers.filter((m) => m.id !== id) })),

      addProjectMember: (projectId, memberName) => set((state) => ({
        projects: state.projects.map(p => {
          if (p.id !== projectId || p.members.includes(memberName)) return p;
          return { ...p, members: [...p.members, memberName] };
        })
      })),

      removeProjectMember: (projectId, memberName) => set((state) => ({
        projects: state.projects.map(p => {
          if (p.id !== projectId) return p;
          return { ...p, members: p.members.filter(m => m !== memberName) };
        })
      })),

      addAuction: (auction) => set((state) => ({ auctions: [...state.auctions, auction] })),
      
      placeBid: (auctionId, bidder, amount) => set((state) => ({
        auctions: state.auctions.map(a => {
          if (a.id !== auctionId) return a;
          if (amount <= a.currentBid) return a; // Security check
          return { 
            ...a, 
            currentBid: amount,
            bids: a.bids + 1 
          };
        })
      })),

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
    }),
    {
      name: 'team-collab-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
