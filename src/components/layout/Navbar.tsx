import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Blog", path: "/blog" },
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="glassmorphism sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="font-mono text-xl font-bold tracking-tighter">
          <span className="text-electric-blue">Abhinav</span>
          <span className="text-burgundy">M</span>
          <span className="text-electric-purple">Hari</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "font-mono text-sm relative px-1 py-2 transition-colors group",
                location.pathname === item.path
                  ? "text-electric-blue"
                  : "text-foreground/70 hover:text-foreground"
              )}
            >
              {item.name}
              <div
                className={cn(
                  "absolute bottom-0 left-0 w-0 h-0.5 bg-electric-blue transition-all duration-300",
                  location.pathname === item.path
                    ? "w-full"
                    : "group-hover:w-full"
                )}
              ></div>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-foreground focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 p-4 glassmorphism animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "font-mono text-sm px-4 py-2 border-l-2 transition-colors",
                    location.pathname === item.path
                      ? "border-electric-blue text-electric-blue"
                      : "border-transparent hover:border-electric-blue/50 hover:text-foreground/90"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
