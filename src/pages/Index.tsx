import { Search, FileText, Image, Type, Sparkles, Video, Music, Code, Link2, Briefcase, Wrench } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ToolCard } from "@/components/ToolCard";
import { CategorySection } from "@/components/CategorySection";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { SuggestionsBox } from "@/components/SuggestionsBox";
import { useEffect, useState } from "react";

const Index = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const [query, setQuery] = useState("");
  const filterByQuery = (list: any[]) => query ? list.filter((t: any) => t.name.toLowerCase().includes(query.toLowerCase())) : list;

  const pdfTools = [
    { name: "PDF to Word", icon: FileText, category: "pdf" as const, href: "/tools/pdf-to-word" },
    { name: "Word to PDF", icon: FileText, category: "pdf" as const, href: "/tools/word-to-pdf" },
    { name: "Merge PDF", icon: FileText, category: "pdf" as const, href: "/tools/pdf-merge" },
    { name: "Split PDF", icon: FileText, category: "pdf" as const, href: "/tools/pdf-split" },
    { name: "Compress PDF", icon: FileText, category: "pdf" as const, href: "/tools/compress-pdf" },
    { name: "Rotate PDF", icon: FileText, category: "pdf" as const, href: "/tools/pdf-rotate" },
    { name: "Unlock PDF", icon: FileText, category: "pdf" as const, href: "/tools/unlock-pdf" },
    { name: "Protect PDF", icon: FileText, category: "pdf" as const, href: "/tools/protect-pdf" },
    { name: "PDF to JPG", icon: FileText, category: "pdf" as const, href: "/tools/pdf-to-jpg" },
    { name: "JPG to PDF", icon: FileText, category: "pdf" as const, href: "/tools/jpg-to-pdf" },
    { name: "Excel to PDF", icon: FileText, category: "pdf" as const, href: "/tools/excel-to-pdf" },
    { name: "PowerPoint to PDF", icon: FileText, category: "pdf" as const, href: "/tools/powerpoint-to-pdf" },
    { name: "PDF to Text", icon: FileText, category: "pdf" as const, href: "/tools/pdf-to-text" },
    { name: "Organize PDF", icon: FileText, category: "pdf" as const },
  ];

  const documentTools = [
    { name: "Docx to Txt", icon: FileText, category: "pdf" as const, href: "/tools/docx-to-txt" },
    { name: "Txt to PDF", icon: FileText, category: "pdf" as const, href: "/tools/txt-to-pdf" },
    { name: "Excel to CSV", icon: FileText, category: "pdf" as const },
    { name: "CSV to Excel", icon: FileText, category: "pdf" as const },
    { name: "OCR Tool", icon: FileText, category: "pdf" as const, href: "/tools/ocr-tool" },
    { name: "Scan to PDF", icon: FileText, category: "pdf" as const },
    { name: "File Renamer", icon: FileText, category: "pdf" as const },
    { name: "File Metadata Viewer", icon: FileText, category: "pdf" as const },
  ];

  const imageTools = [
    { name: "Resize Image", icon: Image, category: "image" as const, href: "/tools/image-resize" },
    { name: "Compress Image", icon: Image, category: "image" as const, href: "/tools/image-compressor" },
    { name: "Crop Image", icon: Image, category: "image" as const, href: "/tools/image-cropper" },
    { name: "JPG to PNG", icon: Image, category: "image" as const, href: "/tools/jpg-to-png" },
    { name: "PNG to WEBP", icon: Image, category: "image" as const, href: "/tools/png-to-webp" },
    { name: "HEIC to JPG", icon: Image, category: "image" as const, href: "/tools/heic-to-jpg" },
    { name: "SVG to PNG", icon: Image, category: "image" as const },
    { name: "Flip Image", icon: Image, category: "image" as const },
    { name: "Rotate Image", icon: Image, category: "image" as const },
    { name: "Add Watermark", icon: Image, category: "image" as const },
    { name: "Grayscale", icon: Image, category: "image" as const },
    { name: "Image to Base64", icon: Image, category: "image" as const, href: "/tools/base64-tool" },
    { name: "Background Remover", icon: Image, category: "image" as const },
    { name: "AI Image Upscaler", icon: Image, category: "image" as const },
    { name: "Image Colorizer", icon: Image, category: "image" as const },
    { name: "Meme Generator", icon: Image, category: "image" as const },
  ];

  const textTools = [
    { name: "Word Counter", icon: Type, category: "text" as const, href: "/tools/word-counter" },
    { name: "Character Counter", icon: Type, category: "text" as const },
    { name: "Case Converter", icon: Type, category: "text" as const, href: "/tools/case-converter" },
    { name: "Remove Extra Spaces", icon: Type, category: "text" as const },
    { name: "Find & Replace", icon: Type, category: "text" as const },
    { name: "Text Diff", icon: Type, category: "text" as const },
    { name: "Remove Duplicates", icon: Type, category: "text" as const },
    { name: "Binary to Text", icon: Type, category: "text" as const },
    { name: "Morse to Text", icon: Type, category: "text" as const },
    { name: "Base64 to Text", icon: Type, category: "text" as const },
    { name: "Synonym Finder", icon: Type, category: "text" as const },
    { name: "Keyword Extractor", icon: Type, category: "text" as const },
  ];

  const aiTools = [
    { name: "Text Summarizer", icon: Sparkles, category: "ai" as const, href: "/tools/text-summarizer" },
    { name: "Content Generator", icon: Sparkles, category: "ai" as const, href: "/tools/content-generator" },
    { name: "Grammar Check", icon: Sparkles, category: "ai" as const, href: "/tools/grammar-check" },
    { name: "Translator", icon: Sparkles, category: "ai" as const, href: "/tools/translator" },
    { name: "Paraphraser", icon: Sparkles, category: "ai" as const, href: "/tools/paraphraser" },
    { name: "Article Rewriter", icon: Sparkles, category: "ai" as const, href: "/tools/article-rewriter" },
    { name: "Caption Generator", icon: Sparkles, category: "ai" as const, href: "/tools/caption-generator" },
    { name: "Hashtag Generator", icon: Sparkles, category: "ai" as const, href: "/tools/hashtag-generator" },
    { name: "Text to Speech", icon: Sparkles, category: "ai" as const, href: "/tools/text-to-speech" },
    { name: "Speech to Text", icon: Sparkles, category: "ai" as const, href: "/tools/speech-to-text" },
    { name: "Poem Generator", icon: Sparkles, category: "ai" as const, href: "/tools/poem-generator" },
    { name: "Story Writer", icon: Sparkles, category: "ai" as const, href: "/tools/story-writer" },
    { name: "Blog Generator", icon: Sparkles, category: "ai" as const, href: "/tools/blog-generator" },
    { name: "AI Image Generator", icon: Sparkles, category: "ai" as const, href: "/tools/ai-image-generator" },
    { name: "AI Chatbot", icon: Sparkles, category: "ai" as const, href: "/tools/ai-chatbot" },
    { name: "Voice Cloner", icon: Sparkles, category: "ai" as const, href: "/tools/voice-cloner" },
  ];

  const videoTools = [
    { name: "MP4 to MP3", icon: Video, category: "video" as const, href: "/tools/mp4-to-mp3" },
    { name: "AVI to MP4", icon: Video, category: "video" as const, href: "/tools/avi-to-mp4" },
    { name: "MOV to MP4", icon: Video, category: "video" as const, href: "/tools/mov-to-mp4" },
    { name: "Video Cutter", icon: Video, category: "video" as const, href: "/tools/video-cutter" },
    { name: "Video Compressor", icon: Video, category: "video" as const, href: "/tools/video-compressor" },
    { name: "Merge Videos", icon: Video, category: "video" as const, href: "/tools/merge-videos" },
    { name: "Add Subtitles", icon: Video, category: "video" as const, href: "/tools/add-subtitles" },
    { name: "Crop Video", icon: Video, category: "video" as const, href: "/tools/crop-video" },
    { name: "Audio Cutter", icon: Music, category: "video" as const, href: "/tools/audio-cutter" },
    { name: "Audio Joiner", icon: Music, category: "video" as const, href: "/tools/audio-joiner" },
    { name: "WAV to MP3", icon: Music, category: "video" as const, href: "/tools/wav-to-mp3" },
    { name: "Voice Recorder", icon: Music, category: "video" as const, href: "/tools/voice-recorder" },
  ];

  const developerTools = [
    { name: "HTML Formatter", icon: Code, category: "developer" as const },
    { name: "CSS Beautifier", icon: Code, category: "developer" as const },
    { name: "JS Minifier", icon: Code, category: "developer" as const },
    { name: "JSON Formatter", icon: Code, category: "developer" as const, href: "/tools/json-formatter" },
    { name: "XML to JSON", icon: Code, category: "developer" as const },
    { name: "JSON to CSV", icon: Code, category: "developer" as const },
    { name: "Code Diff Checker", icon: Code, category: "developer" as const },
    { name: "Regex Tester", icon: Code, category: "developer" as const },
    { name: "Markdown Previewer", icon: Code, category: "developer" as const, href: "/tools/markdown-preview" },
    { name: "Base64 Encoder", icon: Code, category: "developer" as const, href: "/tools/base64-tool" },
    { name: "Color Picker", icon: Code, category: "developer" as const, href: "/tools/color-picker" },
    { name: "Gradient Generator", icon: Code, category: "developer" as const },
    { name: "Lorem Ipsum", icon: Code, category: "developer" as const, href: "/tools/lorem-ipsum" },
    { name: "IP Lookup", icon: Code, category: "developer" as const },
  ];

  const productivityTools = [
    { name: "Resume Builder", icon: Briefcase, category: "productivity" as const },
    { name: "Invoice Generator", icon: Briefcase, category: "productivity" as const },
    { name: "Cover Letter", icon: Briefcase, category: "productivity" as const },
    { name: "Receipt Maker", icon: Briefcase, category: "productivity" as const },
    { name: "Stopwatch", icon: Briefcase, category: "productivity" as const },
    { name: "Countdown Timer", icon: Briefcase, category: "productivity" as const },
    { name: "Time Zone Converter", icon: Briefcase, category: "productivity" as const },
    { name: "Age Calculator", icon: Briefcase, category: "productivity" as const, href: "/tools/age-calculator" },
    { name: "Currency Converter", icon: Briefcase, category: "productivity" as const },
    { name: "Loan Calculator", icon: Briefcase, category: "productivity" as const },
    { name: "Unit Converter", icon: Briefcase, category: "productivity" as const, href: "/tools/unit-converter" },
    { name: "Plagiarism Checker", icon: Briefcase, category: "productivity" as const },
  ];

  const linkTools = [
    { name: "URL Shortener", icon: Link2, category: "link" as const, href: "/tools/url-shortener" },
    { name: "QR Code Generator", icon: Link2, category: "link" as const, href: "/tools/qr-generator" },
    { name: "Barcode Generator", icon: Link2, category: "link" as const },
    { name: "URL Expander", icon: Link2, category: "link" as const },
    { name: "UTM Builder", icon: Link2, category: "link" as const },
    { name: "QR Code with Logo", icon: Link2, category: "link" as const },
  ];

  const miscTools = [
    { name: "Password Generator", icon: Wrench, category: "misc" as const, href: "/tools/password-generator" },
    { name: "Username Generator", icon: Wrench, category: "misc" as const },
    { name: "Random Number", icon: Wrench, category: "misc" as const },
    { name: "Random Picker", icon: Wrench, category: "misc" as const },
    { name: "Instagram Bio", icon: Wrench, category: "misc" as const },
    { name: "Tweet Generator", icon: Wrench, category: "misc" as const },
    { name: "BMI Calculator", icon: Wrench, category: "misc" as const },
    { name: "Calorie Calculator", icon: Wrench, category: "misc" as const },
    { name: "Hash Generator", icon: Wrench, category: "misc" as const, href: "/tools/hash-generator" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 animate-fade-in">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary via-accent to-primary animate-pulse shadow-lg" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">ToolBox</h1>
          </div>
          <nav className="hidden md:flex gap-4 text-xs lg:text-sm">
            <a href="#pdf" className="font-medium hover:text-primary transition-colors hover:scale-110">PDF</a>
            <a href="#document" className="font-medium hover:text-primary transition-colors hover:scale-110">Documents</a>
            <a href="#image" className="font-medium hover:text-primary transition-colors hover:scale-110">Images</a>
            <a href="#text" className="font-medium hover:text-primary transition-colors hover:scale-110">Text</a>
            <a href="#ai" className="font-medium hover:text-primary transition-colors hover:scale-110">AI</a>
            <a href="#video" className="font-medium hover:text-primary transition-colors hover:scale-110">Video/Audio</a>
            <a href="#developer" className="font-medium hover:text-primary transition-colors hover:scale-110">Developer</a>
            <a href="#productivity" className="font-medium hover:text-primary transition-colors hover:scale-110">Productivity</a>
            <a href="#link" className="font-medium hover:text-primary transition-colors hover:scale-110">Links/QR</a>
            <a href="#misc" className="font-medium hover:text-primary transition-colors hover:scale-110">More</a>
          </nav>
          <DarkModeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent rounded-3xl blur-3xl" />
        <div className="text-center max-w-3xl mx-auto relative">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-fade-in">
            All Your Tools in One Place
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in [animation-delay:150ms]">
            Fast, secure, and easy-to-use online tools for PDF, images, text, and AI utilities
          </p>
          <div className="relative max-w-xl mx-auto animate-fade-in [animation-delay:300ms]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search for tools..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 h-14 text-lg bg-card shadow-lg border-2 hover:shadow-xl transition-shadow focus:scale-105 transition-transform"
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
            {filterByQuery(pdfTools).map((tool) => (
              <ToolCard key={tool.name} {...tool} />
            ))}
          </div>
        </CategorySection>

        <CategorySection 
          id="document"
          title="Document Tools"
          description="Convert and manage various document formats"
          color="pdf"
          icon={FileText}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filterByQuery(documentTools).map((tool) => (
              <ToolCard key={tool.name} {...tool} />
            ))}
          </div>
        </CategorySection>

        <CategorySection 
          id="image"
          title="Image Tools"
          description="Edit, convert, and enhance images with AI"
          color="image"
          icon={Image}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filterByQuery(imageTools).map((tool) => (
              <ToolCard key={tool.name} {...tool} />
            ))}
          </div>
        </CategorySection>

        <CategorySection 
          id="text"
          title="Text Tools"
          description="Manipulate, analyze, and transform text content"
          color="text"
          icon={Type}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filterByQuery(textTools).map((tool) => (
              <ToolCard key={tool.name} {...tool} />
            ))}
          </div>
        </CategorySection>

        <CategorySection 
          id="ai"
          title="AI Utilities"
          description="AI-powered tools for content creation and automation"
          color="ai"
          icon={Sparkles}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filterByQuery(aiTools).map((tool) => (
              <ToolCard key={tool.name} {...tool} />
            ))}
          </div>
        </CategorySection>

        <CategorySection 
          id="video"
          title="Video & Audio Tools"
          description="Convert, edit, and process video and audio files"
          color="video"
          icon={Video}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filterByQuery(videoTools).map((tool) => (
              <ToolCard key={tool.name} {...tool} />
            ))}
          </div>
        </CategorySection>

        <CategorySection 
          id="developer"
          title="Developer Tools"
          description="Code formatters, converters, and utilities"
          color="developer"
          icon={Code}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filterByQuery(developerTools).map((tool) => (
              <ToolCard key={tool.name} {...tool} />
            ))}
          </div>
        </CategorySection>

        <CategorySection 
          id="productivity"
          title="Productivity Tools"
          description="Time, finance, and business utilities"
          color="productivity"
          icon={Briefcase}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filterByQuery(productivityTools).map((tool) => (
              <ToolCard key={tool.name} {...tool} />
            ))}
          </div>
        </CategorySection>

        <CategorySection 
          id="link"
          title="Link & QR Tools"
          description="URL shorteners, QR codes, and tracking"
          color="link"
          icon={Link2}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filterByQuery(linkTools).map((tool) => (
              <ToolCard key={tool.name} {...tool} />
            ))}
          </div>
        </CategorySection>

        <CategorySection 
          id="misc"
          title="Miscellaneous Tools"
          description="Generators, calculators, and fun utilities"
          color="misc"
          icon={Wrench}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filterByQuery(miscTools).map((tool) => (
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
      <SuggestionsBox />
    </div>
  );
};

export default Index;
