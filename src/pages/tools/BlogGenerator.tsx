import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function BlogGenerator() {
  const [title, setTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState("professional");
  const [blog, setBlog] = useState("");

  const templates = {
    professional: `# {title}\n\nIn today's digital landscape, {keywords} have become increasingly important. This comprehensive guide explores the key aspects you need to understand.\n\n## Introduction\n\nLet's dive deep into {keywords} and discover practical insights that can transform your approach.\n\n## Key Takeaways\n\n- Understanding the fundamentals\n- Implementing best practices\n- Achieving measurable results`,
    casual: `# {title}\n\nHey there! Let's talk about {keywords} - it's actually pretty cool when you get into it.\n\n## What's the Deal?\n\nSo here's the thing about {keywords}: they're more interesting than you might think. Let me break it down for you in a way that actually makes sense.\n\n## Bottom Line\n\nAt the end of the day, {keywords} matter, and here's why you should care.`,
    technical: `# {title}\n\n## Abstract\n\nThis article provides an in-depth analysis of {keywords}, examining the underlying mechanisms and implementation strategies.\n\n## Methodology\n\nOur approach to {keywords} leverages industry-standard protocols and evidence-based practices.\n\n## Conclusion\n\nThe data demonstrates that {keywords} represent a significant advancement in the field.`,
  };

  const generate = () => {
    if (!title || !keywords) {
      toast.error("Please fill in all fields");
      return;
    }

    const generated = templates[tone as keyof typeof templates]
      .replace(/{title}/g, title)
      .replace(/{keywords}/g, keywords);
    
    setBlog(generated);
    toast.success("Blog post generated!");
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

        <Button onClick={generate} className="w-full">Generate Blog Post</Button>

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
