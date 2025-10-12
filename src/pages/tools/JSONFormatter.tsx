import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function JSONFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      toast.success("JSON formatted!");
    } catch (e) {
      toast.error("Invalid JSON");
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      toast.success("JSON minified!");
    } catch (e) {
      toast.error("Invalid JSON");
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard!");
  };

  return (
    <ToolPage
      title="JSON Formatter"
      description="Format and validate JSON data"
    >
      <div className="space-y-6">
        <div>
          <Textarea
            placeholder="Paste your JSON here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[200px] font-mono text-sm"
          />
        </div>

        <div className="flex gap-3">
          <Button onClick={formatJSON} className="flex-1">Format JSON</Button>
          <Button onClick={minifyJSON} variant="secondary" className="flex-1">Minify JSON</Button>
        </div>

        {output && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Output</span>
              <Button variant="outline" size="sm" onClick={copyOutput} className="gap-2">
                <Copy className="w-3 h-3" />
                Copy
              </Button>
            </div>
            <Textarea
              value={output}
              readOnly
              className="min-h-[200px] font-mono text-sm bg-muted"
            />
          </div>
        )}
      </div>
    </ToolPage>
  );
}
