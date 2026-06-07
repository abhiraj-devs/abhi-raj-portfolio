import HeroText from "../components/HeroText";
import ParallaxBackground from "../components/parallaxBackground";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  return (
    <section
      id="home"
      style={{ background: "#010614", minHeight: "100svh", position: "relative", overflow: "hidden" }}
    >
      <ParallaxBackground />
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          minHeight: "100svh",
          width: "100%",
        }}
      >
        <HeroText />
      </div>
    </section>
  );
};

export default Hero;
