import { create } from "zustand";
import { persist } from "zustand/middleware";
import idbStorage from "@utils/idbstorage";

export interface DeadlockState {
  selectedPreset: string;
  enabledAddons: string[];
  videoOverrides: Record<string, string>;
  installStatus: "idle" | "installing" | "success" | "error";
  installError: string;
  setSelectedPreset: (id: string) => void;
  toggleAddon: (id: string) => void;
  setVideoOverride: (key: string, value: string) => void;
  resetVideoOverrides: () => void;
  setInstallStatus: (status: DeadlockState["installStatus"], error?: string) => void;
}

const persistence = idbStorage(
  "deadlock",
  1,
  (state: any) => state,
  ["selectedPreset", "enabledAddons", "videoOverrides"],
);

export const useDeadlockStore = create<DeadlockState>()(persist(
  (set) => ({
    selectedPreset: "optilock",
    enabledAddons: ["black-skybox", "optimized-soul"],
    videoOverrides: {},
    installStatus: "idle",
    installError: "",
    setSelectedPreset: (id) => set({ selectedPreset: id }),
    toggleAddon: (id) => set((s) => ({
      enabledAddons: s.enabledAddons.includes(id)
        ? s.enabledAddons.filter((a) => a !== id)
        : [...s.enabledAddons, id],
    })),
    setVideoOverride: (key, value) => set((s) => ({
      videoOverrides: { ...s.videoOverrides, [key]: value },
    })),
    resetVideoOverrides: () => set({ videoOverrides: {} }),
    setInstallStatus: (status, error = "") => set({ installStatus: status, installError: error }),
  }),
  persistence as any,
));