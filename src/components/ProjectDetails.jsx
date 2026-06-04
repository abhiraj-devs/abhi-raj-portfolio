import { motion } from "motion/react";

const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  closeModal,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-hidden backdrop-blur-sm p-4">
      <motion.div
        className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto border shadow-xl rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10 scrollbar-thin"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <button
          onClick={closeModal}
          className="absolute p-2 rounded-full top-4 right-4 bg-midnight/80 border border-white/10 hover:bg-neutral-800 transition-colors z-10 cursor-pointer"
        >
          <img src="assets/close.svg" className="w-5 h-5" alt="Close" />
        </button>
        
        {/* Constrained and centered image layout */}
        <div className="w-full h-64 overflow-hidden rounded-t-2xl flex items-center justify-center bg-black/40 border-b border-white/5">
          <img src={image} alt={title} className="w-full h-full object-cover object-top" />
        </div>

        <div className="p-6">
          <h5 className="mb-3 text-2xl font-bold text-white tracking-wide">{title}</h5>
          <p className="mb-4 text-sm font-normal text-neutral-300 leading-relaxed">{description}</p>
          
          <div className="space-y-3 pl-4 border-l-2 border-royal/30">
            {subDescription.map((subDesc, index) => (
              <p className="text-sm font-normal text-neutral-400 leading-relaxed" key={index}>
                {subDesc}
              </p>
            ))}
          </div>

          <div className="flex items-center justify-end mt-8 pt-4 border-t border-white/5">
            {href && (
              <a 
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-aqua hover:text-white cursor-pointer transition-colors hover:translate-x-0.5 duration-200"
              >
                <span>View Project</span>
                <img src="assets/arrow-up.svg" className="size-3.5" alt="Link arrow" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
