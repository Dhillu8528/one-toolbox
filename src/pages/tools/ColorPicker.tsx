import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function ColorPickerTool() {
  const [color, setColor] = useState("#3b82f6");

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
      : "";
  };

  const hexToHsl = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return "";
    
    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;
    
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    } else {
      s = 0;
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const rgb = hexToRgb(color);
  const hsl = hexToHsl(color);

  return (
    <ToolPage
      title="Color Picker"
      description="Pick colors and get HEX, RGB, and HSL values"
    >
      <div className="space-y-6">
        <div className="flex justify-center">
          <div className="relative">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-64 h-64 cursor-pointer rounded-lg border-4 border-border"
            />
          </div>
        </div>

        <div className="space-y-4">
          {[
            { label: "HEX", value: color },
            { label: "RGB", value: rgb },
            { label: "HSL", value: hsl },
          ].map((format) => (
            <div key={format.label}>
              <Label>{format.label}</Label>
              <div className="flex gap-2 mt-2">
                <Input value={format.value} readOnly className="font-mono" />
                <Button variant="outline" size="icon" onClick={() => copy(format.value)}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToolPage>
  );
}
