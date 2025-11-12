"use client";

import { Toaster } from "sonner";

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          classNames: {
            title: "text-white",
            description: "text-white/80",
            actionButton: "bg-[#00D084]/20",
            cancelButton: "bg-zinc-700",
            error: "border-red-500 text-red-400",
          },
        }}
      />
    </>
  );
};
