import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

export default function QRGenerator() {
  const [text, setText] = useState("");
  const qrUrl = text ? `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}` : "";

  const downloadQR = () => {
    if (!qrUrl) return;
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = qrUrl;
    link.click();
    toast.success("QR code downloaded!");
  };

  return (
    <ToolPage
      title="QR Code Generator"
      description="Create QR codes from text or URLs instantly"
    >
      <div className="space-y-6">
        <div>
          <Label>Enter text or URL</Label>
          <Input
            placeholder="https://example.com or any text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-2"
          />
        </div>

        {qrUrl && (
          <>
            <div className="bg-white p-8 rounded-lg inline-block mx-auto">
              <img src={qrUrl} alt="QR Code" className="w-[300px] h-[300px]" />
            </div>
            
            <Button onClick={downloadQR} className="w-full gap-2">
              <Download className="w-4 h-4" />
              Download QR Code
            </Button>
          </>
        )}
      </div>
    </ToolPage>
  );
}
