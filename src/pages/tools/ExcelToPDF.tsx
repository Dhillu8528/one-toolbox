import React, { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ExcelToPDF() {
  const [file, setFile] = useState<File | null>(null);

  const onFiles = (f: File[]) => {
    const excel = f.find((x) => 
      x.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      x.type === "application/vnd.ms-excel" ||
      x.name.endsWith(".xlsx") ||
      x.name.endsWith(".xls")
    );
    if (excel) setFile(excel);
  };

  const convert = () => {
    toast.info("Excel to PDF conversion requires server-side processing. Feature coming soon!");
  };

  return (
    <ToolPage title="Excel to PDF" description="Convert Excel spreadsheets to PDF format">
      <div className="space-y-4">
        <FileUploader 
          accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" 
          onFiles={onFiles} 
          buttonText="Select Excel file" 
        />
        {file && <div className="text-sm">Selected: {file.name}</div>}
        
        <Button onClick={convert} className="w-full" disabled={!file}>
          Convert to PDF
        </Button>
        
        <p className="text-xs text-muted-foreground">
          Note: Excel to PDF conversion requires advanced processing. This feature will be available soon with server-side support.
        </p>
      </div>
    </ToolPage>
  );
}
