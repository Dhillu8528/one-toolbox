"use client";
import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function PDFRotate() {
  const [file, setFile] = useState<File | null>(null);
  const [angle, setAngle] = useState<number>(90);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

const handleRotate = async () => {
    if (!file) return alert("Please upload a PDF first.");

    const arrayBuffer = await file.arrayBuffer();
    const { PDFDocument, degrees } = await import("pdf-lib");
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();
    pages.forEach((page) => {
      const currentRotation = page.getRotation().angle;
      page.setRotation(degrees(currentRotation + angle));
    });
    const rotatedBytes = await pdfDoc.save();
    const blob = new Blob([new Uint8Array(rotatedBytes)], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "rotated.pdf";
    link.click();
  };

  return (
    <ToolPage title="Rotate PDF" description="Rotate all pages in your PDF easily">
      <div className="space-y-4">
        <Label>Upload PDF File</Label>
        <Input type="file" accept="application/pdf" onChange={handleFileChange} />
        <Label>Rotation Angle (degrees)</Label>
        <Input
          type="number"
          value={angle}
          onChange={(e) => setAngle(parseInt(e.target.value))}
          placeholder="90"
        />
        <Button onClick={handleRotate} className="w-full mt-2">
          Rotate PDF
        </Button>
      </div>
    </ToolPage>
  );
}
