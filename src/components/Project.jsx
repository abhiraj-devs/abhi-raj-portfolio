import React, { useState } from "react";
import ProjectDetails from "./ProjectDetails";
import { motion } from "motion/react";
import BorderGlow from "./BorderGlow";

const Project = ({
  title,
  description,
  subDescription,
  href,
  image,
  tags,
}) => {
  const [isHidden, setIsHidden] = useState(false);
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="cursor-pointer group h-full"
        onClick={() => setIsHidden(true)}
      >
        <BorderGlow
          edgeSensitivity={40}
          glowColor="258 90 66"
          backgroundColor="rgba(255,255,255,0.05)"
          borderRadius={16}
          colors={['#8b5cf6', '#8b5cf6', '#8b5cf6']}
          fillOpacity={0}
          className="h-full flex flex-col backdrop-blur-sm"
        >
          <div className="flex flex-col h-full overflow-hidden rounded-2xl">
            <div className="relative h-56 overflow-hidden flex-shrink-0">
              <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#010614] to-transparent"></div>
              <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white transition-colors">{title}</h3>
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <p className="text-gray-400 text-sm mb-6 line-clamp-2">{description}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {tags.map((tag) => (
                  <span key={tag.id} className="text-xs px-3 py-1 bg-white/10 rounded-full text-gray-300">
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </BorderGlow>
      </motion.div>
      {isHidden && (
        <ProjectDetails
          title={title}
          description={description}
          subDescription={subDescription}
          image={image}
          tags={tags}
          href={href}
          closeModal={() => setIsHidden(false)}
        />
      )}
    </>
  );
};

export default Project;
