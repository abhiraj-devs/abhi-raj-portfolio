import Project from "../components/Project";
import { myProjects } from "../constants";
import { Particles } from "../components/Particles";

const Projects = () => {
  return (
    <section
      id="projects"
      className="relative c-space section-spacing"
    >
      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      <h2 className="text-heading text-center mb-12">My Selected Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
        {myProjects.map((project) => (
          <Project key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
