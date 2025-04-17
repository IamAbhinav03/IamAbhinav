import { useState } from "react";
import {
  BadgeCheck,
  Github,
  Linkedin,
  Mail,
  Code,
  Lightbulb,
  Music,
  BookOpen,
  Laptop,
  Palette,
  Brain,
  Cpu,
  Server,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const About = () => {
  const [activeSection, setActiveSection] = useState<string>("journey");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const skillIcons: Record<string, JSX.Element> = {
    "Artificial Intelligence": <Brain size={32} />,
    "Quantum Computing": <Cpu size={32} />,
    "IoT & Hardware": <Server size={32} />,
    "Backend Development": <Code size={32} />,
    "Computer Vision": <Laptop size={32} />,
    "Research & Analysis": <Lightbulb size={32} />,
    Entrepreneurship: <Sparkles size={32} />,
    "Creative Writing": <BookOpen size={32} />,
    "Music & Audio": <Music size={32} />,
    "Teaching & Mentoring": <Palette size={32} />,
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About Me
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left sidebar with tabs */}
        <motion.div
          className="glassmorphism rounded-lg p-6 lg:col-span-1"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h3 className="text-xl font-bold mb-4 text-electric-blue">Explore</h3>
          <div className="space-y-2">
            <TabButton
              active={activeSection === "journey"}
              onClick={() => setActiveSection("journey")}
              icon={<Sparkles size={18} />}
              label="The Journey"
            />
            <TabButton
              active={activeSection === "work"}
              onClick={() => setActiveSection("work")}
              icon={<Code size={18} />}
              label="What I Do"
            />
            <TabButton
              active={activeSection === "education"}
              onClick={() => setActiveSection("education")}
              icon={<BookOpen size={18} />}
              label="Education"
            />
            <TabButton
              active={activeSection === "connect"}
              onClick={() => setActiveSection("connect")}
              icon={<Mail size={18} />}
              label="Let's Connect"
            />
          </div>
        </motion.div>

        {/* Main content area */}
        <motion.div
          className="glassmorphism rounded-lg p-6 lg:col-span-3"
          key={activeSection}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          {activeSection === "journey" && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-electric-blue">
                The Journey
              </h2>
              <motion.div
                className="space-y-4 text-lg"
                initial="hidden"
                animate="visible"
                variants={container}
              >
                <motion.p variants={item}>
                  Hello! I'm Abhinav, a BSc Computer Science and
                  Entrepreneurship undergrad at Ashoka University. I consider
                  myself an intellectual and social nomad—someone who's
                  constantly exploring new territories of knowledge and
                  connections.
                </motion.p>
                <motion.p variants={item}>
                  I've always been drawn to making things, whether that's code,
                  hardware experiments, or creative writing. The process of
                  turning ideas into reality is what drives me every day.
                </motion.p>
                <motion.p variants={item}>
                  When I'm not building projects, I'm probably exploring music
                  gear (IEMs, guitars), researching tech products, thinking
                  about education, or writing poems and reflections on mental
                  health.
                </motion.p>
              </motion.div>
            </div>
          )}

          {activeSection === "work" && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-electric-blue">
                What I Do
              </h2>
              <motion.div
                className="space-y-4 text-lg"
                initial="hidden"
                animate="visible"
                variants={container}
              >
                <motion.p variants={item}>
                  As a fast learner with an insatiable curiosity, I've explored
                  various fields including AI, Quantum Computing, IoT, and
                  hardware-based randomness. I don't just learn about these
                  technologies—I build with them.
                </motion.p>
                <motion.p variants={item}>
                  My approach combines deep technical knowledge with a creative
                  mindset. I believe the most interesting innovations happen at
                  the intersection of different disciplines.
                </motion.p>
                <motion.p variants={item}>
                  My experience as a teaching assistant has also given me a deep
                  appreciation for collaboration and knowledge sharing. I enjoy
                  breaking down complex concepts and working with others to
                  solve challenging problems.
                </motion.p>
              </motion.div>
            </div>
          )}

          {activeSection === "education" && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-electric-blue">
                Education
              </h2>
              <motion.div
                className="space-y-4"
                initial="hidden"
                animate="visible"
                variants={container}
              >
                <motion.div
                  variants={item}
                  className="glassmorphism bg-secondary/50 rounded-lg p-6"
                >
                  <h3 className="text-xl font-bold">Ashoka University</h3>
                  <p className="text-muted-foreground">
                    BSc Computer Science and Entrepreneurship
                  </p>
                  <p className="text-muted-foreground">2020 - 2024</p>
                  <div className="mt-4">
                    <p>
                      At Ashoka, I've had the opportunity to explore both
                      technical and entrepreneurial disciplines. My academic
                      journey has been complemented by hands-on projects and
                      research experiences.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          )}

          {activeSection === "connect" && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-electric-blue">
                Let's Connect
              </h2>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={container}
              >
                <motion.a
                  variants={item}
                  href="https://github.com/abhinavhari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glassmorphism rounded-lg p-6 flex flex-col items-center justify-center hover:glow transition-all"
                >
                  <Github size={32} className="mb-3 text-white" />
                  <span className="font-medium">GitHub</span>
                  <span className="text-sm text-muted-foreground">
                    Check out my code
                  </span>
                </motion.a>
                <motion.a
                  variants={item}
                  href="https://linkedin.com/in/abhinavhari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glassmorphism rounded-lg p-6 flex flex-col items-center justify-center hover:glow transition-all"
                >
                  <Linkedin size={32} className="mb-3 text-white" />
                  <span className="font-medium">LinkedIn</span>
                  <span className="text-sm text-muted-foreground">
                    Connect professionally
                  </span>
                </motion.a>
                <motion.a
                  variants={item}
                  href="mailto:abhinav@example.com"
                  className="glassmorphism rounded-lg p-6 flex flex-col items-center justify-center hover:glow transition-all"
                >
                  <Mail size={32} className="mb-3 text-white" />
                  <span className="font-medium">Email</span>
                  <span className="text-sm text-muted-foreground">
                    Get in touch
                  </span>
                </motion.a>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Skills section */}
      <motion.div
        className="mt-12"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h2 className="text-2xl font-bold mb-6">Skills & Interests</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {skills.map((skill) => (
            <motion.div
              key={skill}
              className={`glassmorphism rounded-lg p-4 text-center cursor-pointer transition-all duration-300 ${
                hoveredSkill === skill ? "glow scale-105" : "hover:scale-105"
              }`}
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
              whileHover={{ y: -5 }}
              variants={item}
            >
              <div className="flex justify-center mb-2 text-electric-blue">
                {skillIcons[skill] || <BadgeCheck size={32} />}
              </div>
              <span className="text-sm font-medium">{skill}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: JSX.Element;
  label: string;
}

const TabButton = ({ active, onClick, icon, label }: TabButtonProps) => {
  return (
    <Button
      variant={active ? "default" : "ghost"}
      className={`w-full justify-start ${
        active ? "bg-electric-blue hover:bg-electric-blue/90" : ""
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </Button>
  );
};

const skills = [
  "Artificial Intelligence",
  "Quantum Computing",
  "IoT & Hardware",
  "Backend Development",
  "Computer Vision",
  "Research & Analysis",
  "Entrepreneurship",
  "Creative Writing",
  "Music & Audio",
  "Teaching & Mentoring",
];

export default About;
