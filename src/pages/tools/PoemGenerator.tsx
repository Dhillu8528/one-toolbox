import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function PoemGenerator() {
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("rhyme");
  const [poem, setPoem] = useState("");

  const templates = {
    rhyme: `Roses are red, violets are {topic},\nIn my heart, you're always true,\nThe world is bright when I think of {topic}.`,
    haiku: `{topic} in spring\nGentle whispers through the trees\nPeace fills the moment`,
    free: `Oh {topic}, how you inspire\nIn every thought and every dream\nYou lift me higher and higher\nLike a never-ending stream`,
  };

  const generate = () => {
    if (!topic) {
      toast.error("Please enter a topic");
      return;
    }

    const generated = templates[style as keyof typeof templates].replace(/{topic}/g, topic);
    setPoem(generated);
    toast.success("Poem generated!");
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

        <Button onClick={generate} className="w-full">Generate Poem</Button>

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
