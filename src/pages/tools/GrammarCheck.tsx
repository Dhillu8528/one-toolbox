import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { streamChat } from "@/lib/ai";

export default function GrammarCheck() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const check = async () => {
    if (!text.trim()) {
      toast.error("Please enter text to check");
      return;
    }

    setIsLoading(true);
    setResult("");

    const prompt = `Check this text for grammar, spelling, and punctuation errors. Provide the corrected version and list any issues found:

"${text}"

Format your response as:
CORRECTED TEXT:
[corrected text here]

ISSUES FOUND:
- [issue 1]
- [issue 2]
etc.`;

    try {
      await streamChat({
        messages: [{ role: "user", content: prompt }],
        onDelta: (chunk) => setResult(prev => prev + chunk),
        onDone: () => {
          setIsLoading(false);
          toast.success("Grammar check complete!");
        }
      });
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to check grammar");
    }
  };

  return (
    <ToolPage
      title="Grammar Check"
      description="Check and correct grammar in your text"
    >
      <div className="space-y-6">
        <div>
          <Label>Input Text</Label>
          <Textarea
            placeholder="Enter text to check..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[200px] mt-2"
          />
        </div>

        <Button onClick={check} className="w-full" disabled={isLoading}>
          {isLoading ? "Checking..." : "Check Grammar"}
        </Button>

        {result && (
          <div>
            <Label>Result</Label>
            <Textarea
              value={result}
              readOnly
              className="min-h-[300px] mt-2"
            />
          </div>
        )}
      </div>
    </ToolPage>
  );
}
