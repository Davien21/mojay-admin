import useSWR from "swr";
import { useEffect, useState } from "react";
import httpService from "../services/httpService";
import { apiErrorMessage } from "./../utils/handleAPIErrors";
import { useToastContext } from "../contexts/toastContext";
import { useRouter } from "next/router";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

function useData(token) {
  const initialState = { data: { media: [], news: [], users: [] } };
  const router = useRouter();
  const [data, setData] = useState(null);
  const { toast } = useToastContext();

  const fetcher = async (url) => {
    try {
      let data = await httpService.get(url);
      data = await data.data;
      return data;
    } catch (error) {
      if (router.route === "/login" || router.route === "/signup") return;
      const message = apiErrorMessage(error);
      toast.error(message);
      setTimeout(() => {
        if (error.response.status === 401) router.push("/login");
      }, 4500);
    }
  };

  const {
    data: allData,
    error,
    mutate,
  } = useSWR(token ? `${backendUrl}/all` : null, fetcher);

  useEffect(() => {
    if (allData) setData(allData);
    console.log(allData);
  }, [allData]);

  return {
    allData: data || initialState,
    isLoading: !error && !data,
    isEmpty: !data?.data,
    isError: error,
    mutate,
  };
}

export { useData };
