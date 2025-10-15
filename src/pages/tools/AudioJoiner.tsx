import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Download, Plus, Trash2 } from "lucide-react";

export default function AudioJoiner() {
  const [files, setFiles] = useState<File[]>([]);
  const [outputUrl, setOutputUrl] = useState<string>("");
  const [joining, setJoining] = useState(false);

  const handleAddFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles([...files, ...selectedFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleJoin = async () => {
    if (files.length < 2) {
      toast.error("Please add at least 2 audio files");
      return;
    }

    setJoining(true);
    try {
      const audioContext = new AudioContext();
      const audioBuffers: AudioBuffer[] = [];

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        audioBuffers.push(audioBuffer);
      }

      const totalLength = audioBuffers.reduce((sum, buffer) => sum + buffer.length, 0);
      const numberOfChannels = audioBuffers[0].numberOfChannels;
      const sampleRate = audioBuffers[0].sampleRate;

      const outputBuffer = audioContext.createBuffer(numberOfChannels, totalLength, sampleRate);

      let offset = 0;
      for (const buffer of audioBuffers) {
        for (let channel = 0; channel < numberOfChannels; channel++) {
          outputBuffer.copyToChannel(buffer.getChannelData(channel), channel, offset);
        }
        offset += buffer.length;
      }

      const wav = audioBufferToWav(outputBuffer);
      const blob = new Blob([wav], { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);
      setOutputUrl(url);
      toast.success("Audio files joined!");

    } catch (error) {
      toast.error("Joining failed");
      console.error(error);
    } finally {
      setJoining(false);
    }
  };

  const audioBufferToWav = (buffer: AudioBuffer): ArrayBuffer => {
    const numberOfChannels = buffer.numberOfChannels;
    const length = buffer.length * numberOfChannels * 2;
    const arrayBuffer = new ArrayBuffer(44 + length);
    const view = new DataView(arrayBuffer);

    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + length, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numberOfChannels, true);
    view.setUint32(24, buffer.sampleRate, true);
    view.setUint32(28, buffer.sampleRate * numberOfChannels * 2, true);
    view.setUint16(32, numberOfChannels * 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, length, true);

    let offset = 44;
    for (let i = 0; i < buffer.length; i++) {
      for (let channel = 0; channel < numberOfChannels; channel++) {
        const sample = buffer.getChannelData(channel)[i];
        const int16 = Math.max(-1, Math.min(1, sample)) * 0x7FFF;
        view.setInt16(offset, int16, true);
        offset += 2;
      }
    }

    return arrayBuffer;
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = outputUrl;
    a.download = 'joined_audio.wav';
    a.click();
  };

  return (
    <ToolPage
      title="Audio Joiner"
      description="Merge multiple audio files into one"
    >
      <div className="space-y-6">
        <div>
          <input
            type="file"
            accept="audio/*"
            multiple
            onChange={handleAddFiles}
            className="hidden"
            id="audio-input"
          />
          <Button asChild variant="outline" className="w-full gap-2">
            <label htmlFor="audio-input" className="cursor-pointer">
              <Plus className="w-4 h-4" />
              Add Audio Files
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
          <Button onClick={handleJoin} disabled={joining} className="w-full">
            {joining ? "Joining..." : "Join Audio Files"}
          </Button>
        )}

        {outputUrl && (
          <div className="space-y-4">
            <audio src={outputUrl} controls className="w-full" />
            <Button onClick={handleDownload} className="w-full gap-2">
              <Download className="w-4 h-4" />
              Download Joined Audio
            </Button>
          </div>
        )}
      </div>
    </ToolPage>
  );
}
