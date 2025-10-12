import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { DarkModeToggle } from "./DarkModeToggle";

interface ToolPageProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const ToolPage = ({ title, description, children }: ToolPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Tools
            </Button>
          </Link>
          <DarkModeToggle />
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-muted-foreground text-lg">{description}</p>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm border-2 rounded-2xl p-8 shadow-[var(--shadow-hover)] animate-scale-in">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
