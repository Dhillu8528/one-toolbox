import React, { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import FileUploader from "@/components/FileUploader";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";


export default function PDFMerge() {
const [files, setFiles] = useState<File[]>([]);
const [loading, setLoading] = useState(false);


const onFiles = (f: File[]) => {
const pdfs = f.filter((x) => x.type === "application/pdf" || x.name.endsWith(".pdf"));
setFiles(pdfs);
};


const merge = async () => {
if (!files.length) return alert("Select two or more PDF files to merge.");
setLoading(true);
try {
const mergedPdf = await PDFDocument.create();


for (const file of files) {
const bytes = await file.arrayBuffer();
const pdf = await PDFDocument.load(bytes);
const copied = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
copied.forEach((p) => mergedPdf.addPage(p));
}


const out = await mergedPdf.save();
const blob = new Blob([out], { type: "application/pdf" });
saveAs(blob, "merged.pdf");
} catch (e) {
console.error(e);
alert("Merge failed. See console for details.");
} finally {
setLoading(false);
}
};


return (
<ToolPage title="Merge PDF" description="Merge multiple PDF files into one PDF">
<div className="space-y-6">
<FileUploader accept="application/pdf" multiple onFiles={onFiles} buttonText="Select PDFs to merge" />
<div>
<div className="text-sm text-muted-foreground">Selected files:</div>
<div className="grid gap-2 mt-2">
{files.map((f) => (
<Card key={f.name} className="p-2 flex justify-between items-center">
<div>{f.name}</div>
<div className="text-xs text-muted-foreground">{Math.round(f.size / 1024)} KB</div>
</Card>
))}
{!files.length && <div className="text-sm text-muted-foreground">No PDFs selected</div>}
</div>
</div>


<Button onClick={merge} disabled={loading || files.length < 2} className="w-full">
{loading ? "Merging..." : "Merge PDFs"}
</Button>
</div>
</ToolPage>
);
}