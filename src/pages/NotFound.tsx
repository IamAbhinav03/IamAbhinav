import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="glassmorphism rounded-lg p-12 max-w-md mx-auto text-center animate-fade-in">
        <div className="inline-block p-4 rounded-full bg-secondary mb-6">
          <span className="text-4xl">404</span>
        </div>
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="bg-electric-blue hover:bg-electric-blue/90">
          <Link to="/" className="inline-flex items-center">
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
