import { useState, useRef } from "react";
import { ToolPage } from "@/components/ToolPage";
import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Download, Scissors } from "lucide-react";

export default function AudioCutter() {
  const [file, setFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("0");
  const [endTime, setEndTime] = useState<string>("10");
  const [outputUrl, setOutputUrl] = useState<string>("");
  const [cutting, setCutting] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleFileSelect = (files: File[]) => {
    const selectedFile = files[0];
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setAudioUrl(url);
  };

  const handleCut = async () => {
    if (!file || !audioRef.current) {
      toast.error("Please upload an audio file");
      return;
    }

    const start = parseFloat(startTime);
    const end = parseFloat(endTime);

    if (start >= end) {
      toast.error("Start time must be less than end time");
      return;
    }

    setCutting(true);
    try {
      const audio = audioRef.current;
      const audioContext = new AudioContext();
      const source = audioContext.createMediaElementSource(audio);
      const dest = audioContext.createMediaStreamDestination();
      source.connect(dest);

      const mediaRecorder = new MediaRecorder(dest.stream);
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setOutputUrl(url);
        toast.success("Audio cut successfully!");
      };

      audio.currentTime = start;
      await new Promise(resolve => audio.onseeked = resolve);

      mediaRecorder.start();
      audio.play();

      setTimeout(() => {
        audio.pause();
        mediaRecorder.stop();
      }, (end - start) * 1000);

    } catch (error) {
      toast.error("Cutting failed");
      console.error(error);
    } finally {
      setCutting(false);
    }
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = outputUrl;
    a.download = `cut_${file?.name}`;
    a.click();
  };

  return (
    <ToolPage
      title="Audio Cutter"
      description="Cut and trim audio segments"
    >
      <div className="space-y-6">
        <FileUploader
          accept="audio/*"
          onFiles={handleFileSelect}
          buttonText="Upload Audio"
        />

        {audioUrl && (
          <>
            <audio ref={audioRef} src={audioUrl} controls className="w-full" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Time (seconds)</Label>
                <Input
                  type="number"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  min="0"
                  step="0.1"
                />
              </div>
              <div>
                <Label>End Time (seconds)</Label>
                <Input
                  type="number"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  min="0"
                  step="0.1"
                />
              </div>
            </div>

            <Button onClick={handleCut} disabled={cutting} className="w-full gap-2">
              <Scissors className="w-4 h-4" />
              {cutting ? "Cutting..." : "Cut Audio"}
            </Button>
          </>
        )}

        {outputUrl && (
          <div className="space-y-4">
            <audio src={outputUrl} controls className="w-full" />
            <Button onClick={handleDownload} className="w-full gap-2">
              <Download className="w-4 h-4" />
              Download Cut Audio
            </Button>
          </div>
        )}
      </div>
    </ToolPage>
  );
}
