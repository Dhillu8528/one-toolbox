import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Download } from "lucide-react";

export default function WAVToMP3() {
  const [file, setFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [converting, setConverting] = useState(false);

  const handleConvert = async () => {
    if (!file) {
      toast.error("Please upload a WAV file");
      return;
    }

    setConverting(true);
    try {
      const audioContext = new AudioContext();
      const arrayBuffer = await file.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      
      const dest = audioContext.createMediaStreamDestination();
      source.connect(dest);

      const mediaRecorder = new MediaRecorder(dest.stream, {
        mimeType: 'audio/webm'
      });
      
      const chunks: Blob[] = [];
      
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/mp3' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        toast.success("Converted to MP3!");
      };

      source.start();
      mediaRecorder.start();

      setTimeout(() => {
        mediaRecorder.stop();
        source.stop();
      }, audioBuffer.duration * 1000);

    } catch (error) {
      toast.error("Conversion failed");
      console.error(error);
    } finally {
      setConverting(false);
    }
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = audioUrl;
    a.download = `${file?.name.replace(/\.[^/.]+$/, '')}.mp3`;
    a.click();
  };

  return (
    <ToolPage
      title="WAV to MP3 Converter"
      description="Convert WAV audio files to MP3 format"
    >
      <div className="space-y-6">
        <FileUploader
          accept="audio/wav,audio/x-wav"
          onFiles={(files) => setFile(files[0])}
          buttonText="Upload WAV File"
        />

        {file && (
          <>
            <audio src={URL.createObjectURL(file)} controls className="w-full" />
            <Button onClick={handleConvert} disabled={converting} className="w-full">
              {converting ? "Converting..." : "Convert to MP3"}
            </Button>
          </>
        )}

        {audioUrl && (
          <div className="space-y-4">
            <audio src={audioUrl} controls className="w-full" />
            <Button onClick={handleDownload} className="w-full gap-2">
              <Download className="w-4 h-4" />
              Download MP3
            </Button>
          </div>
        )}
      </div>
    </ToolPage>
  );
}
