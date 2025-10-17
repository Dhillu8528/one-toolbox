import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { streamChat } from "@/lib/ai";

export default function ArticleRewriter() {
  const [article, setArticle] = useState("");
  const [rewritten, setRewritten] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const rewrite = async () => {
    if (!article.trim()) {
      toast.error("Please enter an article to rewrite");
      return;
    }

    setIsLoading(true);
    setRewritten("");

    const prompt = `Rewrite the following article with fresh wording while preserving the key information and meaning. Make it engaging and unique:

${article}`;

    try {
      await streamChat({
        messages: [{ role: "user", content: prompt }],
        onDelta: (chunk) => setRewritten(prev => prev + chunk),
        onDone: () => {
          setIsLoading(false);
          toast.success("Article rewritten!");
        }
      });
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to rewrite article");
    }
  };

  return (
    <ToolPage
      title="Article Rewriter"
      description="Rewrite articles while maintaining meaning"
    >
      <div className="space-y-6">
        <div>
          <Label>Original Article</Label>
          <Textarea
            placeholder="Paste your article here..."
            value={article}
            onChange={(e) => setArticle(e.target.value)}
            className="min-h-[250px] mt-2"
          />
        </div>

        <Button onClick={rewrite} className="w-full" disabled={isLoading}>
          {isLoading ? "Rewriting..." : "Rewrite Article"}
        </Button>

        {rewritten && (
          <div>
            <Label>Rewritten Article</Label>
            <Textarea
              value={rewritten}
              readOnly
              className="min-h-[250px] mt-2"
            />
          </div>
        )}
      </div>
    </ToolPage>
  );
}
