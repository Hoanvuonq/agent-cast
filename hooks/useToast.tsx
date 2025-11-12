"use client";
import { toast } from "sonner";

export const useToast = () => {
  const success = (message: string) => {
    toast.dismiss();
    toast.custom(
      () => (
        <div className="flex items-center gap-3 px-5 py-3 rounded-[0.5vw] shadow-lg backdrop-blur-md border border-green-400 bg-black/20 font-bold text-green-100 ">
          <span>{message}</span>
        </div>
      ),
      { duration: 1000 }
    );
  };

  const error = (message: string) => {
    toast.dismiss();
    toast.custom(
      () => (
        <div className="flex items-center gap-3 px-5 py-3 rounded-[0.5vw] shadow-lg backdrop-blur-md border border-red-500 bg-red-300 text-red-100 ">
          <span>{message}</span>
        </div>
      ),
      { duration: 1000 }
    );
  };

  return { success, error };
};
