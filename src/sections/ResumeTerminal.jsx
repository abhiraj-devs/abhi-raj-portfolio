import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { internships, certifications, extracurriculars } from "../constants";
import { Particles } from "../components/Particles";

const ResumeTerminal = () => {
  const [activeTab, setActiveTab] = useState("internships");
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Tabs configuration
  const tabs = [
    { id: "internships", label: "01_INTERNSHIPS", data: internships },
    { id: "certifications", label: "02_CERTIFICATIONS", data: certifications },
    { id: "extracurriculars", label: "03_ACTIVITIES", data: extracurriculars },
  ];

  // Handle tab change and terminal print effect
  useEffect(() => {
    setIsTyping(true);
    const logsMap = {
      internships: [
        "INITIALIZING CONNECTION TO RED_TEAM_DB...",
        "ACCESSING INTERN_LOGS DIRECTORY... OK",
        "RETRIEVING APPLIED FORENSICS AND IOT NODES... 100%",
        "DECRYPTING RECORD_SET... SUCCESS",
      ],
      certifications: [
        "FETCHING CERTIFICATE_REGISTRY...",
        "VERIFYING CISCO & GUVI CRREDENTIALS... OK",
        "RESOLVING SYSTEM TRAINING RECORDS... 4 MATCHES FOUND",
        "LOADING CERTIFICATION_CARDS... DONE",
      ],
      extracurriculars: [
        "OPENING COM_LEAD_NETWORKS...",
        "READING IEDC & NSS INVOLVEMENT_METRICS... OK",
        "COMPILING STUDENT LEADERSHIP PROJECTS... COMPLETE",
        "DISPLAYING ENGAGEMENT_MATRIX... ACTIVE",
      ],
    };

    setTerminalLogs([]);
    let logs = logsMap[activeTab] || [];
    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setTerminalLogs((prev) => [...prev, logs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 180);

    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <section className="relative c-space section-spacing" id="experience">
      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-heading">Experience & Core Records</h2>
          <p className="subtext mt-2">
            Holographic database containing internships, cyber forensics training, certifications, and leadership roles.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
          <span className="w-2.5 h-2.5 bg-mint rounded-full animate-pulse" />
          <span className="text-xs font-mono text-neutral-400">DATABASE_CLIENT_V4: ONLINE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-12">
        {/* Left column: Terminal Commands & Controls */}
        <div className="lg:col-span-4 flex flex-col gap-4 relative z-20">
          <div className="p-5 bg-gradient-to-b from-storm/80 to-indigo/80 border border-white/10 rounded-2xl flex flex-col gap-3 relative overflow-hidden z-20 pointer-events-auto">
            {/* Corner tech details */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-aqua/30 rounded-tr-xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-aqua/30 rounded-bl-xl pointer-events-none" />
            
            <p className="text-xs font-mono text-aqua/80 tracking-wider">CHOOSE_SECTOR_QUERY</p>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full py-4 px-5 rounded-xl font-mono text-left text-sm transition-all duration-300 relative overflow-hidden flex items-center justify-between border cursor-pointer z-30 pointer-events-auto ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-royal/50 to-lavender/30 border-royal text-white shadow-[0_0_15px_rgba(92,51,204,0.3)]"
                    : "bg-white/5 border-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="active-indicator"
                    className="w-1.5 h-1.5 bg-aqua rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Real-time Diagnostic Terminal Console */}
          <div className="p-5 bg-black/60 border border-white/10 rounded-2xl font-mono text-xs text-mint h-[13rem] flex flex-col justify-between relative">
            {/* Scanline overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%] pointer-events-none rounded-2xl" />
            <div className="flex flex-col gap-2 overflow-y-auto">
              <p className="text-neutral-500">// TERMINAL_OUTPUT_STREAM</p>
              {terminalLogs.map((log, idx) => (
                <div key={idx} className="flex items-start gap-1">
                  <span className="text-aqua select-none">&gt;</span>
                  <p>{log}</p>
                </div>
              ))}
              {isTyping && <span className="w-1.5 h-3 bg-mint inline-block animate-pulse ml-4" />}
            </div>
            <div className="border-t border-white/5 pt-2 text-[10px] text-neutral-500 flex justify-between">
              <span>BUFFER: OK</span>
              <span>SECURE_SHELL: AES_256</span>
            </div>
          </div>
        </div>

        {/* Right column: Dynamic Holographic Cards */}
        <div className="lg:col-span-8 p-6 bg-gradient-to-b from-navy/60 to-primary/80 border border-white/10 rounded-2xl relative min-h-[30rem]">
          {/* Decorative Corner lines */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-royal" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-royal" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-royal" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-royal" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-6"
            >
              {activeTab === "internships" &&
                internships.map((intern, index) => (
                  <div
                    key={index}
                    className="p-5 bg-white/5 rounded-xl border border-white/5 hover:border-aqua/20 transition-all duration-300 relative group"
                  >
                    {/* Glowing highlight border on left */}
                    <div className="absolute inset-y-0 left-0 w-1 bg-aqua rounded-l-xl group-hover:shadow-[0_0_12px_#33c2cc]" />
                    <div className="flex justify-between items-start flex-wrap gap-2 pl-4">
                      <div>
                        <span className="px-2 py-0.5 text-[10px] font-mono bg-aqua/10 text-aqua border border-aqua/20 rounded">
                          CLASS: CORE_INTERN
                        </span>
                        <h4 className="text-xl font-bold mt-2 text-white group-hover:text-aqua transition-colors">
                          {intern.title}
                        </h4>
                        <p className="text-sm text-neutral-400 font-mono mt-1">
                          {intern.company}
                        </p>
                      </div>
                      <span className="text-xs font-mono text-neutral-500 border border-neutral-700/50 rounded-full px-3 py-1 bg-black/20">
                        {intern.date}
                      </span>
                    </div>
                    <ul className="mt-4 pl-4 space-y-2 text-sm text-neutral-400 list-disc marker:text-aqua">
                      {intern.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}

              {activeTab === "certifications" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="p-5 bg-white/5 rounded-xl border border-white/5 hover:border-coral/20 transition-all duration-300 relative group flex flex-col justify-between"
                    >
                      <div className="absolute inset-y-0 left-0 w-1 bg-coral rounded-l-xl group-hover:shadow-[0_0_12px_#ea4884]" />
                      <div className="pl-4">
                        <span className="px-2 py-0.5 text-[10px] font-mono bg-coral/10 text-coral border border-coral/20 rounded">
                          SECURE_VERIFIED
                        </span>
                        <h4 className="text-lg font-bold mt-2 text-white group-hover:text-coral transition-colors">
                          {cert.name}
                        </h4>
                        <p className="text-xs text-neutral-500 font-mono mt-0.5">
                          {cert.issuer}
                        </p>
                        <p className="text-sm text-neutral-400 mt-3 leading-relaxed">
                          {cert.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "extracurriculars" &&
                extracurriculars.map((act, index) => (
                  <div
                    key={index}
                    className="p-5 bg-white/5 rounded-xl border border-white/5 hover:border-lavender/20 transition-all duration-300 relative group"
                  >
                    <div className="absolute inset-y-0 left-0 w-1 bg-lavender rounded-l-xl group-hover:shadow-[0_0_12px_#7a57db]" />
                    <div className="flex justify-between items-start flex-wrap gap-2 pl-4">
                      <div>
                        <span className="px-2 py-0.5 text-[10px] font-mono bg-lavender/10 text-lavender border border-lavender/20 rounded">
                          CLASS: LEADER_INIT
                        </span>
                        <h4 className="text-xl font-bold mt-2 text-white group-hover:text-lavender transition-colors">
                          {act.role}
                        </h4>
                        <p className="text-sm text-neutral-400 font-mono mt-1">
                          {act.organization}
                        </p>
                      </div>
                      <span className="text-xs font-mono text-neutral-500 border border-neutral-700/50 rounded-full px-3 py-1 bg-black/20">
                        {act.date}
                      </span>
                    </div>
                    <p className="mt-4 pl-4 text-sm text-neutral-400 leading-relaxed">
                      {act.description}
                    </p>
                  </div>
                ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ResumeTerminal;
