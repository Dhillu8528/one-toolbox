import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

export default function TextSummarizer() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [length, setLength] = useState([50]);

  const summarize = () => {
    if (!text.trim()) {
      toast.error("Please enter text to summarize");
      return;
    }

    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    const targetCount = Math.ceil((sentences.length * length[0]) / 100);
    const summarized = sentences.slice(0, Math.max(1, targetCount)).join(" ");
    
    setSummary(summarized);
    toast.success("Text summarized!");
  };

  return (
    <ToolPage
      title="Text Summarizer"
      description="Summarize long text into shorter versions"
    >
      <div className="space-y-6">
        <div>
          <Label>Input Text</Label>
          <Textarea
            placeholder="Enter text to summarize..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[200px] mt-2"
          />
        </div>

        <div>
          <Label>Summary Length: {length[0]}%</Label>
          <Slider
            value={length}
            onValueChange={setLength}
            min={10}
            max={90}
            step={10}
            className="mt-2"
          />
        </div>

        <Button onClick={summarize} className="w-full">Generate Summary</Button>

        {summary && (
          <div>
            <Label>Summary</Label>
            <Textarea
              value={summary}
              readOnly
              className="min-h-[150px] mt-2"
            />
          </div>
        )}
      </div>
    </ToolPage>
  );
}
