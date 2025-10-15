import { useState, useRef } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mic, Square } from "lucide-react";

export default function SpeechToText() {
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error("Speech recognition not supported");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onstart = () => {
      setListening(true);
      toast.success("Listening...");
    };

    recognitionRef.current.onresult = (event: any) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setText(prev => prev + " " + transcript);
    };

    recognitionRef.current.onerror = () => {
      toast.error("Recognition error");
      setListening(false);
    };

    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
      toast.success("Stopped listening");
    }
  };

  return (
    <ToolPage
      title="Speech to Text"
      description="Convert spoken words into written text"
    >
      <div className="space-y-6">
        <div className="flex gap-2">
          <Button onClick={startListening} disabled={listening} className="flex-1 gap-2">
            <Mic className="w-4 h-4" />
            Start Recording
          </Button>
          <Button onClick={stopListening} variant="outline" disabled={!listening} className="flex-1 gap-2">
            <Square className="w-4 h-4" />
            Stop
          </Button>
        </div>

        {listening && (
          <div className="text-center text-sm text-muted-foreground animate-pulse">
            🎤 Listening...
          </div>
        )}

        <div>
          <Label>Transcription</Label>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Transcribed text will appear here..."
            className="min-h-[300px] mt-2"
          />
        </div>

        <Button onClick={() => setText("")} variant="outline" className="w-full">
          Clear
        </Button>
      </div>
    </ToolPage>
  );
}
