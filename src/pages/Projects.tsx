import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoLink?: string;
  githubLink?: string;
}

const Projects = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 animate-fade-in">Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  return (
    <div
      className="glassmorphism rounded-lg overflow-hidden transition-all hover:glow animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="h-48 bg-secondary overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
        <p className="text-muted-foreground mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="bg-secondary/80">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex gap-3 mt-4">
          {project.demoLink && (
            <Button
              asChild
              size="sm"
              className="bg-electric-blue hover:bg-electric-blue/90"
            >
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <ExternalLink size={14} />
                Demo
              </a>
            </Button>
          )}

          {project.githubLink && (
            <Button asChild size="sm" variant="outline">
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Github size={14} />
                Code
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const projects = [
  {
    title: "Green: AI Waste Classifier",
    description:
      "An AI-powered waste classification system recognized by Intel & NeGD. Helps users identify how to properly dispose of waste items.",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    technologies: ["Pytorch", "Computer Vision", "Django", "OpenCv", "ResNet"],
    githubLink: "https://github.com/IamAbhinav03/Green_V3",
  },
  {
    title: "Hardware Random Number Generator",
    description:
      "A truly random number generator using double pendulum chaos and computer vision to capture entropy from a physical system. Summer 2024 internship project with Makerspace Ashoka. Still work in progress",
    image:
      "https://images.unsplash.com/photo-1597733336794-12d05021d510?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    technologies: ["OpenCV", "Python", "Hardware", "Chaos Theory"],
    githubLink: "https://github.com/IamAbhinav03/Double-Pendulum",
  },
  // {
  //   title: "Hexagonal Convolutions Research",
  //   description:
  //     "Research project on implementing and optimizing hexagonal convolutions for more efficient deep learning models.",
  //   image:
  //     "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  //   technologies: ["PyTorch", "Deep Learning", "Research", "Computer Vision"],
  //   githubLink: "https://github.com/abhinavhari/hex-convolutions",
  // },
  // {
  //   title: "Skilljag Backend Development",
  //   description:
  //     "Built a robust backend system for Skilljag using Django and PostgreSQL with a focus on API architecture and performance.",
  //   image:
  //     "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  //   technologies: ["Django", "PostgreSQL", "REST API", "AWS"],
  // },
  // {
  //   title: "Quantum Finance Comparison",
  //   description:
  //     "Research comparing the performance of Recurrent Neural Networks vs Variational Quantum Eigensolvers in financial prediction tasks.",
  //   image:
  //     "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  //   technologies: ["Qiskit", "TensorFlow", "Finance", "Quantum Computing"],
  //   githubLink: "https://github.com/abhinavhari/quantum-finance",
  // },
];

export default Projects;
