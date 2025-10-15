import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Copy } from "lucide-react";

export default function CaptionGenerator() {
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("casual");
  const [captions, setCaptions] = useState<string[]>([]);

  const templates = {
    casual: ["Just {topic} things 🌟", "Living my best {topic} life ✨", "{topic} vibes only 💫"],
    professional: ["Exploring {topic} professionally", "Professional insights on {topic}", "Deep dive into {topic}"],
    funny: ["{topic}? More like best thing ever! 😂", "When {topic} hits different 🤣", "POV: You discover {topic} 😅"],
    inspirational: ["Let {topic} inspire you today ✨", "{topic} - because dreams matter 🌟", "Your {topic} journey starts now 💪"],
  };

  const generate = () => {
    if (!topic) {
      toast.error("Please enter a topic");
      return;
    }

    const selected = templates[style as keyof typeof templates];
    const generated = selected.map(t => t.replace(/{topic}/g, topic));
    setCaptions(generated);
    toast.success("Captions generated!");
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

        <Button onClick={generate} className="w-full">Generate Captions</Button>

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
