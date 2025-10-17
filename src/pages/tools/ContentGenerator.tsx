import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { streamChat } from "@/lib/ai";

export default function ContentGenerator() {
  const [topic, setTopic] = useState("");
  const [type, setType] = useState("paragraph");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generate = async () => {
    if (!topic) {
      toast.error("Please enter a topic");
      return;
    }

    setIsLoading(true);
    setContent("");

    let prompt = "";
    if (type === "paragraph") {
      prompt = `Write an informative paragraph about ${topic}. Make it detailed and engaging.`;
    } else if (type === "listicle") {
      prompt = `Create a listicle about ${topic}. Include at least 7 items with brief descriptions for each.`;
    } else if (type === "howto") {
      prompt = `Write a how-to guide about ${topic}. Include detailed step-by-step instructions.`;
    }

    try {
      await streamChat({
        messages: [{ role: "user", content: prompt }],
        onDelta: (chunk) => setContent(prev => prev + chunk),
        onDone: () => {
          setIsLoading(false);
          toast.success("Content generated!");
        }
      });
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to generate content");
    }
  };

  return (
    <ToolPage
      title="Content Generator"
      description="Generate content for blogs, articles, and more"
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
          <Label>Content Type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paragraph">Paragraph</SelectItem>
              <SelectItem value="listicle">Listicle</SelectItem>
              <SelectItem value="howto">How-to Guide</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={generate} className="w-full" disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate Content"}
        </Button>

        {content && (
          <div>
            <Label>Generated Content</Label>
            <Textarea
              value={content}
              readOnly
              className="min-h-[200px] mt-2"
            />
          </div>
        )}
      </div>
    </ToolPage>
  );
}
