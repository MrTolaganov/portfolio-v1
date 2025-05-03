import { create } from "zustand";

type OpenDeleteProjectModal = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const useOpenDeleteProjectModal = create<OpenDeleteProjectModal>(
  (set) => ({
    isOpen: false,
    setIsOpen: (isOpen: boolean) => set({ isOpen }),
  }),
);
