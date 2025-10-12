import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Link2 } from "lucide-react";
import { toast } from "sonner";

export default function URLShortener() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const shortenURL = () => {
    if (!url) {
      toast.error("Please enter a URL");
      return;
    }

    // Simple mock shortener - in production, use a real URL shortening service
    const hash = Math.random().toString(36).substring(2, 8);
    setShortUrl(`https://short.link/${hash}`);
    toast.success("URL shortened!");
  };

  const copyShortURL = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Copied to clipboard!");
  };

  return (
    <ToolPage
      title="URL Shortener"
      description="Shorten long URLs into compact links"
    >
      <div className="space-y-6">
        <div>
          <Label>Enter URL</Label>
          <Input
            placeholder="https://example.com/very/long/url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="mt-2"
          />
        </div>

        <Button onClick={shortenURL} className="w-full gap-2">
          <Link2 className="w-4 h-4" />
          Shorten URL
        </Button>

        {shortUrl && (
          <div>
            <Label>Shortened URL</Label>
            <div className="flex gap-2 mt-2">
              <Input value={shortUrl} readOnly className="font-mono" />
              <Button variant="outline" size="icon" onClick={copyShortURL}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </ToolPage>
  );
}
