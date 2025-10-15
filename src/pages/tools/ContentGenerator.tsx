import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function ContentGenerator() {
  const [topic, setTopic] = useState("");
  const [type, setType] = useState("paragraph");
  const [content, setContent] = useState("");

  const templates = {
    paragraph: "This is a sample paragraph about {topic}. It provides informative content and detailed explanations to help readers understand the subject better.",
    listicle: "Top 5 Things About {topic}:\n\n1. First important point\n2. Second key aspect\n3. Third significant detail\n4. Fourth essential element\n5. Fifth crucial factor",
    howto: "How to {topic}:\n\nStep 1: Begin with the basics\nStep 2: Understand the fundamentals\nStep 3: Practice regularly\nStep 4: Learn from mistakes\nStep 5: Master the skill",
  };

  const generate = () => {
    if (!topic) {
      toast.error("Please enter a topic");
      return;
    }

    const generated = templates[type as keyof typeof templates].replace(/{topic}/g, topic);
    setContent(generated);
    toast.success("Content generated!");
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

        <Button onClick={generate} className="w-full">Generate Content</Button>

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
