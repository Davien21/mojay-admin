import "../styles/bootstrap.css";
import "../styles/globals.css";
import "../styles/extra-responsive.css";

import { AnimatePresence } from "framer-motion";

import PageTransition from "./../components/pageTransition/index";
import useRouteChangeHandler from "./../hooks/useRouteChangeHandler";
import { DataProvider, useDataContext } from "../contexts/dataContext";
import { AuthProvider } from "../contexts/authContext";
import { useEffect } from "react";
import {
  LoadingProvider,
  useLoadingContext,
} from "./../contexts/loadingContext";
import { ToastProvider } from "./../contexts/toastContext";
import { Loader } from "../components/Loader";
import { Toast } from "../components/Toasts";

function MyApp({ Component, pageProps, router }) {
  const { routeChanging } = useRouteChangeHandler();

  // const { setData } = useDataContext();
  // useEffect(() => {
  //   setData({ ...pageProps });
  // });
  const freeRoutes = ["/signup", "/login"];
  const route = router.route;

  return (
    <>
      {routeChanging ? (
        <PageTransition />
      ) : (
        <>
          <AnimatePresence exitBeforeEnter>
            <LoadingProvider>
              <ToastProvider>
                {freeRoutes[route] && (
                  <>
                    <Loader />
                    <Toast />
                    <Component {...pageProps} key={router.route} />
                  </>
                )}
                {!freeRoutes[route] && (
                  <DataProvider>
                    <Loader />
                    <Toast />
                    <Component {...pageProps} key={router.route} />
                  </DataProvider>
                )}
              </ToastProvider>
            </LoadingProvider>
          </AnimatePresence>
        </>
      )}
    </>
  );
}

export default MyApp;
