import { create } from "zustand";

type OpenEditProjectForm = {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
};

export const useOpenEditProjectForm = create<OpenEditProjectForm>((set) => ({
  isOpen: false,
  setOpen: (isOpen: boolean) => set({ isOpen }),
}));
