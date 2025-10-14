import React, { useRef, useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";

// @ts-ignore - mammoth types not bundled
import * as mammoth from "mammoth/mammoth.browser";
// @ts-ignore - html2pdf types not bundled
import html2pdf from "html2pdf.js";

export default function WordToPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [html, setHtml] = useState<string>("");
  const hiddenRef = useRef<HTMLDivElement>(null);

  const onFiles = (f: File[]) => {
    const docx = f.find((x) => x.name.toLowerCase().endsWith(".docx") || x.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    if (docx) setFile(docx);
  };

  const convert = async () => {
    if (!file) return alert("Select a .docx first");
    setLoading(true);
    try {
      const buffer = await file.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer: buffer });
      setHtml(result.value || "");

      // Wait for HTML to render in hidden container
      await new Promise((r) => setTimeout(r, 50));
      const node = hiddenRef.current;
      if (!node) throw new Error("Render target missing");

      const opt = {
        margin: 10,
        filename: file.name.replace(/\.docx$/i, "") + ".pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"] },
      } as any;

      await (html2pdf() as any).from(node).set(opt).save();
    } catch (e) {
      console.error(e);
      alert("Failed to convert Word to PDF. Make sure the file is a .docx document.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolPage title="Word to PDF" description="Convert a Word (.docx) document to PDF in your browser">
      <div className="space-y-4">
        <FileUploader accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onFiles={onFiles} buttonText="Select .docx" />
        {file && <div className="text-sm">Selected: {file.name}</div>}
        <Button onClick={convert} className="w-full" disabled={!file || loading}>
          {loading ? "Converting..." : "Convert to PDF"}
        </Button>

        {/* Offscreen render target for html2pdf - must be visible in layout */}
        <div style={{ position: "fixed", left: "-99999px", top: 0, width: "800px" }} ref={hiddenRef} dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </ToolPage>
  );
}
