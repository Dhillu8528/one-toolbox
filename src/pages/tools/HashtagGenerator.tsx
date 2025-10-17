import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Copy } from "lucide-react";
import { streamChat } from "@/lib/ai";

export default function HashtagGenerator() {
  const [keyword, setKeyword] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generate = async () => {
    if (!keyword) {
      toast.error("Please enter a keyword");
      return;
    }

    setIsLoading(true);
    setHashtags([]);

    const prompt = `Generate 15 relevant and trending hashtags for "${keyword}". 
    
Format: Return only the hashtags, one per line, each starting with #. Include variations and related terms.`;

    let fullResponse = "";
    try {
      await streamChat({
        messages: [{ role: "user", content: prompt }],
        onDelta: (chunk) => {
          fullResponse += chunk;
        },
        onDone: () => {
          const lines = fullResponse.split('\n').filter(l => l.trim() && l.includes('#'));
          const hashtagList = lines.map(l => {
            const match = l.match(/#\w+/);
            return match ? match[0] : null;
          }).filter(h => h) as string[];
          setHashtags(hashtagList);
          setIsLoading(false);
          toast.success("Hashtags generated!");
        }
      });
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to generate hashtags");
    }
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

        <Button onClick={generate} className="w-full" disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate Hashtags"}
        </Button>

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
