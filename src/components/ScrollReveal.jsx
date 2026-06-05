import { motion } from "motion/react";

const ScrollReveal = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: delay,
        duration: 0.6
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
