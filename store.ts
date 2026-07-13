import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AircraftProject {
  id: string;
  name: string;
  manufacturer: string;
  pax: number;
  mtow: number; // tons
  range: number; // km
  status: 'Draft' | 'Active' | 'Optimizing' | 'Completed' | 'Live Twin';
  lastUpdated: string;
  version: string;
}

export interface Simulation {
  id: string;
  projectId: string;
  name: string;
  type: 'CFD' | 'MDO' | 'Performance' | 'Structural';
  status: 'Queued' | 'Running' | 'Completed' | 'Failed';
  progress: number;
  startedAt: string;
}

type AppState = {
  projects: AircraftProject[];
  simulations: Simulation[];
  activeProjectId: string | null;
  
  addProject: (project: Omit<AircraftProject, 'id' | 'lastUpdated' | 'version'>) => void;
  updateSimulationProgress: (id: string, progress: number) => void;
  setActiveProject: (id: string | null) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      projects: [
        { id: "p1", name: "Baobab-A320", manufacturer: "IA-NASA", pax: 180, mtow: 78, range: 6100, status: "Active", lastUpdated: "2026-07-01", version: "v0.8" },
        { id: "p2", name: "Sahel-Jet", manufacturer: "IA-NASA", pax: 90, mtow: 42, range: 4200, status: "Optimizing", lastUpdated: "2026-07-01", version: "v1.2" },
      ],
      simulations: [],
      activeProjectId: "p1",

      addProject: (project) => set((state) => ({
        projects: [...state.projects, {
          ...project,
          id: `p${Date.now()}`,
          lastUpdated: new Date().toISOString().split('T')[0],
          version: "v0.1"
        }]
      })),

      updateSimulationProgress: (id, progress) => set((state) => ({
        simulations: state.simulations.map(s => 
          s.id === id ? { ...s, progress, status: progress >= 100 ? 'Completed' : 'Running' } : s
        )
      })),

      setActiveProject: (id) => set({ activeProjectId: id }),
    }),
    { name: 'aeroscape-storage' }
  )
);