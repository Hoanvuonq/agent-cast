"use client";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="flex justify-center gap-[4vw] items-center w-full py-[1vw] px-[2vw]">
     <div className="flex flex-col">
     <Link
        href="/"
        className="text-[15vw] leading-[12vw] font-bold pixel-text"
      >
        Get early access
      </Link>
      <p className="text-[1vw] font-bold text-white">©2025 → Agent Cast</p>
     </div>
      <img src="/images/button/footer-button.png" alt="footer-button" className="w-[6vw] h-[6vw] mt-[2vw] hover-button" />
    </footer>
  );
};
