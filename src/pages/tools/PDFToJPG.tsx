import React, { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import JSZip from "jszip";
// @ts-ignore - worker asset import
import workerSrc from "pdfjs-dist/build/pdf.worker.mjs?url";
import * as pdfjsLib from "pdfjs-dist";
import { saveAs } from "file-saver";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc as any;

export default function PDFToJPG() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const onFiles = (f: File[]) => {
    const pdf = f.find((x) => x.type === "application/pdf" || x.name.toLowerCase().endsWith(".pdf"));
    if (pdf) setFile(pdf);
  };

  const convert = async () => {
    if (!file) return toast.error("Select a PDF first");
    setLoading(true);
    try {
      const ab = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: ab }).promise;
      const zip = new JSZip();

      for (let p = 1; p <= pdf.numPages; p++) {
        const page = await pdf.getPage(p);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: ctx as any, viewport, canvas } as any).promise;
        const blob: Blob = await new Promise((resolve) => canvas.toBlob((b) => resolve(b!), "image/jpeg", 0.92));
        const arrayBuffer = await blob.arrayBuffer();
        zip.file(`page-${p}.jpg`, arrayBuffer);
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const outName = file.name.replace(/\.pdf$/i, "") + "-pages.zip";
      saveAs(zipBlob, outName);
      toast.success("Exported all pages as JPG in a ZIP file");
    } catch (e) {
      console.error(e);
      toast.error("Failed to convert PDF to JPG");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolPage title="PDF to JPG" description="Export each PDF page as a JPG image (downloaded as ZIP)">
      <div className="space-y-4">
        <FileUploader accept="application/pdf" onFiles={onFiles} buttonText="Select PDF" />
        {file && <div className="text-sm">Selected: {file.name}</div>}
        <Button onClick={convert} className="w-full" disabled={!file || loading}>
          {loading ? "Converting..." : "Convert to JPG"}
        </Button>
      </div>
    </ToolPage>
  );
}
