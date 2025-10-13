import React, { useState } from "react";
import FileUploader from "@/components/FileUploader";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";
import { ToolPage } from "@/components/ToolPage";


export default function JPGToPDF() {
const [files, setFiles] = useState<File[]>([]);
const onFiles = (f: File[]) => setFiles(f.filter((x) => x.type.startsWith("image/")));


const convert = async () => {
if (!files.length) return alert("Choose images first");
const pdf = await PDFDocument.create();


for (const file of files) {
const imgBytes = await file.arrayBuffer();
const ext = file.type === "image/png" ? "png" : "jpeg";
const img = ext === "png" ? await pdf.embedPng(imgBytes) : await pdf.embedJpg(imgBytes);
const page = pdf.addPage([img.width, img.height]);
page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
}


const bytes = await pdf.save();
    saveAs(new Blob([new Uint8Array(bytes)], { type: "application/pdf" }), "images.pdf");
};


return (
<ToolPage title="JPG/PNG to PDF" description="Convert images into a single PDF document">
<div className="space-y-4">
<FileUploader accept="image/*" multiple onFiles={onFiles} buttonText="Select images" />
<Button onClick={convert} className="w-full">Create PDF</Button>
</div>
</ToolPage>
);
}