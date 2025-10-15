import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import FileUploader from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Download } from "lucide-react";

export default function VideoCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState([70]);
  const [outputUrl, setOutputUrl] = useState<string>("");
  const [compressing, setCompressing] = useState(false);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);

  const handleFileSelect = (files: File[]) => {
    const selectedFile = files[0];
    setFile(selectedFile);
    setOriginalSize(selectedFile.size);
  };

  const handleCompress = async () => {
    if (!file) {
      toast.error("Please upload a video");
      return;
    }

    setCompressing(true);
    try {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      
      await new Promise((resolve) => {
        video.onloadedmetadata = resolve;
      });

      const canvas = document.createElement('canvas');
      const scale = quality[0] / 100;
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

      const mediaRecorder = new MediaRecorder(combinedStream, {
        videoBitsPerSecond: 1000000 * (quality[0] / 100)
      });
      
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        setCompressedSize(blob.size);
        const url = URL.createObjectURL(blob);
        setOutputUrl(url);
        toast.success("Video compressed!");
      };

      video.play();
      mediaRecorder.start();

      const drawFrame = () => {
        if (!video.paused && !video.ended) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          requestAnimationFrame(drawFrame);
        } else {
          mediaRecorder.stop();
          video.pause();
        }
      };
      
      video.onplay = () => drawFrame();

    } catch (error) {
      toast.error("Compression failed");
      console.error(error);
    } finally {
      setCompressing(false);
    }
  };

  const formatSize = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = outputUrl;
    a.download = `compressed_${file?.name}`;
    a.click();
  };

  return (
    <ToolPage
      title="Video Compressor"
      description="Reduce video file size"
    >
      <div className="space-y-6">
        <FileUploader
          accept="video/*"
          onFiles={handleFileSelect}
          buttonText="Upload Video"
        />

        {file && (
          <>
            <div>
              <Label>Quality: {quality[0]}%</Label>
              <Slider
                value={quality}
                onValueChange={setQuality}
                min={10}
                max={100}
                step={10}
                className="mt-2"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Lower quality = smaller file size
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm">Original Size: {formatSize(originalSize)}</div>
            </div>

            <Button onClick={handleCompress} disabled={compressing} className="w-full">
              {compressing ? "Compressing..." : "Compress Video"}
            </Button>
          </>
        )}

        {outputUrl && (
          <div className="space-y-4">
            <video src={outputUrl} controls className="w-full rounded-lg" />
            <div className="p-4 bg-muted rounded-lg space-y-1">
              <div className="text-sm">Original: {formatSize(originalSize)}</div>
              <div className="text-sm">Compressed: {formatSize(compressedSize)}</div>
              <div className="text-sm font-bold text-primary">
                Saved: {formatSize(originalSize - compressedSize)} 
                ({((1 - compressedSize / originalSize) * 100).toFixed(1)}%)
              </div>
            </div>
            <Button onClick={handleDownload} className="w-full gap-2">
              <Download className="w-4 h-4" />
              Download Compressed Video
            </Button>
          </div>
        )}
      </div>
    </ToolPage>
  );
}
