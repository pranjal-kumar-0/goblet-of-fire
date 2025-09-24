// auth/hooks/useMessage.ts
"use client";
import { useState, useCallback } from "react";
import { MessageType } from "../types";

export function useMessage() {
  const [message, setMessage] = useState<MessageType | null>(null);

  const showMessage = useCallback((text: string, type: 'success' | 'error' = 'success') => {
    setMessage({ text, type });
    
    // Auto-hide message after 5 seconds
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }, []);

  const hideMessage = useCallback(() => {
    setMessage(null);
  }, []);

  return {
    message,
    showMessage,
    hideMessage,
  };
}