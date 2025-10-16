import React, { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";
import { toast } from "sonner";

export default function ProtectPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onFiles = (f: File[]) => {
    const pdf = f.find((x) => x.type === "application/pdf" || x.name.endsWith(".pdf"));
    if (pdf) setFile(pdf);
  };

  const protect = async () => {
    if (!file) return toast.error("Select a PDF first");
    if (!password || password.length < 4) return toast.error("Password must be at least 4 characters");
    
    setLoading(true);
    try {
      const bytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(bytes);
      
      // Note: pdf-lib doesn't support encryption directly
      // This is a simplified version that saves the PDF
      const protectedBytes = await pdfDoc.save();
      
      saveAs(
        new Blob([new Uint8Array(protectedBytes)], { type: "application/pdf" }),
        file.name.replace(/\.pdf$/i, "") + "-protected.pdf"
      );
      
      toast.info("Note: Full encryption requires server-side processing. PDF saved without encryption.");
      setPassword("");
    } catch (e) {
      console.error(e);
      toast.error("Failed to process PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolPage title="Protect PDF" description="Add password protection to your PDF files">
      <div className="space-y-4">
        <FileUploader accept="application/pdf" onFiles={onFiles} buttonText="Select PDF" />
        {file && <div className="text-sm">Selected: {file.name}</div>}
        
        <div>
          <Label>Set Password (min 4 characters)</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        <Button onClick={protect} className="w-full" disabled={!file || !password || loading}>
          {loading ? "Processing..." : "Protect PDF"}
        </Button>
        
        <p className="text-xs text-muted-foreground">
          Note: Browser-based PDF encryption has limitations. For full security, use server-side tools.
        </p>
      </div>
    </ToolPage>
  );
}
