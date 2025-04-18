import { Github, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © {currentYear} Abhinav M Hari. All Rights Reserved.
          </div>

          <div className="flex space-x-4">
            <a
              href="https://github.com/IamAbhinav03"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-electric-blue transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/abhinav-m-hari-7b8882159/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-electric-blue transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:abhinav.hari_ug2023@ashoka.edu.in"
              className="text-muted-foreground hover:text-electric-blue transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
