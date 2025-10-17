import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { streamChat } from "@/lib/ai";

export default function PoemGenerator() {
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("rhyme");
  const [poem, setPoem] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generate = async () => {
    if (!topic) {
      toast.error("Please enter a topic");
      return;
    }

    setIsLoading(true);
    setPoem("");

    let styleInstruction = "";
    if (style === "rhyme") {
      styleInstruction = "Write a rhyming poem with consistent rhyme scheme (AABB or ABAB)";
    } else if (style === "haiku") {
      styleInstruction = "Write a traditional haiku (3 lines: 5-7-5 syllables)";
    } else {
      styleInstruction = "Write a free verse poem with natural flow and imagery";
    }

    const prompt = `${styleInstruction} about "${topic}". Make it beautiful and evocative.`;

    try {
      await streamChat({
        messages: [{ role: "user", content: prompt }],
        onDelta: (chunk) => setPoem(prev => prev + chunk),
        onDone: () => {
          setIsLoading(false);
          toast.success("Poem generated!");
        }
      });
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to generate poem");
    }
  };

  return (
    <ToolPage
      title="Poem Generator"
      description="Generate beautiful poems on any topic"
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
              <SelectItem value="rhyme">Rhyming</SelectItem>
              <SelectItem value="haiku">Haiku</SelectItem>
              <SelectItem value="free">Free Verse</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={generate} className="w-full" disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate Poem"}
        </Button>

        {poem && (
          <div>
            <Label>Your Poem</Label>
            <Textarea
              value={poem}
              readOnly
              className="min-h-[200px] mt-2 font-serif italic"
            />
          </div>
        )}
      </div>
    </ToolPage>
  );
}
