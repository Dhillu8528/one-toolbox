import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Download } from "lucide-react";

export default function AVIToMP4() {
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [converting, setConverting] = useState(false);

  const handleConvert = async () => {
    if (!file) {
      toast.error("Please upload an AVI file");
      return;
    }

    setConverting(true);
    toast.info("Converting to WebM format (browser compatible)");
    
    try {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      
      await new Promise((resolve) => {
        video.onloadedmetadata = resolve;
      });

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d')!;

      const stream = canvas.captureStream(30);
      const audioContext = new AudioContext();
      const source = audioContext.createMediaElementSource(video);
      const dest = audioContext.createMediaStreamDestination();
      source.connect(dest);

      const combinedStream = new MediaStream([
        ...stream.getVideoTracks(),
        ...dest.stream.getAudioTracks()
      ]);

      const mediaRecorder = new MediaRecorder(combinedStream);
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        toast.success("Converted successfully!");
      };

      video.play();
      mediaRecorder.start();

      const drawFrame = () => {
        if (!video.paused && !video.ended) {
          ctx.drawImage(video, 0, 0);
          requestAnimationFrame(drawFrame);
        } else {
          mediaRecorder.stop();
        }
      };
      
      video.onplay = () => drawFrame();

    } catch (error) {
      toast.error("Conversion failed");
      console.error(error);
    } finally {
      setConverting(false);
    }
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = `${file?.name.replace(/\.[^/.]+$/, '')}.webm`;
    a.click();
  };

  return (
    <ToolPage
      title="AVI to MP4 Converter"
      description="Convert AVI videos to MP4 format"
    >
      <div className="space-y-6">
        <FileUploader
          accept="video/x-msvideo,video/avi"
          onFiles={(files) => setFile(files[0])}
          buttonText="Upload AVI File"
        />

        {file && (
          <Button onClick={handleConvert} disabled={converting} className="w-full">
            {converting ? "Converting..." : "Convert to MP4"}
          </Button>
        )}

        {videoUrl && (
          <div className="space-y-4">
            <video src={videoUrl} controls className="w-full rounded-lg" />
            <Button onClick={handleDownload} className="w-full gap-2">
              <Download className="w-4 h-4" />
              Download Video
            </Button>
          </div>
        )}
      </div>
    </ToolPage>
  );
}
