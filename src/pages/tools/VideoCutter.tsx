import { useState, useRef } from "react";
import { ToolPage } from "@/components/ToolPage";
import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Download, Scissors } from "lucide-react";

export default function VideoCutter() {
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("0");
  const [endTime, setEndTime] = useState<string>("10");
  const [outputUrl, setOutputUrl] = useState<string>("");
  const [cutting, setCutting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileSelect = (files: File[]) => {
    const selectedFile = files[0];
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setVideoUrl(url);
  };

  const handleCut = async () => {
    if (!file || !videoRef.current) {
      toast.error("Please upload a video");
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
      const video = videoRef.current;
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
        setOutputUrl(url);
        toast.success("Video cut successfully!");
      };

      video.currentTime = start;
      await new Promise(resolve => video.onseeked = resolve);

      mediaRecorder.start();
      video.play();

      const drawFrame = () => {
        if (video.currentTime < end && !video.paused) {
          ctx.drawImage(video, 0, 0);
          requestAnimationFrame(drawFrame);
        } else {
          video.pause();
          mediaRecorder.stop();
        }
      };
      drawFrame();

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
      title="Video Cutter"
      description="Cut and trim video segments"
    >
      <div className="space-y-6">
        <FileUploader
          accept="video/*"
          onFiles={handleFileSelect}
          buttonText="Upload Video"
        />

        {videoUrl && (
          <>
            <video ref={videoRef} src={videoUrl} controls className="w-full rounded-lg" />

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
              {cutting ? "Cutting..." : "Cut Video"}
            </Button>
          </>
        )}

        {outputUrl && (
          <div className="space-y-4">
            <video src={outputUrl} controls className="w-full rounded-lg" />
            <Button onClick={handleDownload} className="w-full gap-2">
              <Download className="w-4 h-4" />
              Download Cut Video
            </Button>
          </div>
        )}
      </div>
    </ToolPage>
  );
}
