import { createContext, useContext, useEffect, useState } from "react";
import { useData } from "../hooks/useData";
import { useRouter } from "next/router";
import httpService from "../services/httpService";

const dataContext = createContext();

export function DataProvider({ children }) {
  const router = useRouter();
  const route = router.route;
  const [token, setToken] = useState(null);
  const [isInitiallyFetched, setIsInitiallyFetched] = useState(false);

  useEffect(() => {
    if (isInitiallyFetched) return;
    const token = localStorage.getItem("token");
    setToken(token);
    httpService.setJwt(token);
    setIsInitiallyFetched(true);
  }, [isInitiallyFetched]);

  useEffect(() => {
    if (!isInitiallyFetched) return;
    if (!token && route !== "/login") router.push("/login");
  });

  const { mutate, allData, isLoading, isError, isEmpty } = useData(token);

  return (
    <dataContext.Provider
      value={{
        allData: allData?.data,
        isLoading,
        isError,
        isEmpty,
        mutate
      }}
    >
      {children}
    </dataContext.Provider>
  );
}

export function useDataContext() {
  const context = useContext(dataContext);

  if (!context) throw new Error("useData must be used inside a `DataProvider`");

  return context;
}
