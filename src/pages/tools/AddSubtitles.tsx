import { useState, useRef } from "react";
import { ToolPage } from "@/components/ToolPage";
import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Download } from "lucide-react";

export default function AddSubtitles() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [subtitles, setSubtitles] = useState<string>("");
  const [showSubtitles, setShowSubtitles] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoSelect = (files: File[]) => {
    const file = files[0];
    setVideoFile(file);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
  };

  const handleApplySubtitles = () => {
    if (!videoFile) {
      toast.error("Please upload a video");
      return;
    }
    if (!subtitles.trim()) {
      toast.error("Please enter subtitles");
      return;
    }

    setShowSubtitles(true);
    toast.success("Subtitles applied!");
  };

  const handleDownload = async () => {
    if (!videoFile) return;

    const canvas = document.createElement('canvas');
    const video = videoRef.current!;
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
      const a = document.createElement('a');
      a.href = url;
      a.download = `subtitled_${videoFile.name}`;
      a.click();
      toast.success("Video downloaded!");
    };

    video.currentTime = 0;
    video.play();
    mediaRecorder.start();

    const drawFrame = () => {
      if (!video.paused && !video.ended) {
        ctx.drawImage(video, 0, 0);
        
        // Draw subtitles
        if (showSubtitles && subtitles) {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
          ctx.fillRect(0, canvas.height - 100, canvas.width, 100);
          ctx.fillStyle = 'white';
          ctx.font = '30px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(subtitles, canvas.width / 2, canvas.height - 50);
        }
        
        requestAnimationFrame(drawFrame);
      } else {
        mediaRecorder.stop();
        video.pause();
      }
    };
    
    drawFrame();
  };

  return (
    <ToolPage
      title="Add Subtitles to Video"
      description="Add text overlays to your videos"
    >
      <div className="space-y-6">
        <FileUploader
          accept="video/*"
          onFiles={handleVideoSelect}
          buttonText="Upload Video"
        />

        {videoUrl && (
          <>
            <div className="relative">
              <video ref={videoRef} src={videoUrl} controls className="w-full rounded-lg" />
              {showSubtitles && subtitles && (
                <div className="absolute bottom-12 left-0 right-0 bg-black/70 text-white text-center py-4 px-6">
                  <p className="text-lg">{subtitles}</p>
                </div>
              )}
            </div>

            <div>
              <Label>Subtitle Text</Label>
              <Textarea
                value={subtitles}
                onChange={(e) => setSubtitles(e.target.value)}
                placeholder="Enter subtitle text..."
                className="min-h-[100px] mt-2"
              />
            </div>

            <Button onClick={handleApplySubtitles} className="w-full">
              Apply Subtitles
            </Button>

            {showSubtitles && (
              <Button onClick={handleDownload} variant="outline" className="w-full gap-2">
                <Download className="w-4 h-4" />
                Download Video with Subtitles
              </Button>
            )}
          </>
        )}
      </div>
    </ToolPage>
  );
}
