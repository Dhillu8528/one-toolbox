import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface ToolCardProps {
  name: string;
  icon: LucideIcon;
  category: "pdf" | "image" | "text" | "ai" | "video" | "developer" | "productivity" | "link" | "misc";
  href?: string;
}

export const ToolCard = ({ name, icon: Icon, category, href }: ToolCardProps) => {
  const categoryColors = {
    pdf: "bg-pdf-light hover:border-pdf text-pdf",
    image: "bg-image-light hover:border-image text-image",
    text: "bg-text-light hover:border-text text-text",
    ai: "bg-ai-light hover:border-ai text-ai",
    video: "bg-video-light hover:border-video text-video",
    developer: "bg-developer-light hover:border-developer text-developer",
    productivity: "bg-productivity-light hover:border-productivity text-productivity",
    link: "bg-link-light hover:border-link text-link",
    misc: "bg-misc-light hover:border-misc text-misc",
  };

  const CardContent = (
    <Card 
      className={cn(
        "group p-6 cursor-pointer transition-all duration-300 hover:shadow-[var(--shadow-hover)] border-2",
        "hover:scale-105 hover:-translate-y-1 active:scale-95",
        categoryColors[category]
      )}
    >
      <div className="flex flex-col items-center text-center gap-3">
        <div className={cn(
          "p-3 rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
          category === "pdf" && "bg-pdf/10",
          category === "image" && "bg-image/10",
          category === "text" && "bg-text/10",
          category === "ai" && "bg-ai/10",
          category === "video" && "bg-video/10",
          category === "developer" && "bg-developer/10",
          category === "productivity" && "bg-productivity/10",
          category === "link" && "bg-link/10",
          category === "misc" && "bg-misc/10"
        )}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="font-semibold text-sm group-hover:scale-105 transition-transform">{name}</h3>
      </div>
    </Card>
  );

  return href ? <Link to={href}>{CardContent}</Link> : CardContent;
};
