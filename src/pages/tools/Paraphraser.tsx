import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Paraphraser() {
  const [text, setText] = useState("");
  const [paraphrased, setParaphrased] = useState("");

  const synonyms: Record<string, string[]> = {
    good: ["great", "excellent", "fine"],
    bad: ["poor", "terrible", "awful"],
    big: ["large", "huge", "enormous"],
    small: ["tiny", "little", "mini"],
    quick: ["fast", "rapid", "swift"],
  };

  const paraphrase = () => {
    if (!text.trim()) {
      toast.error("Please enter text to paraphrase");
      return;
    }

    let result = text;
    Object.entries(synonyms).forEach(([word, syns]) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      result = result.replace(regex, syns[Math.floor(Math.random() * syns.length)]);
    });

    setParaphrased(result);
    toast.success("Text paraphrased!");
  };

  return (
    <ToolPage
      title="Paraphraser"
      description="Rewrite text with different words"
    >
      <div className="space-y-6">
        <div>
          <Label>Original Text</Label>
          <Textarea
            placeholder="Enter text to paraphrase..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[200px] mt-2"
          />
        </div>

        <Button onClick={paraphrase} className="w-full">Paraphrase</Button>

        {paraphrased && (
          <div>
            <Label>Paraphrased Text</Label>
            <Textarea
              value={paraphrased}
              readOnly
              className="min-h-[200px] mt-2"
            />
          </div>
        )}
      </div>
    </ToolPage>
  );
}
