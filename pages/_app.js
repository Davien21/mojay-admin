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
import Head from "next/head";
import { deslugify } from "./../utils/deslugify";

function MyApp({ Component, pageProps, router }) {
  const { routeChanging } = useRouteChangeHandler();

  // const { setData } = useDataContext();
  // useEffect(() => {
  //   setData({ ...pageProps });
  // });
  const freeRoutes = ["/signup", "/login"];
  const route = router.route;
  const title = deslugify(route);

  return (
    <>
      {routeChanging ? (
        <>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta name="description" content="The Mojay Admin Dashboard." />
            <title>Loading...</title>
          </Head>
          <PageTransition />
        </>
      ) : (
        <>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta name="description" content="The Mojay Admin Dashboard." />
            <title>Mojay Admin | {title}</title>
          </Head>
          <AnimatePresence exitBeforeEnter>
            <LoadingProvider>
              <ToastProvider>
                <DataProvider>
                  <Loader />
                  <Toast />
                  <Component {...pageProps} key={router.route} />
                </DataProvider>
              </ToastProvider>
            </LoadingProvider>
          </AnimatePresence>
        </>
      )}
    </>
  );
}

export default MyApp;
