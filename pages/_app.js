import "../styles/bootstrap.css";
import "../styles/globals.css";
import "../styles/extra-responsive.css";
import App from "next/app";
import { getCookie } from "../services/cookieService";
import { getData, getCurrentUser } from "../services/dataService";

import { AnimatePresence } from "framer-motion";

import PageTransition from "./../components/pageTransition/index";
import useRouteChangeHandler from "./../hooks/useRouteChangeHandler";
import { DataProvider, useDataContext } from "../contexts/dataContext";
import { AuthProvider } from "../contexts/authContext";
import { useEffect } from "react";
import { LoadingProvider } from "./../contexts/loadingContext";
import { ToastProvider } from "./../contexts/toastContext";
import { Loader } from "../components/Loader";
import { Toast } from "../components/Toasts";

function MyApp({ Component, pageProps, router }) {
  const { routeChanging } = useRouteChangeHandler();
  // const { setData } = useDataContext();
  // useEffect(() => {
  //   setData({ ...pageProps });
  // });

  const route = router.route;

  return (
    <>
      {routeChanging ? (
        <PageTransition />
      ) : (
        <>
          <AnimatePresence exitBeforeEnter>
            <AuthProvider>
              <LoadingProvider>
                <ToastProvider>
                  <DataProvider data={{ ...pageProps }}>
                    <Loader />
                    <Toast />
                    <Component {...pageProps} key={router.route} />
                  </DataProvider>
                </ToastProvider>
              </LoadingProvider>
            </AuthProvider>
          </AnimatePresence>
        </>
      )}
    </>
  );
}

export default MyApp;

// MyApp.getInitialProps = async (appContext) => {
//   const appProps = await App.getInitialProps(appContext);
//   const ctx = appContext.ctx;
//   console.log(appProps);
//   console.log(ctx?.req?.headers?.cookie);

//   if (!ctx.req) return { ...appProps };

//   const token = await getCookie("token", ctx?.req?.headers?.cookie);

//   const allData = await getData(token);
//   const user = await getCurrentUser(token);
//   if (!user.data) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   const response = {
//     allData: allData.data,
//     user: user.data,
//   };
//   Object.assign(appProps.pageProps, response);

//   return { ...appProps };
// };
