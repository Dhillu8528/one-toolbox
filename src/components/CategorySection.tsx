import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategorySectionProps {
  id: string;
  title: string;
  description: string;
  color: "pdf" | "image" | "text" | "ai" | "video" | "developer" | "productivity" | "link" | "misc";
  icon: LucideIcon;
  children: React.ReactNode;
}

export const CategorySection = ({ 
  id, 
  title, 
  description, 
  color, 
  icon: Icon,
  children 
}: CategorySectionProps) => {
  const colorClasses = {
    pdf: "text-pdf",
    image: "text-image",
    text: "text-text",
    ai: "text-ai",
    video: "text-video",
    developer: "text-developer",
    productivity: "text-productivity",
    link: "text-link",
    misc: "text-misc",
  };

  const bgClasses = {
    pdf: "bg-pdf/10",
    image: "bg-image/10",
    text: "bg-text/10",
    ai: "bg-ai/10",
    video: "bg-video/10",
    developer: "bg-developer/10",
    productivity: "bg-productivity/10",
    link: "bg-link/10",
    misc: "bg-misc/10",
  };

  return (
    <section id={id} className="scroll-mt-20">
      <div className="flex items-center gap-4 mb-6">
        <div className={cn("p-3 rounded-xl", bgClasses[color])}>
          <Icon className={cn("w-6 h-6", colorClasses[color])} />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
};
