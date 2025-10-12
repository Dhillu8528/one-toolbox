import React from "react";


type Props = {
accept?: string;
multiple?: boolean;
onFiles: (files: File[]) => void;
buttonText?: string;
className?: string;
};


export default function FileUploader({
accept,
multiple = false,
onFiles,
buttonText = "Choose file(s)",
className,
}: Props) {
const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
if (!e.target.files) return;
onFiles(Array.from(e.target.files));
e.currentTarget.value = ""; // reset so same file can be reselected
};


return (
<label className={`w-full block ${className || ""}`}>
<input
type="file"
accept={accept}
multiple={multiple}
onChange={handle}
className="hidden"
/>
<div className="w-full cursor-pointer px-4 py-3 border rounded-md text-center bg-muted/5">
{buttonText}
</div>
</label>
);
}