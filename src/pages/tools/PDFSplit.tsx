import React, { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import FileUploader from "@/components/FileUploader";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";


export default function PDFSplit() {
const [file, setFile] = useState<File | null>(null);
const [start, setStart] = useState(1);
const [end, setEnd] = useState(1);


const onFiles = (f: File[]) => {
const pdf = f.find((x) => x.type === "application/pdf" || x.name.endsWith(".pdf"));
if (pdf) setFile(pdf);
};


const split = async () => {
if (!file) return alert("Select a PDF first");
const bytes = await file.arrayBuffer();
const src = await PDFDocument.load(bytes);
const total = src.getPageCount();
if (start < 1 || end > total || start > end) return alert(`Range invalid: 1-${total}`);


const out = await PDFDocument.create();
const indices = [] as number[];
for (let i = start - 1; i <= end - 1; i++) indices.push(i);
const pages = await out.copyPages(src, indices);
pages.forEach((p) => out.addPage(p));
const saved = await out.save();
saveAs(new Blob([saved], { type: "application/pdf" }), `${file.name.replace(/\.pdf$/,"")}-pages-${start}-${end}.pdf`);
};


return (
<ToolPage title="Split PDF" description="Extract a range of pages from a PDF">
<div className="space-y-4">
<FileUploader accept="application/pdf" onFiles={onFiles} buttonText="Select a PDF to split" />
{file && <div className="text-sm">Selected: {file.name}</div>}
<div className="grid grid-cols-2 gap-2">
<input type="number" value={start} onChange={(e) => setStart(Number(e.target.value))} className="p-2 border rounded" />
<input type="number" value={end} onChange={(e) => setEnd(Number(e.target.value))} className="p-2 border rounded" />
</div>
<Button onClick={split} className="w-full">Split PDF</Button>
</div>
</ToolPage>
);
}