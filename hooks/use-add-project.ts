import { create } from "zustand";

type OpenAddProjectForm = {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
};

export const useOpenAddProjectForm = create<OpenAddProjectForm>((set) => ({
  isOpen: false,
  setOpen: (isOpen: boolean) => set({ isOpen }),
}));
