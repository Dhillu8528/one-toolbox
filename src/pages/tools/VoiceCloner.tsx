import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mic, Upload, Volume2 } from "lucide-react";

export default function VoiceCloner() {
  const [text, setText] = useState("");
  const [recording, setRecording] = useState(false);
  const [hasVoiceSample, setHasVoiceSample] = useState(false);

  const startRecording = () => {
    setRecording(true);
    toast.success("Recording voice sample...");
    // Simulate recording
    setTimeout(() => {
      setRecording(false);
      setHasVoiceSample(true);
      toast.success("Voice sample captured!");
    }, 3000);
  };

  const uploadVoice = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "audio/*";
    input.onchange = () => {
      setHasVoiceSample(true);
      toast.success("Voice sample uploaded!");
    };
    input.click();
  };

  const clone = () => {
    if (!hasVoiceSample) {
      toast.error("Please record or upload a voice sample first");
      return;
    }
    if (!text) {
      toast.error("Please enter text to clone");
      return;
    }

    toast.success("Voice cloned! (Demo feature)");
  };

  return (
    <ToolPage
      title="Voice Cloner"
      description="Clone and generate speech in any voice"
    >
      <div className="space-y-6">
        <div>
          <Label>Voice Sample</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Button
              variant={recording ? "default" : "outline"}
              onClick={startRecording}
              disabled={recording}
              className="gap-2"
            >
              <Mic className="w-4 h-4" />
              {recording ? "Recording..." : "Record Voice"}
            </Button>
            <Button variant="outline" onClick={uploadVoice} className="gap-2">
              <Upload className="w-4 h-4" />
              Upload Audio
            </Button>
          </div>
          {hasVoiceSample && (
            <div className="text-sm text-green-600 mt-2">✓ Voice sample ready</div>
          )}
        </div>

        <div>
          <Label>Text to Generate</Label>
          <Textarea
            placeholder="Enter text to speak in cloned voice..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[150px] mt-2"
          />
        </div>

        <Button onClick={clone} className="w-full gap-2">
          <Volume2 className="w-4 h-4" />
          Generate Cloned Voice
        </Button>

        <div className="text-xs text-muted-foreground text-center">
          Note: This is a demo feature. Real voice cloning requires advanced AI models.
        </div>
      </div>
    </ToolPage>
  );
}
