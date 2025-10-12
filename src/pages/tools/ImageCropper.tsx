"use client";
import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ImageCropper() {
  const [image, setImage] = useState<string | null>(null);
  const [cropped, setCropped] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const handleCrop = () => {
    if (!image) return;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const cropSize = Math.min(img.width, img.height);
      canvas.width = cropSize;
      canvas.height = cropSize;
      ctx.drawImage(img, 0, 0, cropSize, cropSize, 0, 0, cropSize, cropSize);
      setCropped(canvas.toDataURL("image/png"));
    };
  };

  return (
    <ToolPage
      title="Image Cropper"
      description="Crop your images to a perfect square instantly"
    >
      <div className="space-y-4">
        <Input type="file" accept="image/*" onChange={handleImageUpload} />
        <Button onClick={handleCrop}>Crop</Button>

        {cropped && (
          <div className="mt-4">
            <img src={cropped} alt="Cropped" className="rounded-lg shadow-md" />
            <a href={cropped} download="cropped.png">
              <Button className="mt-2 w-full">Download Cropped Image</Button>
            </a>
          </div>
        )}
      </div>
    </ToolPage>
  );
}
