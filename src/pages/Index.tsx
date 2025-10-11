import { Search, FileText, Image, Type, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToolCard } from "@/components/ToolCard";
import { CategorySection } from "@/components/CategorySection";

const Index = () => {
  const pdfTools = [
    { name: "PDF to Word", icon: FileText, category: "pdf" as const },
    { name: "Merge PDF", icon: FileText, category: "pdf" as const },
    { name: "Compress PDF", icon: FileText, category: "pdf" as const },
    { name: "PDF to JPG", icon: FileText, category: "pdf" as const },
  ];

  const imageTools = [
    { name: "Resize Image", icon: Image, category: "image" as const },
    { name: "Compress Image", icon: Image, category: "image" as const },
    { name: "Convert Format", icon: Image, category: "image" as const },
    { name: "Crop Image", icon: Image, category: "image" as const },
  ];

  const textTools = [
    { name: "Word Counter", icon: Type, category: "text" as const },
    { name: "Case Converter", icon: Type, category: "text" as const },
    { name: "Text Diff", icon: Type, category: "text" as const },
    { name: "Remove Duplicates", icon: Type, category: "text" as const },
  ];

  const aiTools = [
    { name: "Text Summarizer", icon: Sparkles, category: "ai" as const },
    { name: "Content Generator", icon: Sparkles, category: "ai" as const },
    { name: "Grammar Check", icon: Sparkles, category: "ai" as const },
    { name: "Translator", icon: Sparkles, category: "ai" as const },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent" />
            <h1 className="text-xl font-bold">ToolBox</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#pdf" className="text-sm font-medium hover:text-primary transition-colors">PDF Tools</a>
            <a href="#image" className="text-sm font-medium hover:text-primary transition-colors">Image Tools</a>
            <a href="#text" className="text-sm font-medium hover:text-primary transition-colors">Text Tools</a>
            <a href="#ai" className="text-sm font-medium hover:text-primary transition-colors">AI Utilities</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
            All Your Tools in One Place
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
            Fast, secure, and easy-to-use online tools for PDF, images, text, and AI utilities
          </p>
          <div className="relative max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Search for tools..." 
              className="pl-12 h-14 text-lg bg-card shadow-lg border-2"
            />
          </div>
        </div>
      </section>

      {/* Tools Sections */}
      <main className="container mx-auto px-4 pb-16 space-y-16">
        <CategorySection 
          id="pdf"
          title="PDF Tools"
          description="Edit, convert, and manage your PDF files"
          color="pdf"
          icon={FileText}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pdfTools.map((tool) => (
              <ToolCard key={tool.name} {...tool} />
            ))}
          </div>
        </CategorySection>

        <CategorySection 
          id="image"
          title="Image Tools"
          description="Resize, compress, and convert images"
          color="image"
          icon={Image}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {imageTools.map((tool) => (
              <ToolCard key={tool.name} {...tool} />
            ))}
          </div>
        </CategorySection>

        <CategorySection 
          id="text"
          title="Text Tools"
          description="Manipulate and analyze text content"
          color="text"
          icon={Type}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {textTools.map((tool) => (
              <ToolCard key={tool.name} {...tool} />
            ))}
          </div>
        </CategorySection>

        <CategorySection 
          id="ai"
          title="AI Utilities"
          description="AI-powered tools for content and analysis"
          color="ai"
          icon={Sparkles}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {aiTools.map((tool) => (
              <ToolCard key={tool.name} {...tool} />
            ))}
          </div>
        </CategorySection>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2025 ToolBox. All your tools in one place.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
