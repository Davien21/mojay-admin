import { motion } from "framer-motion";

import { MojayFavicon } from "../../../assets";

function HoveringLogo() {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{
        y: 20,
        transition: {
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
        },
      }}
      style={{ marginTop: "-13%" }}
    >
      <MojayFavicon width={77} height={84} />
    </motion.div>
  );
}

export default HoveringLogo;
