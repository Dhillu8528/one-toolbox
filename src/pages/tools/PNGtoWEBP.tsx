// src/pages/tools/PNGtoWEBP.tsx
import React, { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { saveAs } from "file-saver";

/**
 * Convert images to WebP (client-side). Note: not all browsers support WebP encoding;
 * modern browsers do. The output will be .webp
 */

export default function PNGtoWEBP() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(0.9);

  const onFiles = (f: File[]) => {
    const img = f.find((x) => x.type.startsWith("image/"));
    if (!img) return;
    setFile(img);
    setPreview(URL.createObjectURL(img));
  };

  const convert = async () => {
    if (!file || !preview) return alert("Select an image first.");
    const img = new Image();
    img.src = preview;
    await img.decode();

    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);

    // mimeType 'image/webp'
    canvas.toBlob(
      (blob) => {
        if (!blob) return alert("Conversion failed (browser may not support WebP).");
        saveAs(blob, file.name.replace(/\.[^/.]+$/, "") + ".webp");
      },
      "image/webp",
      quality
    );
  };

  return (
    <ToolPage title="Image → WebP" description="Convert images (PNG/JPG) to WebP format">
      <div className="space-y-4">
        <FileUploader accept="image/*" onFiles={onFiles} buttonText="Select image to convert to WebP" />
        {preview && <img src={preview} className="max-w-full rounded" alt="preview" />}
        <label className="flex items-center gap-2">
          <span className="text-sm">Quality (0.1 - 1)</span>
          <input type="range" min={0.1} max={1} step={0.05} value={quality} onChange={(e) => setQuality(Number(e.target.value))} />
          <span className="text-sm">{quality}</span>
        </label>
        <Button onClick={convert} className="w-full">Convert to WebP</Button>
      </div>
    </ToolPage>
  );
}
