import React, { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import { toast } from "sonner";

export default function UnlockPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onFiles = (f: File[]) => {
    const pdf = f.find((x) => x.type === "application/pdf" || x.name.endsWith(".pdf"));
    if (pdf) setFile(pdf);
  };

  const unlock = async () => {
    if (!file) return toast.error("Select a PDF first");
    if (!password) return toast.error("Enter password");
    
    setLoading(true);
    try {
      const bytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(bytes);
      
      const unlockedBytes = await pdfDoc.save();
      saveAs(
        new Blob([new Uint8Array(unlockedBytes)], { type: "application/pdf" }),
        file.name.replace(/\.pdf$/i, "") + "-unlocked.pdf"
      );
      
      toast.success("PDF unlocked successfully!");
      setPassword("");
    } catch (e: any) {
      console.error(e);
      if (e.message?.includes("password")) {
        toast.error("Incorrect password");
      } else {
        toast.error("Failed to unlock PDF");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolPage title="Unlock PDF" description="Remove password protection from PDF files">
      <div className="space-y-4">
        <FileUploader accept="application/pdf" onFiles={onFiles} buttonText="Select Protected PDF" />
        {file && <div className="text-sm">Selected: {file.name}</div>}
        
        <div>
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter PDF password"
          />
        </div>

        <Button onClick={unlock} className="w-full" disabled={!file || !password || loading}>
          {loading ? "Unlocking..." : "Unlock PDF"}
        </Button>
      </div>
    </ToolPage>
  );
}
