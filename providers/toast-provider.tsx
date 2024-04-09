import { Toast } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";
import { FunctionComponent } from "react";

interface ToastProviderProps {}

const ToastProvider: FunctionComponent<ToastProviderProps> = () => {
  return <Toaster />;
};

export default ToastProvider;
