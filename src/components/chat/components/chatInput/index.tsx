"use client";
import { Plus, Paperclip, Globe, ArrowUp } from "lucide-react";
import { GlassButton } from "@/src/components/glassButton";

export const ChatInput = () => {
  return (
    <div className="w-full p-[0.6vw] bg-white/10 backdrop-blur-lg border border-[#00D084]/30 rounded-3xl shadow-lg ">
      <textarea
        placeholder="Ask Agent Cast"
        className="w-full h-16 p-2 bg-transparent text-white text-base font-kode-mono placeholder:text-gray-200 resize-none focus:outline-none"
      />
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-[1vw] text-gray-400">
          <button className="hover:text-white transition-colors cursor-pointer">
            <Plus size={22} />
          </button>
          <button className="hover:text-white transition-colors cursor-pointer">
            <Paperclip size={22} />
          </button>
          <button className="text-white cursor-pointer">|</button>
          <GlassButton className="flex items-center gap-2 px-4 py-2 text-[0.8vw] font-kode-mono font-extralight rounded-full">
            <Globe size={16} />
            Web search
          </GlassButton>
        </div>

        <GlassButton className="p-[0.5vw] rounded-full">
          <ArrowUp size={20} />
        </GlassButton>
      </div>
    </div>
  );
};
