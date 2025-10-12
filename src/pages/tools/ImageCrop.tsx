// src/pages/tools/ImageCrop.tsx
import React, { useEffect, useRef, useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { saveAs } from "file-saver";

/**
 * Simple image crop tool.
 * - Loads an image preview into a canvas
 * - User can set crop box (x, y, width, height) or choose a preset aspect ratio (square, 16:9)
 * - Cropping is done client-side with canvas
 *
 * Note: This is a lightweight cropper (no drag UI). If you want draggable crop UI,
 * we can integrate a crop library (e.g., react-easy-crop) later.
 */

export default function ImageCrop() {
  const [file, setFile] = useState<File | null>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [imgWidth, setImgWidth] = useState<number>(0);
  const [imgHeight, setImgHeight] = useState<number>(0);

  // crop state (in image pixel coordinates)
  const [cropX, setCropX] = useState<number>(0);
  const [cropY, setCropY] = useState<number>(0);
  const [cropW, setCropW] = useState<number>(100);
  const [cropH, setCropH] = useState<number>(100);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!file) {
      setSrc(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setSrc(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgWidth(img.width);
      setImgHeight(img.height);
      // default crop to center half
      setCropW(Math.round(img.width / 2));
      setCropH(Math.round(img.height / 2));
      setCropX(Math.round(img.width / 4));
      setCropY(Math.round(img.height / 4));
    };
  }, [src]);

  const onFiles = (f: File[]) => {
    const img = f.find((x) => x.type.startsWith("image/"));
    if (!img) return;
    setFile(img);
  };

  const applyPreset = (ratio: "1:1" | "16:9" | "4:3") => {
    if (!imgWidth || !imgHeight) return;
    let w = imgWidth;
    let h = imgHeight;
    const [rw, rh] = ratio.split(":").map(Number);
    // Fit the biggest possible box with this aspect ratio inside image
    if (imgWidth / imgHeight > rw / rh) {
      // image is wider, limit width
      h = imgHeight;
      w = Math.round((imgHeight * rw) / rh);
    } else {
      w = imgWidth;
      h = Math.round((imgWidth * rh) / rw);
    }
    setCropW(w);
    setCropH(h);
    setCropX(Math.round((imgWidth - w) / 2));
    setCropY(Math.round((imgHeight - h) / 2));
  };

  const cropAndDownload = async () => {
    if (!src || !imgWidth || !imgHeight) return alert("No image loaded.");
    const img = new Image();
    img.src = src;
    await img.decode();

    const canvas = document.createElement("canvas");
    canvas.width = cropW;
    canvas.height = cropH;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

    canvas.toBlob((blob) => {
      if (!blob) return alert("Failed to crop image");
      saveAs(blob, (file?.name.replace(/\.[^/.]+$/, "") || "cropped") + ".jpg");
    }, "image/jpeg", 0.95);
  };

  return (
    <ToolPage title="Crop Image" description="Crop an image by specifying a crop box or choose an aspect preset">
      <div className="space-y-4">
        <FileUploader accept="image/*" onFiles={onFiles} buttonText="Select image to crop" />
        {src && (
          <div className="space-y-2">
            <div className="text-sm">Original: {imgWidth} x {imgHeight}px</div>
            <img ref={imgRef} src={src} alt="preview" className="max-w-full rounded" />
            <div className="grid grid-cols-2 gap-2">
              <label className="flex flex-col">
                <span className="text-sm">Crop X (px)</span>
                <input className="p-2 border rounded" type="number" value={cropX} onChange={(e) => setCropX(Number(e.target.value))} />
              </label>
              <label className="flex flex-col">
                <span className="text-sm">Crop Y (px)</span>
                <input className="p-2 border rounded" type="number" value={cropY} onChange={(e) => setCropY(Number(e.target.value))} />
              </label>
              <label className="flex flex-col">
                <span className="text-sm">Crop Width (px)</span>
                <input className="p-2 border rounded" type="number" value={cropW} onChange={(e) => setCropW(Number(e.target.value))} />
              </label>
              <label className="flex flex-col">
                <span className="text-sm">Crop Height (px)</span>
                <input className="p-2 border rounded" type="number" value={cropH} onChange={(e) => setCropH(Number(e.target.value))} />
              </label>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => applyPreset("1:1")}>Square</Button>
              <Button onClick={() => applyPreset("16:9")}>16:9</Button>
              <Button onClick={() => applyPreset("4:3")}>4:3</Button>
              <Button onClick={cropAndDownload}>Crop & Download</Button>
            </div>
          </div>
        )}
      </div>
    </ToolPage>
  );
}
