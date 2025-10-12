import React, { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import FileUploader from "@/components/FileUploader";
import imageCompression from "browser-image-compression";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";

export default function ImageCompress() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [maxSizeMB, setMaxSizeMB] = useState<number>(1);
  const [maxWH, setMaxWH] = useState<number>(1920);
  const [loading, setLoading] = useState(false);

  const onFiles = (f: File[]) => {
    const img = f.find((x) => x.type.startsWith("image/"));
    if (!img) return;
    setFile(img);
    setPreview(URL.createObjectURL(img));
  };

  const compress = async () => {
    if (!file) return alert("Choose an image first.");
    setLoading(true);
    try {
      const options = {
        maxSizeMB,
        maxWidthOrHeight: maxWH,
        useWebWorker: true,
      } as any;
      const compressed = await imageCompression(file, options);
      saveAs(compressed, file.name.replace(/\.[^/.]+$/, "") + "-compressed.jpg");
    } catch (err) {
      console.error(err);
      alert("Compression failed — see console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolPage title="Compress Image" description="Compress images in the browser (client-side)">
      <div className="space-y-4">
        <FileUploader accept="image/*" onFiles={onFiles} buttonText="Select image to compress" />
        {preview && <img src={preview} alt="preview" className="max-w-full rounded-md" />}
        <div className="grid grid-cols-2 gap-2">
          <label className="flex flex-col">
            <span className="text-sm">Max size (MB)</span>
            <input className="p-2 border rounded" type="number" step="0.1" value={maxSizeMB} onChange={(e) => setMaxSizeMB(Number(e.target.value))} />
          </label>
          <label className="flex flex-col">
            <span className="text-sm">Max width/height (px)</span>
            <input className="p-2 border rounded" type="number" value={maxWH} onChange={(e) => setMaxWH(Number(e.target.value))} />
          </label>
        </div>

        <Button onClick={compress} disabled={!file || loading} className="w-full">
          {loading ? "Compressing..." : "Compress & Download"}
        </Button>
      </div>
    </ToolPage>
  );
}
