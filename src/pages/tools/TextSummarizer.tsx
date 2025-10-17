import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { streamChat } from "@/lib/ai";

export default function TextSummarizer() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [length, setLength] = useState([50]);
  const [isLoading, setIsLoading] = useState(false);

  const summarize = async () => {
    if (!text.trim()) {
      toast.error("Please enter text to summarize");
      return;
    }

    setIsLoading(true);
    setSummary("");

    const lengthInstruction = length[0] < 30 ? "very brief" : length[0] < 60 ? "moderate" : "detailed";
    const prompt = `Summarize the following text. Make it ${lengthInstruction} (approximately ${length[0]}% of original length):

${text}`;

    try {
      await streamChat({
        messages: [{ role: "user", content: prompt }],
        onDelta: (chunk) => setSummary(prev => prev + chunk),
        onDone: () => {
          setIsLoading(false);
          toast.success("Text summarized!");
        }
      });
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to summarize text");
    }
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

        <Button onClick={summarize} className="w-full" disabled={isLoading}>
          {isLoading ? "Summarizing..." : "Generate Summary"}
        </Button>

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
