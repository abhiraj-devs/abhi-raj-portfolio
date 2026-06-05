import React from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Education from "./sections/Education";
import ResumeTerminal from "./sections/ResumeTerminal";
import Contact from "./sections/Contact";
import Footer from './sections/Footer';
import ScrollReveal from "./components/ScrollReveal";

const App = () => {
  return (
    <div className="container mx-auto max-w-7xl">
      <Navbar />
      
      <ScrollReveal delay={0.2}>
        <Hero />
      </ScrollReveal>
      
      <ScrollReveal>
        <About />
      </ScrollReveal>
      
      <ScrollReveal>
        <Projects />
      </ScrollReveal>
      
      <ScrollReveal>
        <Education />
      </ScrollReveal>
      
      <ScrollReveal>
        <ResumeTerminal />
      </ScrollReveal>
      
      <ScrollReveal>
        <Contact />
      </ScrollReveal>
      
      <Footer/>
    </div>
  );
};

export default App;
