import useSWR from "swr";
import { useEffect, useState } from "react";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

function useData(token) {
  const [data, setData] = useState(null);

  const fetcher = (url) =>
    fetch(url, {
      headers: { "x-auth-token": token },
    }).then((r) => r.json());

  const { data: allData, error } = useSWR(
    token ? `${backendUrl}/all` : null,
    fetcher
  );

  useEffect(() => {
    if (allData) setData(allData);
  }, [allData]);

  return {
    allData: data,
    isLoading: !error && !data,
    isEmpty: !data?.data,
    isError: error,
  };
}

export { useData };
