"use client";
import ChatComponets from "../chat/chat";
import React from "react";

const features = [
  {
    title: "BET SMARTER WITH CAST",
    description: `Agent CAST identifies from the safest bet to 
      the most degen bet that help you choose your 
      play fitting your character`,
  },
  {
    title: "EVERYTHING IN ONE INTERFACE",
    description:
      "You don't have to click many buttons manually, just chat with Agent CAST, from analysis, market alert your to place limit orders.",
  },
];

const AgentCast = () => {
  return (
    <section
      className="
        bg-black/10 border border-[#00D084] 
        rounded-2xl lg:rounded-3xl 
        overflow-hidden 
        p-6 md:p-8 lg:p-12
      "
    >
      <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-8">
        <div className="flex flex-col w-full lg:w-1/2 lg:pr-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold pixel-text">
            Agent CAST
          </h1>
          <p className="text-base lg:text-lg leading-relaxed font-kode-mono text-gray-300 mt-4">
            Agent CAST is an AI-powered prediction market agent built on Base.
            It positions itself as a smart companion that empowers users to make
            informed bets and trades through conversational AI, data aggregation
            & market analysis, and real-time alerts.
          </p>
        </div>
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
          <ChatComponets />
        </div>
      </div>

      <div className="flex flex-col gap-12 lg:gap-16 pt-16 lg:pt-24 w-[80vw] m-auto">
        {features.map((item, index) => (
          <div
            key={item.title}
            className={`flex gap-[1vw] w-[32vw] ${
              index === 1 ? "md:self-end md:text-start" : "md:self-start"
            }`}
          >
            <hr className="w-1 h-[10vw] bg-[#00D084] border-0 rounded mb-4" />
            <div>
              <h2 className="text-[4vw] leading-[4vw] font-bold uppercase mb-4 text-white">
                {item.title}
              </h2>
              <p className="text-gray-400 text-sm lg:text-base font-kode-mono leading-relaxed w-[21vw]">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AgentCast;
