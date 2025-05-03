"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { deleteProject } from "@/actions/project.action";
import { toast } from "sonner";
import { IProject } from "@/types";
import { useOpenDeleteProjectModal } from "@/hooks/use-delete-project";

interface Props {
  deletedProject: IProject;
  setDeletedProject: (deletedProject: IProject | null) => void;
}

export default function DeleteProjectForm({
  deletedProject,
  setDeletedProject,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, setIsOpen } = useOpenDeleteProjectModal();

  const onDeleteProject = async () => {
    setIsLoading(true);

    const { status, message } = await deleteProject(deletedProject._id);

    if (status === 200) {
      toast.success(message);
    } else {
      toast.error(message);
    }

    setIsLoading(false);
    setIsOpen(false);
    setDeletedProject(null);
  };

  const onCloseAlertDialog = () => {
    setIsOpen(false);
    setDeletedProject(null);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onCloseAlertDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure to want to delete this {deletedProject.name}{" "}
            project?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            project and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading} onClick={onCloseAlertDialog}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={isLoading} onClick={onDeleteProject}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
