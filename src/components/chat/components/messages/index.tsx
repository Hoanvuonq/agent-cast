"use client";
import React from "react";
import { ChatInput } from "../chatInput";

const chatData = [
  {
    id: 1,
    sender: "bot",
    text: "Hi, how can I help you today?",
    time: "01:23",
  },
  {
    id: 2,
    sender: "user",
    text: "Hey CAST, odds on AGI by 2028?",
    time: "01:23",
  },
  {
    id: 3,
    sender: "bot",
    text: "Polymarket says 35%- compute scaling's key, but regs could delay. Your bet?",
    time: "01:23",
  },
  {
    id: 4,
    sender: "user",
    text: "Under on 2028, feels undervalued.",
    time: "01:23",
  },
  {
    id: 5,
    sender: "bot",
    text: "Bold! Base sim: 42% chance. Wild card: Quantum boost jumps it to 65%. Hedge ethically?",
    time: "01:23",
  },
];
interface MessageBubbleProps {
  text: string;
  time: string;
  isUser: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  text,
  time,
  isUser,
}) => {
  const alignment = isUser ? "justify-end" : "justify-start";

  return (
    <div className={`w-full flex ${alignment}`}>
      <div
        className="
          flex flex-col gap-1 glass-boxChat font-kode-mono 
          p-3 rounded-lg w-auto max-w-xs md:max-w-xs mb-4
        "
      >
        <p className="text-sm text-white">{text}</p>
        <span className="text-xs text-gray-400">{time}</span>
      </div>
    </div>
  );
};

const Message = () => {
  return (
    <div className="w-full h-full flex flex-col p-[0.8vw]">
      {chatData.map((msg) => (
        <MessageBubble
          key={msg.id}
          text={msg.text}
          time={msg.time}
          isUser={msg.sender === "user"}
        />
      ))}
      <div className="pt-[1vw]">
        <ChatInput />
      </div>
    </div>
  );
};

export default Message;
