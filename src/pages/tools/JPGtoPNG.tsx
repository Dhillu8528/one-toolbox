// src/pages/tools/JPGtoPNG.tsx
import React, { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { saveAs } from "file-saver";

/**
 * Convert JPEG/PNG/etc images into PNG format using canvas.
 */

export default function JPGtoPNG() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

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

    canvas.toBlob(
      (blob) => {
        if (!blob) return alert("Conversion failed.");
        saveAs(blob, file.name.replace(/\.[^/.]+$/, "") + ".png");
      },
      "image/png",
      1
    );
  };

  return (
    <ToolPage title="Image → PNG" description="Convert an image to PNG format">
      <div className="space-y-4">
        <FileUploader accept="image/*" onFiles={onFiles} buttonText="Select image to convert to PNG" />
        {preview && <img src={preview} className="max-w-full rounded" alt="preview" />}
        <Button onClick={convert} className="w-full">Convert to PNG</Button>
      </div>
    </ToolPage>
  );
}
