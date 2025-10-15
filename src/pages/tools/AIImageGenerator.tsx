import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function AIImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("realistic");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!prompt) {
      toast.error("Please enter a prompt");
      return;
    }

    setLoading(true);
    // Mock API call - in production, use real AI image generation API
    setTimeout(() => {
      const mockUrl = `https://picsum.photos/512/512?random=${Date.now()}`;
      setImageUrl(mockUrl);
      setLoading(false);
      toast.success("Image generated!");
    }, 2000);
  };

  return (
    <ToolPage
      title="AI Image Generator"
      description="Generate images from text descriptions"
    >
      <div className="space-y-6">
        <div>
          <Label>Image Prompt</Label>
          <Input
            placeholder="Describe the image you want to generate..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="mt-2"
          />
        </div>

        <div>
          <Label>Style</Label>
          <Select value={style} onValueChange={setStyle}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="realistic">Realistic</SelectItem>
              <SelectItem value="artistic">Artistic</SelectItem>
              <SelectItem value="anime">Anime</SelectItem>
              <SelectItem value="3d">3D Render</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={generate} disabled={loading} className="w-full gap-2">
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? "Generating..." : "Generate Image"}
        </Button>

        {imageUrl && (
          <div className="space-y-2">
            <Label>Generated Image</Label>
            <img src={imageUrl} alt="Generated" className="w-full rounded-lg border" />
          </div>
        )}
      </div>
    </ToolPage>
  );
}
