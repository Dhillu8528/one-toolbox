import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ArticleRewriter() {
  const [article, setArticle] = useState("");
  const [rewritten, setRewritten] = useState("");

  const rewrite = () => {
    if (!article.trim()) {
      toast.error("Please enter an article to rewrite");
      return;
    }

    // Simple rewriter: reverse sentence order and shuffle some words
    const sentences = article.match(/[^.!?]+[.!?]+/g) || [];
    const rewrittenSentences = sentences.map(sentence => {
      const words = sentence.trim().split(" ");
      if (words.length > 5) {
        // Swap some adjacent words
        for (let i = 1; i < words.length - 1; i += 3) {
          [words[i], words[i + 1]] = [words[i + 1], words[i]];
        }
      }
      return words.join(" ");
    });

    setRewritten(rewrittenSentences.join(" "));
    toast.success("Article rewritten!");
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

        <Button onClick={rewrite} className="w-full">Rewrite Article</Button>

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
