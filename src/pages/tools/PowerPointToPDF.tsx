import React, { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function PowerPointToPDF() {
  const [file, setFile] = useState<File | null>(null);

  const onFiles = (f: File[]) => {
    const ppt = f.find((x) => 
      x.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
      x.type === "application/vnd.ms-powerpoint" ||
      x.name.endsWith(".pptx") ||
      x.name.endsWith(".ppt")
    );
    if (ppt) setFile(ppt);
  };

  const convert = () => {
    toast.info("PowerPoint to PDF conversion requires server-side processing. Feature coming soon!");
  };

  return (
    <ToolPage title="PowerPoint to PDF" description="Convert PowerPoint presentations to PDF format">
      <div className="space-y-4">
        <FileUploader 
          accept=".pptx,.ppt,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-powerpoint" 
          onFiles={onFiles} 
          buttonText="Select PowerPoint file" 
        />
        {file && <div className="text-sm">Selected: {file.name}</div>}
        
        <Button onClick={convert} className="w-full" disabled={!file}>
          Convert to PDF
        </Button>
        
        <p className="text-xs text-muted-foreground">
          Note: PowerPoint to PDF conversion requires advanced processing. This feature will be available soon with server-side support.
        </p>
      </div>
    </ToolPage>
  );
}
