import React, { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { saveAs } from "file-saver";
// pdfjs for text extraction
// @ts-ignore - worker asset import
import workerSrc from "pdfjs-dist/build/pdf.worker.min.js?url";
import * as pdfjsLib from "pdfjs-dist";
import { Document, Packer, Paragraph, HeadingLevel, TextRun } from "docx";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc as any;

export default function PDFToWord() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const onFiles = (f: File[]) => {
    const pdf = f.find((x) => x.type === "application/pdf" || x.name.endsWith(".pdf"));
    if (pdf) setFile(pdf);
  };

  const convert = async () => {
    if (!file) return alert("Select a PDF first");
    setLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      const sections: any[] = [];

      for (let p = 1; p <= pdf.numPages; p++) {
        const page = await pdf.getPage(p);
        const content = await page.getTextContent();
        const text = content.items
          // @ts-ignore
          .map((it) => (typeof it.str === "string" ? it.str : ""))
          .join(" ")
          .replace(/\s+/g, " ")
          .trim();

        const paragraphs: Paragraph[] = [];
        paragraphs.push(
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [new TextRun({ text: `Page ${p}`, bold: true })],
            spacing: { after: 200 },
          })
        );
        if (text) {
          // split into reasonable lines
          const chunks = text.match(/.{1,120}(\s|$)/g) || [text];
          chunks.forEach((line) => {
            paragraphs.push(new Paragraph({ children: [new TextRun(line.trim())] }));
          });
        } else {
          paragraphs.push(new Paragraph({ children: [new TextRun("(No extractable text on this page)")] }));
        }

        sections.push({ properties: {}, children: paragraphs });
      }

      const doc = new Document({ sections });
      const blob = await Packer.toBlob(doc);
      const outName = file.name.replace(/\.pdf$/i, "") + "-converted.docx";
      saveAs(blob, outName);
    } catch (e) {
      console.error(e);
      alert("Failed to convert PDF to Word. Some PDFs may not allow text extraction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolPage title="PDF to Word" description="Convert a PDF into an editable Word (.docx) file">
      <div className="space-y-4">
        <FileUploader accept="application/pdf" onFiles={onFiles} buttonText="Select PDF" />
        {file && <div className="text-sm">Selected: {file.name}</div>}
        <Button onClick={convert} className="w-full" disabled={!file || loading}>
          {loading ? "Converting..." : "Convert to Word"}
        </Button>
        <p className="text-xs text-muted-foreground">
          Note: This extracts text only. Complex layouts/images are not preserved.
        </p>
      </div>
    </ToolPage>
  );
}
