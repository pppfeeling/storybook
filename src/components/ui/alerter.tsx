import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { create } from "zustand";

interface AlertInfo {
  opened?: boolean;
  title: string;
  content?: string;
  fnAfterProc: (type: string, detailInfo: {}) => void;
}

type AlertState = {
  alertInfo: AlertInfo;
  openAlert: (info: AlertInfo) => void;
  closeAlert: () => void;
};

const useStore = create<AlertState>((set) => ({
  alertInfo: { opened: false, title: "", content: "", fnAfterProc: () => {} },

  openAlert: (info) =>
    set((state) => ({
      alertInfo: { ...state.alertInfo, ...info, opened: true },
    })),
  closeAlert: () =>
    set((state) => ({ alertInfo: { ...state.alertInfo, opened: false } })),
}));

export function Alerter() {
  const [alertInfo, closeAlert] = useStore((state) => [
    state.alertInfo,
    state.closeAlert,
  ]);

  const closeDialog = () => {
    alertInfo.fnAfterProc("close", {});
  };

  return (
    <AlertDialog
      open={alertInfo.opened}
      onOpenChange={() => {
        closeAlert();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertInfo.title}</AlertDialogTitle>
          {alertInfo.content && (
            <AlertDialogDescription>{alertInfo.content}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={closeDialog}>cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function useAlert() {
  const openAlert = useStore((state) => state.openAlert);

  return openAlert;
}
