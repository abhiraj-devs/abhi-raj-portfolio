import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

function Navigation({ activeHref, setActiveHref, setIsOpen, isMobile = false }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <motion.ul 
      className={`flex flex-col sm:flex-row items-center relative w-full sm:w-auto ${isMobile ? 'gap-2' : 'gap-1 sm:gap-2'}`}
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } }
      }}
    >
      {navItems.map((item, index) => {
        const isActive = activeHref === item.href;
        const isHovered = hoveredIndex === index;

        return (
          <motion.li 
            key={item.name} 
            variants={isMobile ? { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } } : {}}
            className="relative w-full sm:w-auto text-center"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Hover Background Pill */}
            <AnimatePresence>
              {isHovered && !isActive && (
                <motion.div
                  layoutId={isMobile ? "hover-nav-pill-mobile" : "hover-nav-pill-desktop"}
                  className={`absolute inset-0 bg-white/5 pointer-events-none border border-white/5 ${isMobile ? 'rounded-2xl' : 'rounded-full'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "tween", ease: "circOut", duration: 0.3 }}
                />
              )}
            </AnimatePresence>

            <motion.a
              whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveHref(item.href);
                if (setIsOpen) setIsOpen(false);
              }}
              className={`relative z-10 font-medium px-5 transition-colors duration-300 block w-full
                ${isMobile ? 'text-lg py-4 rounded-2xl' : 'text-base py-2 rounded-full'}
                ${isActive 
                  ? 'text-aqua drop-shadow-[0_0_10px_rgba(51,194,204,0.8)]' 
                  : isHovered 
                    ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]' 
                    : 'text-neutral-400'
              }`}
              href={item.href}
            >
              {item.name}
            </motion.a>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHref, setActiveHref] = useState(window.location.hash || "#home");

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHref(window.location.hash || "#home");
    };
    window.addEventListener("hashchange", handleHashChange);
    
    const handleClick = (e) => {
      const target = e.target.closest("a");
      if (target && target.hash) {
        setActiveHref(target.hash);
      }
    };
    document.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 w-full backdrop-blur-lg bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <a
            href="/"
            className="text-xl font-bold transition-colors text-white flex items-center gap-3"
          >
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:border-aqua/50 hover:shadow-[0_0_10px_rgba(51,194,204,0.5)]"
            >
              <img src="/logo.svg" className="w-5 h-5" alt="Abhi Logo" />
            </motion.div>
            <span className="bg-gradient-to-r from-aqua to-lavender bg-clip-text text-transparent tracking-wide">Abhi</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden sm:flex items-center gap-8">
            <Navigation activeHref={activeHref} setActiveHref={setActiveHref} />
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex sm:hidden p-2 text-neutral-400 hover:text-white focus:outline-none transition-colors"
          >
            <img
              src={isOpen ? "/assets/close.svg" : "/assets/menu.svg"}
              className="w-6 h-6"
              alt="toggle"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-[4.5rem] left-0 right-0 mx-4 sm:hidden pointer-events-auto backdrop-blur-3xl bg-[#030412]/95 border border-white/10 shadow-[0_30px_60px_rgba(51,194,204,0.2)] rounded-[2rem] overflow-hidden"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
          >
            {/* Top Glow Accent inside mobile menu */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-aqua to-transparent opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-b from-aqua/5 to-transparent pointer-events-none" />
            
            <nav className="relative p-6">
              <Navigation activeHref={activeHref} setActiveHref={setActiveHref} setIsOpen={setIsOpen} isMobile={true} />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
