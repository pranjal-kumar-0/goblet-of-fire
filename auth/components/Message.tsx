// auth/components/Message.tsx
import React from "react";
import { MessageType } from "../types";

interface MessageProps {
  message: MessageType | null;
  onClose: () => void;
}

export function Message({ message, onClose }: MessageProps) {
  if (!message) return null;

  const baseClasses = "flex items-center justify-between mb-4 px-4 py-3 rounded-lg font-['Cinzel_Decorative'] border-2 shadow-lg";
  const typeClasses = message.type === 'success' 
    ? "bg-green-900/80 text-green-200 border-green-600 shadow-[0_0_15px_rgba(0,255,0,0.3)]"
    : "bg-red-900/80 text-red-200 border-red-600 shadow-[0_0_15px_rgba(255,0,0,0.3)]";

  return (
    <div className={`${baseClasses} ${typeClasses}`}>
      <span className="flex items-center">
        {message.type === 'success' ? '✨ ' : '⚡ '}
        {message.text}
      </span>
      <button 
        onClick={onClose}
        className="ml-2 text-xl leading-none hover:opacity-70 transition-opacity"
      >
        ×
      </button>
    </div>
  );
}