import React, { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
// @ts-ignore
import workerSrc from "pdfjs-dist/build/pdf.worker.mjs?url";
import * as pdfjsLib from "pdfjs-dist";
import { saveAs } from "file-saver";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc as any;

export default function PDFToText() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

  const onFiles = (f: File[]) => {
    const pdf = f.find((x) => x.type === "application/pdf" || x.name.endsWith(".pdf"));
    if (pdf) setFile(pdf);
  };

  const convert = async () => {
    if (!file) return toast.error("Select a PDF first");
    setLoading(true);
    try {
      const ab = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: ab }).promise;
      let fullText = "";

      for (let p = 1; p <= pdf.numPages; p++) {
        const page = await pdf.getPage(p);
        const content = await page.getTextContent();
        const pageText = content.items.map((item: any) => item.str).join(" ");
        fullText += `--- Page ${p} ---\n${pageText}\n\n`;
      }

      setText(fullText);
      toast.success("Text extracted successfully!");
    } catch (e) {
      console.error(e);
      toast.error("Failed to extract text from PDF");
    } finally {
      setLoading(false);
    }
  };

  const downloadText = () => {
    const blob = new Blob([text], { type: "text/plain" });
    saveAs(blob, file!.name.replace(/\.pdf$/i, "") + ".txt");
  };

  return (
    <ToolPage title="PDF to Text" description="Extract text content from PDF files">
      <div className="space-y-4">
        <FileUploader accept="application/pdf" onFiles={onFiles} buttonText="Select PDF" />
        {file && <div className="text-sm">Selected: {file.name}</div>}
        
        <Button onClick={convert} className="w-full" disabled={!file || loading}>
          {loading ? "Extracting..." : "Extract Text"}
        </Button>

        {text && (
          <>
            <textarea
              readOnly
              value={text}
              className="w-full h-64 p-4 border rounded-md font-mono text-sm"
            />
            <Button onClick={downloadText} className="w-full" variant="secondary">
              Download as .txt
            </Button>
          </>
        )}
      </div>
    </ToolPage>
  );
}
