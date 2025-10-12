import { useState, useRef } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Download } from "lucide-react";
import { toast } from "sonner";

export default function ImageResize() {
  const [image, setImage] = useState<string | null>(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        toast.success("Image loaded!");
      };
      reader.readAsDataURL(file);
    }
  };

  const resizeImage = () => {
    if (!image || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);
      toast.success("Image resized!");
    };
    
    img.src = image;
  };

  const downloadImage = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "resized-image.png";
    link.href = canvasRef.current.toDataURL();
    link.click();
    toast.success("Image downloaded!");
  };

  return (
    <ToolPage
      title="Image Resizer"
      description="Resize your images to custom dimensions"
    >
      <div className="space-y-6">
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="gap-2"
          >
            <Upload className="w-4 h-4" />
            Upload Image
          </Button>
        </div>

        {image && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Width (px)</Label>
                <Input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  min={1}
                />
              </div>
              <div>
                <Label>Height (px)</Label>
                <Input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  min={1}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={resizeImage} className="flex-1">
                Resize Image
              </Button>
              <Button onClick={downloadImage} variant="secondary" className="gap-2">
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 overflow-auto max-h-[400px]">
              <canvas ref={canvasRef} className="max-w-full h-auto" />
            </div>
          </>
        )}
      </div>
    </ToolPage>
  );
}
