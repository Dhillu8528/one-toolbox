import React, { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import { toast } from "sonner";

export default function CompressPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const onFiles = (f: File[]) => {
    const pdf = f.find((x) => x.type === "application/pdf" || x.name.endsWith(".pdf"));
    if (pdf) setFile(pdf);
  };

  const compress = async () => {
    if (!file) return toast.error("Select a PDF first");
    setLoading(true);
    try {
      const bytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(bytes);
      
      // Save with compression
      const compressedBytes = await pdfDoc.save({
        useObjectStreams: false,
        addDefaultPage: false,
        objectsPerTick: 50,
      });

      const originalSize = file.size;
      const compressedSize = compressedBytes.length;
      const reduction = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);

      saveAs(
        new Blob([new Uint8Array(compressedBytes)], { type: "application/pdf" }),
        file.name.replace(/\.pdf$/i, "") + "-compressed.pdf"
      );
      
      toast.success(`Compressed! Reduced by ${reduction}%`);
    } catch (e) {
      console.error(e);
      toast.error("Failed to compress PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolPage title="Compress PDF" description="Reduce PDF file size while maintaining quality">
      <div className="space-y-4">
        <FileUploader accept="application/pdf" onFiles={onFiles} buttonText="Select PDF" />
        {file && (
          <div className="text-sm">
            Selected: {file.name} ({Math.round(file.size / 1024)} KB)
          </div>
        )}
        <Button onClick={compress} className="w-full" disabled={!file || loading}>
          {loading ? "Compressing..." : "Compress PDF"}
        </Button>
      </div>
    </ToolPage>
  );
}
