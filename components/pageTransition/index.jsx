import { motion } from "framer-motion";
import HoveringLogo from "./../loaders/hoveringLogo/index";

const style = {
  backgroundColor: "white",
  position: "fixed",
  width: "100vw",
  height: "100vh",
  zIndex: "10000",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function PageTransition() {
  return (
    <motion.div exit={{ opacity: 0 }} style={style}>
      <HoveringLogo />
    </motion.div>
  );
}

export default PageTransition;
