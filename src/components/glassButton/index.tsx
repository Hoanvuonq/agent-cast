import React from "react";

// Định nghĩa props
interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`
       glass-button
        ${className}
      `}
    >
      {children}
    </button>
  );
};
