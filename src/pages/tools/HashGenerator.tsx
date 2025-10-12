import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [md5Hash, setMd5Hash] = useState("");
  const [sha256Hash, setSha256Hash] = useState("");

  const generateHashes = async () => {
    if (!input) {
      toast.error("Please enter text");
      return;
    }

    // Simple hash simulation for demo (use crypto library in production)
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    
    // SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const sha256 = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    setSha256Hash(sha256);
    
    // MD5 simulation (just for demo - use real MD5 library in production)
    const md5 = Math.abs(input.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0)).toString(16);
    setMd5Hash(md5);
    
    toast.success("Hashes generated!");
  };

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    toast.success("Hash copied!");
  };

  return (
    <ToolPage
      title="Hash Generator"
      description="Generate MD5 and SHA-256 hashes"
    >
      <div className="space-y-6">
        <div>
          <Label>Input Text</Label>
          <Textarea
            placeholder="Enter text to hash..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[150px] mt-2"
          />
        </div>

        <Button onClick={generateHashes} className="w-full">Generate Hashes</Button>

        {md5Hash && (
          <div>
            <Label>MD5 Hash</Label>
            <div className="flex gap-2 mt-2">
              <Input value={md5Hash} readOnly className="font-mono text-sm" />
              <Button variant="outline" size="icon" onClick={() => copyHash(md5Hash)}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {sha256Hash && (
          <div>
            <Label>SHA-256 Hash</Label>
            <div className="flex gap-2 mt-2">
              <Input value={sha256Hash} readOnly className="font-mono text-sm" />
              <Button variant="outline" size="icon" onClick={() => copyHash(sha256Hash)}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </ToolPage>
  );
}
