import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function LoremIpsum() {
  const [paragraphs, setParagraphs] = useState([3]);
  const [text, setText] = useState("");

  const loremText = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
  ];

  const generate = () => {
    let result = "";
    for (let i = 0; i < paragraphs[0]; i++) {
      result += loremText[i % loremText.length] + "\n\n";
    }
    setText(result.trim());
    toast.success("Lorem Ipsum generated!");
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <ToolPage
      title="Lorem Ipsum Generator"
      description="Generate placeholder text for your designs"
    >
      <div className="space-y-6">
        <div>
          <Label>Number of Paragraphs: {paragraphs[0]}</Label>
          <Slider
            value={paragraphs}
            onValueChange={setParagraphs}
            max={10}
            min={1}
            step={1}
            className="mt-2"
          />
        </div>

        <Button onClick={generate} className="w-full">Generate Lorem Ipsum</Button>

        {text && (
          <>
            <div className="flex justify-between items-center">
              <Label>Generated Text</Label>
              <Button variant="outline" size="sm" onClick={copyText} className="gap-2">
                <Copy className="w-3 h-3" />
                Copy
              </Button>
            </div>
            <Textarea
              value={text}
              readOnly
              className="min-h-[300px] text-base"
            />
          </>
        )}
      </div>
    </ToolPage>
  );
}
