import { useState, useRef } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Upload, Download } from "lucide-react";
import { toast } from "sonner";

export default function ImageCompressor() {
  const [image, setImage] = useState<string | null>(null);
  const [quality, setQuality] = useState([80]);
  const [compressedSize, setCompressedSize] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        compressImage(e.target?.result as string, quality[0]);
        toast.success("Image loaded!");
      };
      reader.readAsDataURL(file);
    }
  };

  const compressImage = (imgSrc: string, qual: number) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const sizeKB = (blob.size / 1024).toFixed(2);
          setCompressedSize(`${sizeKB} KB`);
        }
      }, "image/jpeg", qual / 100);
    };
    
    img.src = imgSrc;
  };

  const downloadImage = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "compressed-image.jpg";
    link.href = canvasRef.current.toDataURL("image/jpeg", quality[0] / 100);
    link.click();
    toast.success("Image downloaded!");
  };

  return (
    <ToolPage
      title="Image Compressor"
      description="Reduce image file size while maintaining quality"
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
          <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="gap-2">
            <Upload className="w-4 h-4" />
            Upload Image
          </Button>
        </div>

        {image && (
          <>
            <div>
              <Label>Quality: {quality[0]}%</Label>
              <Slider
                value={quality}
                onValueChange={(val) => {
                  setQuality(val);
                  compressImage(image, val[0]);
                }}
                max={100}
                min={1}
                step={1}
                className="mt-2"
              />
              <p className="text-sm text-muted-foreground mt-2">Compressed size: {compressedSize}</p>
            </div>

            <Button onClick={downloadImage} className="w-full gap-2">
              <Download className="w-4 h-4" />
              Download Compressed Image
            </Button>

            <div className="bg-muted/50 rounded-lg p-4 overflow-auto max-h-[400px]">
              <canvas ref={canvasRef} className="max-w-full h-auto" />
            </div>
          </>
        )}
      </div>
    </ToolPage>
  );
}
