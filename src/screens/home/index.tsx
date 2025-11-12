"use client";
import Header from "@/src/components/header";
import CardComponent from "@/src/components/card";
import { Footer } from "@/src/components";
import AgentCast from "@/src/components/agentCast";

export const HomeScreen = () => {
  return (
    <div className="relative">
      <img
        src="/images/background/light.png"
        alt="Background Light"
        className="animated-rotating-light"
      />

      <div className="w-full min-h-screen bg-cover bg-center background relative overflow-y-hidden flex flex-col">
        <Header />
        <main className="flex-1 px-4 md:px-8 lg:px-12 py-4">
          <AgentCast />
          <CardComponent />
        </main>
        <Footer />
      </div>
    </div>
  );
};