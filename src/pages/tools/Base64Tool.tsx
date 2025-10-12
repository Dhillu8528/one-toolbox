import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const encode = () => {
    try {
      const encoded = btoa(input);
      setOutput(encoded);
      toast.success("Text encoded!");
    } catch (e) {
      toast.error("Encoding failed");
    }
  };

  const decode = () => {
    try {
      const decoded = atob(input);
      setOutput(decoded);
      toast.success("Text decoded!");
    } catch (e) {
      toast.error("Invalid Base64 string");
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard!");
  };

  return (
    <ToolPage
      title="Base64 Encoder/Decoder"
      description="Encode and decode Base64 strings"
    >
      <div className="space-y-6">
        <div>
          <Label>Input</Label>
          <Textarea
            placeholder="Enter text to encode or Base64 to decode..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[150px] font-mono text-sm mt-2"
          />
        </div>

        <div className="flex gap-3">
          <Button onClick={encode} className="flex-1">Encode to Base64</Button>
          <Button onClick={decode} variant="secondary" className="flex-1">Decode from Base64</Button>
        </div>

        {output && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label>Output</Label>
              <Button variant="outline" size="sm" onClick={copyOutput} className="gap-2">
                <Copy className="w-3 h-3" />
                Copy
              </Button>
            </div>
            <Textarea
              value={output}
              readOnly
              className="min-h-[150px] font-mono text-sm bg-muted"
            />
          </div>
        )}
      </div>
    </ToolPage>
  );
}
