import { Timeline } from "../components/Timeline";
import { education } from "../constants";
import { Particles } from "../components/Particles";

const Education = () => {
  return (
    <section className="relative w-full" id="education">
      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      <Timeline data={education} title="Education" />
    </section>
  );
};

export default Education;
