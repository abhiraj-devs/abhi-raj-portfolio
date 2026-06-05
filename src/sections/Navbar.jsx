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
                ${isMobile ? 'text-lg py-3 rounded-xl' : 'text-base py-2 rounded-full'}
                ${isActive 
                  ? 'text-white bg-white/10' 
                  : isHovered 
                    ? 'text-white' 
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
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
      
      {/* Outer wrapper for animated border */}
      <div className="pointer-events-auto relative p-[1px] rounded-[2rem] overflow-hidden shadow-2xl group w-full max-w-5xl z-50">
        
        {/* Animated Border Gradient */}
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_180deg,rgba(51,194,204,0.8)_270deg,rgba(122,87,219,0.8)_360deg)] opacity-50 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Floating Pill Container (Inner) */}
        <div className="relative w-full backdrop-blur-xl bg-gradient-to-r from-[#050510]/95 via-[#0b1021]/95 to-[#050510]/95 rounded-[2rem] flex items-center justify-between px-5 py-3 z-10">
          
          {/* Logo */}
          <a
            href="/"
            className="text-xl font-bold transition-colors text-white flex items-center gap-3"
          >
            <img src="/logo.svg" className="w-6 h-6 hover:rotate-12 transition-transform duration-300" alt="Abhi Logo" />
            <span className="tracking-wide font-semibold text-lg">ABHI</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden sm:flex items-center gap-2">
            <Navigation activeHref={activeHref} setActiveHref={setActiveHref} />
          </nav>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex sm:hidden p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors focus:outline-none"
          >
            <img
              src={isOpen ? "/assets/close.svg" : "/assets/menu.svg"}
              className="w-5 h-5 opacity-80"
              alt="toggle"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 pointer-events-auto bg-gradient-to-br from-[#050510] via-[#0b1021] to-[#1a0b2e] flex flex-col justify-center items-center"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="flex flex-col items-center w-full px-6">
              <Navigation activeHref={activeHref} setActiveHref={setActiveHref} setIsOpen={setIsOpen} isMobile={true} />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
