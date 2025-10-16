import React, { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";
import { toast } from "sonner";

export default function TxtToPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const onFiles = (f: File[]) => {
    const txt = f.find((x) => x.type === "text/plain" || x.name.endsWith(".txt"));
    if (txt) setFile(txt);
  };

  const convert = async () => {
    if (!file) return toast.error("Select a .txt file first");
    setLoading(true);
    try {
      const text = await file.text();
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      
      const lines = text.split("\n");
      const pageWidth = 595;
      const pageHeight = 842;
      const margin = 50;
      const fontSize = 12;
      const lineHeight = fontSize * 1.2;
      const maxLinesPerPage = Math.floor((pageHeight - 2 * margin) / lineHeight);

      let page = pdfDoc.addPage([pageWidth, pageHeight]);
      let yPosition = pageHeight - margin;
      let lineCount = 0;

      for (const line of lines) {
        if (lineCount >= maxLinesPerPage) {
          page = pdfDoc.addPage([pageWidth, pageHeight]);
          yPosition = pageHeight - margin;
          lineCount = 0;
        }

        page.drawText(line, {
          x: margin,
          y: yPosition,
          size: fontSize,
          font,
          color: rgb(0, 0, 0),
          maxWidth: pageWidth - 2 * margin,
        });

        yPosition -= lineHeight;
        lineCount++;
      }

      const pdfBytes = await pdfDoc.save();
      saveAs(
        new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" }),
        file.name.replace(/\.txt$/i, "") + ".pdf"
      );
      
      toast.success("Converted to PDF successfully!");
    } catch (e) {
      console.error(e);
      toast.error("Failed to convert text to PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolPage title="Txt to PDF" description="Convert plain text files to PDF format">
      <div className="space-y-4">
        <FileUploader accept=".txt,text/plain" onFiles={onFiles} buttonText="Select .txt file" />
        {file && <div className="text-sm">Selected: {file.name}</div>}
        
        <Button onClick={convert} className="w-full" disabled={!file || loading}>
          {loading ? "Converting..." : "Convert to PDF"}
        </Button>
      </div>
    </ToolPage>
  );
}
