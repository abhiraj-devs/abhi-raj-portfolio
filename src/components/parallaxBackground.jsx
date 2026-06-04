import CosmicParticleField from "./CosmicParticleField";

const ParallaxBackground = () => {
  return (
    <section className="absolute inset-0" style={{ background: "#02020c" }}>
      <div className="relative h-screen overflow-hidden">
        <CosmicParticleField />
      </div>
    </section>
  );
};

export default ParallaxBackground;
