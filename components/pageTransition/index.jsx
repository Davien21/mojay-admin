import { motion } from "framer-motion";
import HoveringLogo from "./../loaders/hoveringLogo/index";
import Head from "next/head";

const style = {
  backgroundColor: "white",
  position: "fixed",
  width: "100vw",
  height: "100vh",
  zIndex: "var(--loader-z-index)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function PageTransition() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="The Mojay Admin Dashboard." />
        <title>Loading...</title>
      </Head>
      <motion.div exit={{ opacity: 0 }} style={style}>
        <HoveringLogo />
      </motion.div>
    </>
  );
}

export default PageTransition;
