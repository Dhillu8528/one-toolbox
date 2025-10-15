import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function GrammarCheck() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [issues, setIssues] = useState<string[]>([]);

  const check = () => {
    if (!text.trim()) {
      toast.error("Please enter text to check");
      return;
    }

    const foundIssues: string[] = [];
    let corrected = text;

    // Basic grammar checks
    if (text.includes("  ")) {
      foundIssues.push("Extra spaces found");
      corrected = corrected.replace(/\s+/g, " ");
    }
    if (!/[.!?]$/.test(text.trim())) {
      foundIssues.push("Missing ending punctuation");
      corrected += ".";
    }
    if (/\bi\b/.test(text)) {
      foundIssues.push("Lowercase 'i' should be capitalized");
      corrected = corrected.replace(/\bi\b/g, "I");
    }

    setIssues(foundIssues);
    setResult(corrected);
    toast.success(foundIssues.length > 0 ? `Found ${foundIssues.length} issues` : "No issues found!");
  };

  return (
    <ToolPage
      title="Grammar Check"
      description="Check and correct grammar in your text"
    >
      <div className="space-y-6">
        <div>
          <Label>Input Text</Label>
          <Textarea
            placeholder="Enter text to check..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[200px] mt-2"
          />
        </div>

        <Button onClick={check} className="w-full">Check Grammar</Button>

        {issues.length > 0 && (
          <div className="space-y-2">
            <Label>Issues Found</Label>
            {issues.map((issue, i) => (
              <div key={i} className="text-sm text-muted-foreground bg-muted p-2 rounded">
                • {issue}
              </div>
            ))}
          </div>
        )}

        {result && (
          <div>
            <Label>Corrected Text</Label>
            <Textarea
              value={result}
              readOnly
              className="min-h-[200px] mt-2"
            />
          </div>
        )}
      </div>
    </ToolPage>
  );
}
