import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Copy } from "lucide-react";
import { streamChat } from "@/lib/ai";

export default function CaptionGenerator() {
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("casual");
  const [captions, setCaptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generate = async () => {
    if (!topic) {
      toast.error("Please enter a topic");
      return;
    }

    setIsLoading(true);
    setCaptions([]);

    const prompt = `Generate 5 engaging social media captions about "${topic}" in a ${style} style. 
    
Format: Return exactly 5 captions, one per line, numbered 1-5.`;

    let fullResponse = "";
    try {
      await streamChat({
        messages: [{ role: "user", content: prompt }],
        onDelta: (chunk) => {
          fullResponse += chunk;
        },
        onDone: () => {
          const lines = fullResponse.split('\n').filter(l => l.trim());
          const captionList = lines.map(l => l.replace(/^\d+\.\s*/, '').trim()).filter(l => l);
          setCaptions(captionList.slice(0, 5));
          setIsLoading(false);
          toast.success("Captions generated!");
        }
      });
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to generate captions");
    }
  };

  const copy = (caption: string) => {
    navigator.clipboard.writeText(caption);
    toast.success("Caption copied!");
  };

  return (
    <ToolPage
      title="Caption Generator"
      description="Generate engaging social media captions"
    >
      <div className="space-y-6">
        <div>
          <Label>Topic</Label>
          <Input
            placeholder="Enter topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mt-2"
          />
        </div>

        <div>
          <Label>Style</Label>
          <Select value={style} onValueChange={setStyle}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="funny">Funny</SelectItem>
              <SelectItem value="inspirational">Inspirational</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={generate} className="w-full" disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate Captions"}
        </Button>

        {captions.length > 0 && (
          <div className="space-y-2">
            <Label>Generated Captions</Label>
            {captions.map((caption, i) => (
              <div key={i} className="flex gap-2 items-center">
                <div className="flex-1 p-3 bg-muted rounded-lg">{caption}</div>
                <Button variant="outline" size="icon" onClick={() => copy(caption)}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolPage>
  );
}
