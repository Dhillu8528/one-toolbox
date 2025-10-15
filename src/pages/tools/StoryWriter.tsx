import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function StoryWriter() {
  const [character, setCharacter] = useState("");
  const [setting, setSetting] = useState("");
  const [genre, setGenre] = useState("adventure");
  const [story, setStory] = useState("");

  const templates = {
    adventure: `Once upon a time, {character} embarked on a thrilling journey through {setting}. With courage in their heart, they faced countless challenges and discovered incredible treasures along the way.`,
    mystery: `In the depths of {setting}, {character} stumbled upon a puzzling mystery. Clues were scattered everywhere, and each discovery led to more questions than answers.`,
    romance: `Under the starlit sky of {setting}, {character} found something unexpected - a connection that would change everything. Their story was just beginning.`,
    scifi: `In a future world within {setting}, {character} made a discovery that would alter the course of humanity. Technology and mystery intertwined in ways never imagined.`,
  };

  const generate = () => {
    if (!character || !setting) {
      toast.error("Please fill in all fields");
      return;
    }

    const generated = templates[genre as keyof typeof templates]
      .replace(/{character}/g, character)
      .replace(/{setting}/g, setting);
    
    setStory(generated);
    toast.success("Story generated!");
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

        <Button onClick={generate} className="w-full">Generate Story</Button>

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
