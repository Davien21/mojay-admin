import { createContext, useContext, useState } from "react";

const toastContext = createContext();

export function ToastProvider({ children }) {
  const [isDisplayingToast, setIsDisplayingToast] = useState(false);
  const [toastType, setToastType] = useState("success");
  const [toastMessage, setToastMessage] = useState("Hello");
  const [toastTime, setToastTime] = useState(3000);

  const toast = {
    error: (message, time) => {
      setIsDisplayingToast(true);
      setToastType("error");
      setToastMessage(message);
      setToastTime(time || 3000)
    },
    success: (message, time) => {
      setIsDisplayingToast(true);
      setToastType("success");
      setToastMessage(message);
      setToastTime(time || 3000)
    },
    close: (time) => {
      setIsDisplayingToast(false);
    },
  };

  return (
    <toastContext.Provider
      value={{
        toast,
        toastType,
        setToastType,
        toastMessage,
        setToastMessage,
        isDisplayingToast,
        setIsDisplayingToast,
        toastTime,
        setToastTime,
      }}
    >
      {children}
    </toastContext.Provider>
  );
}

export function useToastContext() {
  const context = useContext(toastContext);

  if (!context)
    throw new Error("useToast must be used inside a `ToastProvider`");

  return context;
}
