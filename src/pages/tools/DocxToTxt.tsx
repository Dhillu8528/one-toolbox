import React, { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
// @ts-ignore
import * as mammoth from "mammoth/mammoth.browser";
import { saveAs } from "file-saver";

export default function DocxToTxt() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

  const onFiles = (f: File[]) => {
    const docx = f.find((x) => 
      x.name.toLowerCase().endsWith(".docx") || 
      x.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    if (docx) setFile(docx);
  };

  const convert = async () => {
    if (!file) return toast.error("Select a .docx file first");
    setLoading(true);
    try {
      const buffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer: buffer });
      setText(result.value || "");
      toast.success("Text extracted successfully!");
    } catch (e) {
      console.error(e);
      toast.error("Failed to extract text from document");
    } finally {
      setLoading(false);
    }
  };

  const downloadText = () => {
    const blob = new Blob([text], { type: "text/plain" });
    saveAs(blob, file!.name.replace(/\.docx$/i, "") + ".txt");
  };

  return (
    <ToolPage title="Docx to Txt" description="Extract plain text from Word documents">
      <div className="space-y-4">
        <FileUploader 
          accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
          onFiles={onFiles} 
          buttonText="Select .docx file" 
        />
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
