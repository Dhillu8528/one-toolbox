import React, { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function OCRTool() {
  const [file, setFile] = useState<File | null>(null);

  const onFiles = (f: File[]) => {
    const img = f.find((x) => x.type.startsWith("image/"));
    if (img) setFile(img);
  };

  const extract = () => {
    toast.info("OCR functionality requires advanced AI processing. Feature coming soon with Lovable AI!");
  };

  return (
    <ToolPage title="OCR Tool" description="Extract text from images using optical character recognition">
      <div className="space-y-4">
        <FileUploader accept="image/*" onFiles={onFiles} buttonText="Select image" />
        {file && <div className="text-sm">Selected: {file.name}</div>}
        
        <Button onClick={extract} className="w-full" disabled={!file}>
          Extract Text
        </Button>
        
        <p className="text-xs text-muted-foreground">
          Note: OCR (Optical Character Recognition) will be available soon with AI-powered text extraction.
        </p>
      </div>
    </ToolPage>
  );
}
