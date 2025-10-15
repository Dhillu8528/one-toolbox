import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Download, Plus, Trash2 } from "lucide-react";

export default function MergeVideos() {
  const [files, setFiles] = useState<File[]>([]);
  const [outputUrl, setOutputUrl] = useState<string>("");
  const [merging, setMerging] = useState(false);

  const handleAddFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles([...files, ...selectedFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      toast.error("Please add at least 2 video files");
      return;
    }

    setMerging(true);
    toast.info("Note: This creates a simple concatenation. For advanced merging, use desktop software.");
    
    try {
      // Create canvas for consistent dimensions
      const video = document.createElement('video');
      video.src = URL.createObjectURL(files[0]);
      await new Promise(resolve => video.onloadedmetadata = resolve);

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d')!;

      const stream = canvas.captureStream(30);
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setOutputUrl(url);
        toast.success("Videos merged!");
      };

      mediaRecorder.start();

      for (const file of files) {
        const tempVideo = document.createElement('video');
        tempVideo.src = URL.createObjectURL(file);
        await new Promise(resolve => tempVideo.onloadedmetadata = resolve);

        tempVideo.play();
        
        await new Promise<void>((resolve) => {
          const drawFrame = () => {
            if (!tempVideo.paused && !tempVideo.ended) {
              ctx.drawImage(tempVideo, 0, 0, canvas.width, canvas.height);
              requestAnimationFrame(drawFrame);
            } else {
              resolve();
            }
          };
          tempVideo.onplay = () => drawFrame();
          tempVideo.onended = () => resolve();
        });
      }

      mediaRecorder.stop();

    } catch (error) {
      toast.error("Merging failed");
      console.error(error);
    } finally {
      setMerging(false);
    }
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = outputUrl;
    a.download = 'merged_video.webm';
    a.click();
  };

  return (
    <ToolPage
      title="Merge Videos"
      description="Combine multiple videos into one"
    >
      <div className="space-y-6">
        <div>
          <input
            type="file"
            accept="video/*"
            multiple
            onChange={handleAddFiles}
            className="hidden"
            id="video-input"
          />
          <Button asChild variant="outline" className="w-full gap-2">
            <label htmlFor="video-input" className="cursor-pointer">
              <Plus className="w-4 h-4" />
              Add Video Files
            </label>
          </Button>
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Selected Files ({files.length})</div>
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm truncate">{file.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveFile(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {files.length >= 2 && (
          <Button onClick={handleMerge} disabled={merging} className="w-full">
            {merging ? "Merging..." : "Merge Videos"}
          </Button>
        )}

        {outputUrl && (
          <div className="space-y-4">
            <video src={outputUrl} controls className="w-full rounded-lg" />
            <Button onClick={handleDownload} className="w-full gap-2">
              <Download className="w-4 h-4" />
              Download Merged Video
            </Button>
          </div>
        )}
      </div>
    </ToolPage>
  );
}
