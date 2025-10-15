import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Copy } from "lucide-react";

export default function HashtagGenerator() {
  const [keyword, setKeyword] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);

  const generate = () => {
    if (!keyword) {
      toast.error("Please enter a keyword");
      return;
    }

    const variations = [
      keyword.toLowerCase(),
      keyword + "life",
      keyword + "vibes",
      keyword + "daily",
      keyword + "gram",
      "the" + keyword,
      keyword + "lover",
      keyword + "addict",
      keyword + "goals",
      "love" + keyword,
    ];

    setHashtags(variations.map(v => "#" + v.replace(/\s/g, "")));
    toast.success("Hashtags generated!");
  };

  const copyAll = () => {
    navigator.clipboard.writeText(hashtags.join(" "));
    toast.success("All hashtags copied!");
  };

  return (
    <ToolPage
      title="Hashtag Generator"
      description="Generate trending hashtags for social media"
    >
      <div className="space-y-6">
        <div>
          <Label>Keyword</Label>
          <Input
            placeholder="Enter keyword..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="mt-2"
          />
        </div>

        <Button onClick={generate} className="w-full">Generate Hashtags</Button>

        {hashtags.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Generated Hashtags</Label>
              <Button variant="outline" size="sm" onClick={copyAll}>
                <Copy className="w-4 h-4 mr-2" />
                Copy All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {hashtags.map((tag, i) => (
                <Badge key={i} variant="secondary" className="text-sm px-3 py-1">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolPage>
  );
}
