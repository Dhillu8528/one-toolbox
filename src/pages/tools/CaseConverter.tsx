import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function CaseConverter() {
  const [text, setText] = useState("");

  const convert = (type: string) => {
    let result = "";
    switch (type) {
      case "upper":
        result = text.toUpperCase();
        break;
      case "lower":
        result = text.toLowerCase();
        break;
      case "title":
        result = text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        break;
      case "sentence":
        result = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
        break;
      case "toggle":
        result = text.split("").map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join("");
        break;
    }
    setText(result);
    toast.success("Text converted!");
  };

  return (
    <ToolPage
      title="Case Converter"
      description="Convert text to different cases instantly"
    >
      <div className="space-y-6">
        <Textarea
          placeholder="Enter your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[250px] text-base"
        />
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <Button onClick={() => convert("upper")} className="w-full">UPPERCASE</Button>
          <Button onClick={() => convert("lower")} variant="secondary" className="w-full">lowercase</Button>
          <Button onClick={() => convert("title")} variant="outline" className="w-full">Title Case</Button>
          <Button onClick={() => convert("sentence")} variant="outline" className="w-full">Sentence case</Button>
          <Button onClick={() => convert("toggle")} variant="ghost" className="w-full">tOGGLE cASE</Button>
        </div>
      </div>
    </ToolPage>
  );
}
