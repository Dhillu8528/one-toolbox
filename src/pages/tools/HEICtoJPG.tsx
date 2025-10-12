// src/pages/tools/HEICtoJPG.tsx
import React, { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { saveAs } from "file-saver";

/**
 * HEIC -> JPG converter (best-effort):
 * - Tries to dynamically import 'heic2any' (npm package).
 * - If heic2any isn't installed or browser doesn't support, displays fallback instructions.
 *
 * NOTE: heic2any uses browser conversion and may be heavy. Server-side conversion
 * (libheif/Imagemagick) is more reliable for production.
 */

export default function HEICtoJPG() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onFiles = (f: File[]) => {
    const found = f.find((x) => x.name.toLowerCase().endsWith(".heic") || x.type === "image/heic");
    if (!found) {
      setMessage("Please select a .heic file.");
      return;
    }
    setFile(found);
    setMessage(null);
  };

  const convert = async () => {
    if (!file) return alert("Pick a HEIC file first.");
    setLoading(true);
    setMessage(null);
    try {
      // try dynamic import of heic2any
      // If the package is not installed this will throw
      // npm: heic2any
      // if you want, run: npm i heic2any
      // types: no official types — using any
      // We use dynamic import so the rest of the site doesn't break if package missing
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const heic2any = await import("heic2any").catch(() => null);
      if (!heic2any) {
        setMessage("heic2any not installed. Please install `heic2any` (npm i heic2any) or use a server-side converter. See fallback instructions below.");
        setLoading(false);
        return;
      }

      const buffer = await file.arrayBuffer();
      const converted = await (heic2any as any)({
        blob: new Blob([buffer]),
        toType: "image/jpeg",
        quality: 0.9,
      });

      // heic2any may return a Blob or an array of Blobs
      if (Array.isArray(converted)) {
        // if multiple images (HEIC can contain multiple frames), download first
        saveAs(converted[0], file.name.replace(/\.heic$/i, "") + ".jpg");
      } else {
        saveAs(converted as Blob, file.name.replace(/\.heic$/i, "") + ".jpg");
      }
    } catch (err) {
      console.error(err);
      setMessage("Conversion failed in browser. Consider server-side conversion (imagemagick/libheif) or install `heic2any`.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolPage title="HEIC → JPG (best-effort)" description="Convert HEIC images to JPG in the browser (if supported)">
      <div className="space-y-4">
        <FileUploader accept=".heic,image/heic" onFiles={onFiles} buttonText="Select .heic file" />
        {file && <div className="text-sm">Selected: {file.name} ({Math.round(file.size / 1024)} KB)</div>}
        <Button onClick={convert} disabled={!file || loading} className="w-full">
          {loading ? "Converting..." : "Convert to JPG"}
        </Button>
        <div className="text-sm text-muted-foreground">
          {message || "If conversion fails, consider installing `heic2any` or using a server-side converter (libheif / ImageMagick / Sharp)."}
        </div>
      </div>
    </ToolPage>
  );
}
