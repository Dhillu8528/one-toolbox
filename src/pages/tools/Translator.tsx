import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function Translator() {
  const [text, setText] = useState("");
  const [fromLang, setFromLang] = useState("en");
  const [toLang, setToLang] = useState("es");
  const [translated, setTranslated] = useState("");

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "ru", name: "Russian" },
    { code: "ja", name: "Japanese" },
    { code: "zh", name: "Chinese" },
    { code: "ar", name: "Arabic" },
  ];

  const translate = () => {
    if (!text) {
      toast.error("Please enter text to translate");
      return;
    }

    // Mock translation (in production, use real translation API)
    setTranslated(`[${toLang.toUpperCase()}] ${text}`);
    toast.success("Text translated!");
  };

  return (
    <ToolPage
      title="Translator"
      description="Translate text between multiple languages"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>From</Label>
            <Select value={fromLang} onValueChange={setFromLang}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>To</Label>
            <Select value={toLang} onValueChange={setToLang}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Text to Translate</Label>
          <Textarea
            placeholder="Enter text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[150px] mt-2"
          />
        </div>

        <Button onClick={translate} className="w-full">Translate</Button>

        {translated && (
          <div>
            <Label>Translation</Label>
            <Textarea
              value={translated}
              readOnly
              className="min-h-[150px] mt-2"
            />
          </div>
        )}
      </div>
    </ToolPage>
  );
}
