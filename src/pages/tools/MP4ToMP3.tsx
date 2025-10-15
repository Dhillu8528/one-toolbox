import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Download } from "lucide-react";

export default function MP4ToMP3() {
  const [file, setFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [converting, setConverting] = useState(false);

  const handleConvert = async () => {
    if (!file) {
      toast.error("Please upload a video file");
      return;
    }

    setConverting(true);
    try {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      
      await new Promise((resolve) => {
        video.onloadedmetadata = resolve;
      });

      const audioContext = new AudioContext();
      const source = audioContext.createMediaElementSource(video);
      const dest = audioContext.createMediaStreamDestination();
      source.connect(dest);

      const mediaRecorder = new MediaRecorder(dest.stream);
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/mp3' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        toast.success("Converted to MP3!");
      };

      mediaRecorder.start();
      video.play();
      
      setTimeout(() => {
        mediaRecorder.stop();
        video.pause();
      }, video.duration * 1000);

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
      title="MP4 to MP3 Converter"
      description="Extract audio from video files"
    >
      <div className="space-y-6">
        <FileUploader
          accept="video/mp4,video/*"
          onFiles={(files) => setFile(files[0])}
          buttonText="Upload Video (MP4)"
        />

        {file && (
          <Button onClick={handleConvert} disabled={converting} className="w-full">
            {converting ? "Converting..." : "Convert to MP3"}
          </Button>
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
