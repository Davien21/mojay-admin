import { useState, useEffect } from "react";
import router from 'next/router';

function useRouteChangeHandler() {
  const [routeChanging, setRouteChanging] = useState(false);

  useEffect(() => {
    const routeChangeStartHandler = () => setRouteChanging(true);

    const routeChangeEndHandler = () => setRouteChanging(false);

    router.events.on("routeChangeStart", routeChangeStartHandler);
    router.events.on("routeChangeComplete", routeChangeEndHandler);
    router.events.on("routeChangeError", routeChangeEndHandler);
    return () => {
      router.events.off("routeChangeStart", routeChangeStartHandler);
      router.events.off("routeChangeComplete", routeChangeEndHandler);
      router.events.off("routeChangeError", routeChangeEndHandler);
    };
  }, []);
  return { routeChanging };
}

export default useRouteChangeHandler;
