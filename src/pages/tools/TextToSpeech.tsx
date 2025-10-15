import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Volume2, Square } from "lucide-react";

export default function TextToSpeech() {
  const [text, setText] = useState("");
  const [rate, setRate] = useState([1]);
  const [pitch, setPitch] = useState([1]);
  const [speaking, setSpeaking] = useState(false);

  const speak = () => {
    if (!text.trim()) {
      toast.error("Please enter text to speak");
      return;
    }

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate[0];
      utterance.pitch = pitch[0];
      
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
      toast.success("Speaking...");
    } else {
      toast.error("Text-to-speech not supported");
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
    toast.success("Stopped");
  };

  return (
    <ToolPage
      title="Text to Speech"
      description="Convert text into spoken audio"
    >
      <div className="space-y-6">
        <div>
          <Label>Text to Speak</Label>
          <Textarea
            placeholder="Enter text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[200px] mt-2"
          />
        </div>

        <div>
          <Label>Speed: {rate[0]}x</Label>
          <Slider
            value={rate}
            onValueChange={setRate}
            min={0.5}
            max={2}
            step={0.1}
            className="mt-2"
          />
        </div>

        <div>
          <Label>Pitch: {pitch[0]}</Label>
          <Slider
            value={pitch}
            onValueChange={setPitch}
            min={0.5}
            max={2}
            step={0.1}
            className="mt-2"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={speak} disabled={speaking} className="flex-1 gap-2">
            <Volume2 className="w-4 h-4" />
            Speak
          </Button>
          <Button onClick={stop} variant="outline" disabled={!speaking} className="flex-1 gap-2">
            <Square className="w-4 h-4" />
            Stop
          </Button>
        </div>
      </div>
    </ToolPage>
  );
}
