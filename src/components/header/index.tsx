"use client";
import React from "react"; 
import Link from "next/link"; 
import { GlassButton } from "../glassButton";

const menuItems = [
  { label: "Menu Button 1", href: "/menu1" },
  { label: "Menu Button 2", href: "/menu2" },
  { label: "Menu Button 3", href: "/menu3" },
  { label: "Menu Button 4", href: "/menu4" },
  { label: "Join The Waitlist", href: "/waitlist", isPrimary: true },
];

const HeaderComponent = () => {
  return (
    <header className="flex justify-between items-center w-full py-[1vw] px-[2vw]">
      <Link href="/" className="text-[3vw] lg:text-[2.5vw] font-bold pixel-text">
        Agent Cast
      </Link>

      <nav className="flex gap-[2vw] lg:gap-[1vw] items-center">
        {menuItems.map((item) => (
          <GlassButton
            key={item.label}
            className={item.isPrimary ? "bg-[#00D084]/25 py-[0.5vw] px-[1vw] font-bold text-[1vw] uppercase" : "py-[0.5vw] px-[1vw] font-bold text-[1vw] uppercase"} 
          >
            {item.label}
          </GlassButton>
        ))}
      </nav>
    </header>
  );
};

export const Header = React.memo(HeaderComponent);

export default Header; 