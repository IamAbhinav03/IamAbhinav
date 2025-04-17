import { ArrowDown, Code, FileText, Lightbulb, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Hi, I'm{" "}
          <span className="text-blue-500 animate-pulse-glow">Abhinav</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12">
          A curious <span className="text-foreground font-medium">maker</span>{" "}
          and{" "}
          <span className="text-foreground font-medium">
            intellectual nomad
          </span>{" "}
          crafting thoughtful digital experiences
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Button asChild className="bg-blue-500 hover:bg-blue-600">
            <Link to="/projects">View My Projects</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/about">Learn More About Me</Link>
          </Button>
        </div>

        <div className="animate-float">
          <ArrowDown className="text-muted-foreground" size={32} />
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Code className="text-blue-500" size={32} />}
            title="Developer"
            description="Building innovative projects using AI, Quantum Computing, IoT, and more."
          />
          <FeatureCard
            icon={<Lightbulb className="text-pink-500" size={32} />}
            title="Experimenter"
            description="Exploring hardware, music gear, education and countless other fields."
          />
          <FeatureCard
            icon={<FileText className="text-purple-500" size={32} />}
            title="Writer"
            description="Crafting poems, mental health reflections, and technical articles."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="glassmorphism rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Let's Connect</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            I'm always open to collaborations, conversations, and coffee chats
            about technology, creativity, or anything in between.
          </p>
          <Button asChild className="bg-blue-500 hover:bg-blue-600">
            <a
              href="mailto:abhinav@example.com"
              className="inline-flex items-center gap-2"
            >
              <Mail size={16} />
              Get in Touch
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="glassmorphism rounded-lg p-6 transition-all hover:glow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Index;
