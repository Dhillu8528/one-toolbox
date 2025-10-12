import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

export default function WordCounter() {
  const [text, setText] = useState("");
  
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim()).length;

  return (
    <ToolPage
      title="Word Counter"
      description="Count words, characters, sentences, and paragraphs in your text"
    >
      <div className="space-y-6">
        <Textarea
          placeholder="Type or paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[300px] text-base"
        />
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Words", value: words },
            { label: "Characters", value: characters },
            { label: "No Spaces", value: charactersNoSpaces },
            { label: "Sentences", value: sentences },
            { label: "Paragraphs", value: paragraphs },
          ].map((stat) => (
            <Card key={stat.label} className="p-4 text-center bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <div className="text-3xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </ToolPage>
  );
}
