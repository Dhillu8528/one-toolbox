import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { streamChat } from "@/lib/ai";

export default function StoryWriter() {
  const [character, setCharacter] = useState("");
  const [setting, setSetting] = useState("");
  const [genre, setGenre] = useState("adventure");
  const [story, setStory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generate = async () => {
    if (!character || !setting) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setStory("");

    const prompt = `Write an engaging ${genre} story about "${character}" set in "${setting}". 
    
Make it creative, vivid, and at least 300 words. Include dialogue, descriptive details, and an interesting plot.`;

    try {
      await streamChat({
        messages: [{ role: "user", content: prompt }],
        onDelta: (chunk) => setStory(prev => prev + chunk),
        onDone: () => {
          setIsLoading(false);
          toast.success("Story generated!");
        }
      });
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to generate story");
    }
  };

  return (
    <ToolPage
      title="Story Writer"
      description="Create engaging stories with AI assistance"
    >
      <div className="space-y-6">
        <div>
          <Label>Main Character</Label>
          <Input
            placeholder="Enter character name..."
            value={character}
            onChange={(e) => setCharacter(e.target.value)}
            className="mt-2"
          />
        </div>

        <div>
          <Label>Setting</Label>
          <Input
            placeholder="Enter setting..."
            value={setting}
            onChange={(e) => setSetting(e.target.value)}
            className="mt-2"
          />
        </div>

        <div>
          <Label>Genre</Label>
          <Select value={genre} onValueChange={setGenre}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="adventure">Adventure</SelectItem>
              <SelectItem value="mystery">Mystery</SelectItem>
              <SelectItem value="romance">Romance</SelectItem>
              <SelectItem value="scifi">Sci-Fi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={generate} className="w-full" disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate Story"}
        </Button>

        {story && (
          <div>
            <Label>Your Story</Label>
            <Textarea
              value={story}
              readOnly
              className="min-h-[200px] mt-2"
            />
          </div>
        )}
      </div>
    </ToolPage>
  );
}
