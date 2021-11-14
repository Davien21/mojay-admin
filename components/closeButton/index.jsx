import { motion } from "framer-motion";

const Path = (props) => (
  <motion.path fill="" strokeWidth="3" strokeLinecap="round" {...props} />
);

export const CloseButton = ({ strokeColor, toggle, className, ...rest }) => {
  className
    ? (className = `btn menu_toggle ${className}`)
    : (className = "btn menu_toggle");
  return (
    <button className={className} onClick={toggle}>
      <svg width="18" height="17" viewBox="0 0 18 17" fill="none">
        <path
          d="M2 15.5L16 1.5"
          stroke="black"
          stroke-width="3"
          stroke-linecap="round"
        />
        <path
          d="M2 1.5L16 15.346"
          stroke="black"
          stroke-width="3"
          stroke-linecap="round"
        />
      </svg>

      <svg width="18" height="17" viewBox="0 0 18 17">
        <Path
          stroke={strokeColor ? strokeColor : "hsl(0, 0%, 18%)"}
          d="M 3 16.5 L 17 2.5"
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        />
        <Path
          stroke={strokeColor ? strokeColor : "hsl(0, 0%, 18%)"}
          d="M 3 2.5 L 17 16.346"
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
        />
      </svg>
    </button>
  );
};
