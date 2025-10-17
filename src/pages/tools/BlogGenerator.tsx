import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { streamChat } from "@/lib/ai";

export default function BlogGenerator() {
  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState("professional");
  const [blog, setBlog] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generate = async () => {
    if (!title || !keywords) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setBlog("");

    const prompt = `Write a ${tone} blog post about "${title}". Focus on these keywords: ${keywords}. 
    
Make it engaging, informative, and well-structured with proper headings and sections. Write at least 400 words.`;

    try {
      await streamChat({
        messages: [{ role: "user", content: prompt }],
        onDelta: (chunk) => setBlog(prev => prev + chunk),
        onDone: () => {
          setIsLoading(false);
          toast.success("Blog post generated!");
        }
      });
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to generate blog post");
    }
  };

  return (
    <ToolPage
      title="Blog Generator"
      description="Generate blog posts with AI"
    >
      <div className="space-y-6">
        <div>
          <Label>Blog Title</Label>
          <Input
            placeholder="Enter blog title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2"
          />
        </div>

        <div>
          <Label>Keywords</Label>
          <Input
            placeholder="Enter main keywords..."
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="mt-2"
          />
        </div>

        <div>
          <Label>Tone</Label>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={generate} className="w-full" disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate Blog Post"}
        </Button>

        {blog && (
          <div>
            <Label>Generated Blog Post</Label>
            <Textarea
              value={blog}
              readOnly
              className="min-h-[400px] mt-2 font-mono text-sm"
            />
          </div>
        )}
      </div>
    </ToolPage>
  );
}
