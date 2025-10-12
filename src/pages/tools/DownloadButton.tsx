import React from "react";


export default function DownloadButton({ onClick, children }: { onClick: () => void; children?: React.ReactNode }) {
return (
<button onClick={onClick} className="px-4 py-2 bg-primary text-white rounded w-full">
{children}
</button>
);
}