"use client";
import { SendEmailButton } from "../../components/sendEmailButton";
import { AnimatedPixelText } from "../../components/animatedPixelText";
import ThreeBackground from "@/src/components/threeBackground";
import useScrambleText from "@/hooks/useScrambleText";

export const InterviewScreen = () => {
  const { text: smarterText, handlers: smarterHandlers } =
    useScrambleText("smarter");

  const { text: fasterText, handlers: fasterHandlers } =
    useScrambleText("faster");
  return (
    <div className="w-screen h-screen  bg-cover bg-center">
      <ThreeBackground />
      <div className="h-full w-full xl:p-[1.5vw] p-[3vw]">
        <div className="flex flex-col items-center justify-center h-full ">
          <h1 className="text-white flex items-end justify-center text-center xl:text-[3vw] text-[5vw] font-extrabold xl:leading-[5vw] leading-[12vw] uppercase">
            Trade the future
            <div className="xl:w-[12vw] w-[25vw]">
              <span
                className="text-[#00D084] xl:text-[4vw] text-[8vw] px-[0.5vw]"
                {...smarterHandlers}
              >
                {smarterText}
              </span>
            </div>
            and
            <div className="xl:w-[10vw] w-[20vw]">
              <span
                className="text-[#00D084] xl:text-[4vw] text-[8vw] w-[10vw] px-[0.5vw]"
                {...fasterHandlers}
              >
                {fasterText}
              </span>
            </div>
          </h1>
          <AnimatedPixelText
            delayMultiplier={0.1}
            text="with Agent CAST"
            className="text-center xl:text-[7.8vw] text-[14vw] xl:leading-[5vw] leading-[12vw] font-bold uppercase tracking-[0.4vw]"
          />
          <h3 className="font-kode-mono text-[#A0A0A0] text-center xl:pt-[3vw] pt-[5vw] xl:text-[1.4vw] text-[3vw] font-thin">
            Your best online companion for Prediction market
          </h3>
          <div className="xl:pt-[1vw] pt-[3vw] w-full">
            <SendEmailButton />
          </div>
        </div>
      </div>
    </div>
  );
};
