"use client";
import { SendEmailButton } from "../../components/button";
import { AnimatedPixelText } from "../../components/animatedPixelText";
export const InterviewScreen = () => {
  return (
    <div className="w-screen h-screen animated-background bg-cover bg-center">
      <div className="h-full w-full xl:p-[1.5vw] p-[3vw]">
        <div className="flex flex-col items-center justify-center h-full border-[0.1vw] xl:rounded-[2vw] rounded-[4vw] border-[#00D084] bg-black/10">
          <h1 className="text-white text-center xl:text-[3vw] text-[5vw] font-extrabold xl:leading-[5vw] leading-[12vw] uppercase">
            Trade the future {''}
            <span className="text-[#00D084] xl:text-[4vw] text-[8vw]">smarter</span> and {''}
            <span className="text-[#00D084] xl:text-[4vw] text-[8vw]">faster</span>
          </h1>
          <AnimatedPixelText delayMultiplier={0.1} text="with Agent CAST" className="text-center xl:text-[7.8vw] text-[14vw] xl:leading-[5vw] leading-[12vw] font-bold uppercase tracking-[0.4vw]" />
          <h3 className="font-kode-mono text-[#A0A0A0] text-center xl:pt-[3vw] pt-[5vw] xl:text-[1.4vw] text-[3vw] font-thin">
            Your best online companion for Prediction market
          </h3>
          <SendEmailButton />
        </div>
      </div>
    </div>
  );
};
