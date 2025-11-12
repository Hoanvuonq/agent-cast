import { PropsWithChildren } from "react";
import "./globals.css";

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en" data-theme="white">
      <head>
        <link
          rel="shortcut icon"
          href="/favicon/favicon.ico"
          type="image/x-icon"
        />
        <title>Agent CAST</title>
        <meta
          name="description"
          content="Agent CAST is a smart, secure assistant powered by GPT-4o, designed to simplify and streamline cross-chain token swaps through natural, human-like conversation. Instead of navigating multiple DEXs, bridges, and tools, users can interact with Swolo using everyday language to swap tokens, check real-time prices, and validate smart contracts for safety. The system intelligently parses intent into structured commands, connects with trusted aggregators like Uniswap, LI.FI, and Stargate, and prepares secure transactions for the user to review and sign. Every action is simulated and risk-checked before execution, ensuring maximum transparency and safety. With a clean, unified interface and AI-driven logic, Swolo empowers both casual and professional DeFi traders to move faster, trade smarter, and stay safer - all with one seamless experience."
        />
      </head>
      <body className="relative bg-main-background">
        <main>{children}</main>
      </body>
    </html>
  );
}

export default RootLayout;