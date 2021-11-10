import { createContext, useContext, useState } from "react";

const authContext = createContext();

export function AuthProvider({ children }) {
  return (
    <authContext.Provider value={{ validUser: null }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(authContext);

  if (!context) throw new Error("useAuth must be used inside a `AuthProvider`");

  return context;
}
