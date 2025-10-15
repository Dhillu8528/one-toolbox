import { useState, useRef } from "react";
import { ToolPage } from "@/components/ToolPage";
import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Download } from "lucide-react";

export default function CropVideo() {
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [cropSize, setCropSize] = useState([80]);
  const [outputUrl, setOutputUrl] = useState<string>("");
  const [cropping, setCropping] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileSelect = (files: File[]) => {
    const selectedFile = files[0];
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setVideoUrl(url);
  };

  const handleCrop = async () => {
    if (!file || !videoRef.current) {
      toast.error("Please upload a video");
      return;
    }

    setCropping(true);
    try {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      
      const scale = cropSize[0] / 100;
      canvas.width = video.videoWidth * scale;
      canvas.height = video.videoHeight * scale;
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
        toast.success("Video cropped!");
      };

      video.currentTime = 0;
      video.play();
      mediaRecorder.start();

      const offsetX = (video.videoWidth - canvas.width) / 2;
      const offsetY = (video.videoHeight - canvas.height) / 2;

      const drawFrame = () => {
        if (!video.paused && !video.ended) {
          ctx.drawImage(
            video,
            offsetX, offsetY,
            canvas.width, canvas.height,
            0, 0,
            canvas.width, canvas.height
          );
          requestAnimationFrame(drawFrame);
        } else {
          mediaRecorder.stop();
          video.pause();
        }
      };
      
      drawFrame();

    } catch (error) {
      toast.error("Cropping failed");
      console.error(error);
    } finally {
      setCropping(false);
    }
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = outputUrl;
    a.download = `cropped_${file?.name}`;
    a.click();
  };

  return (
    <ToolPage
      title="Crop Video"
      description="Crop and resize video dimensions"
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

            <div>
              <Label>Crop Size: {cropSize[0]}%</Label>
              <Slider
                value={cropSize}
                onValueChange={setCropSize}
                min={10}
                max={100}
                step={5}
                className="mt-2"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Crops from center maintaining aspect ratio
              </p>
            </div>

            <Button onClick={handleCrop} disabled={cropping} className="w-full">
              {cropping ? "Cropping..." : "Crop Video"}
            </Button>
          </>
        )}

        {outputUrl && (
          <div className="space-y-4">
            <video src={outputUrl} controls className="w-full rounded-lg" />
            <Button onClick={handleDownload} className="w-full gap-2">
              <Download className="w-4 h-4" />
              Download Cropped Video
            </Button>
          </div>
        )}
      </div>
    </ToolPage>
  );
}
