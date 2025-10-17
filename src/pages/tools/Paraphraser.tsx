import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { streamChat } from "@/lib/ai";

export default function Paraphraser() {
  const [text, setText] = useState("");
  const [paraphrased, setParaphrased] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const paraphrase = async () => {
    if (!text.trim()) {
      toast.error("Please enter text to paraphrase");
      return;
    }

    setIsLoading(true);
    setParaphrased("");

    const prompt = `Paraphrase the following text while maintaining its original meaning. Use different words and sentence structures:

${text}`;

    try {
      await streamChat({
        messages: [{ role: "user", content: prompt }],
        onDelta: (chunk) => setParaphrased(prev => prev + chunk),
        onDone: () => {
          setIsLoading(false);
          toast.success("Text paraphrased!");
        }
      });
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to paraphrase text");
    }
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

        <Button onClick={paraphrase} className="w-full" disabled={isLoading}>
          {isLoading ? "Paraphrasing..." : "Paraphrase"}
        </Button>

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
