import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WordCounter from "./pages/tools/WordCounter";
import CaseConverter from "./pages/tools/CaseConverter";
import ImageResize from "./pages/tools/ImageResize";
import QRGenerator from "./pages/tools/QRGenerator";
import ColorPickerTool from "./pages/tools/ColorPicker";
import ImageCompressor from "./pages/tools/ImageCompressor";
import PasswordGenerator from "./pages/tools/PasswordGenerator";
import JSONFormatter from "./pages/tools/JSONFormatter";
import UnitConverter from "./pages/tools/UnitConverter";
import LoremIpsum from "./pages/tools/LoremIpsum";
import AgeCalculator from "./pages/tools/AgeCalculator";
import URLShortener from "./pages/tools/URLShortener";
import Base64Tool from "./pages/tools/Base64Tool";
import MarkdownPreview from "./pages/tools/MarkdownPreview";
import HashGenerator from "./pages/tools/HashGenerator";
import JPGToPDF from "./pages/tools/JPGToPDF";
import JPGtoPNG from "./pages/tools/JPGtoPNG";
import PNGtoWEBP from "./pages/tools/PNGtoWEBP";
import ImageCropper from "./pages/tools/ImageCropper";
import HEICtoJPG from "./pages/tools/HEICtoJPG";
import PDFMerge from "./pages/tools/PDFMerge";
import PDFSplit from "./pages/tools/PDFSplit";
import PDFRotate from "./pages/tools/PDFRotate";
import PDFToWord from "./pages/tools/PDFToWord";
import WordToPDF from "./pages/tools/WordToPDF";
import PDFToJPG from "./pages/tools/PDFToJPG";
import TextSummarizer from "./pages/tools/TextSummarizer";
import ContentGenerator from "./pages/tools/ContentGenerator";
import GrammarCheck from "./pages/tools/GrammarCheck";
import Translator from "./pages/tools/Translator";
import Paraphraser from "./pages/tools/Paraphraser";
import ArticleRewriter from "./pages/tools/ArticleRewriter";
import CaptionGenerator from "./pages/tools/CaptionGenerator";
import HashtagGenerator from "./pages/tools/HashtagGenerator";
import TextToSpeech from "./pages/tools/TextToSpeech";
import SpeechToText from "./pages/tools/SpeechToText";
import PoemGenerator from "./pages/tools/PoemGenerator";
import StoryWriter from "./pages/tools/StoryWriter";
import BlogGenerator from "./pages/tools/BlogGenerator";
import AIImageGenerator from "./pages/tools/AIImageGenerator";
import AIChatbot from "./pages/tools/AIChatbot";
import VoiceCloner from "./pages/tools/VoiceCloner";
import MP4ToMP3 from "./pages/tools/MP4ToMP3";
import AVIToMP4 from "./pages/tools/AVIToMP4";
import MOVToMP4 from "./pages/tools/MOVToMP4";
import VideoCutter from "./pages/tools/VideoCutter";
import VideoCompressor from "./pages/tools/VideoCompressor";
import MergeVideos from "./pages/tools/MergeVideos";
import AddSubtitles from "./pages/tools/AddSubtitles";
import CropVideo from "./pages/tools/CropVideo";
import AudioCutter from "./pages/tools/AudioCutter";
import AudioJoiner from "./pages/tools/AudioJoiner";
import WAVToMP3 from "./pages/tools/WAVToMP3";
import VoiceRecorder from "./pages/tools/VoiceRecorder";
import CompressPDF from "./pages/tools/CompressPDF";
import UnlockPDF from "./pages/tools/UnlockPDF";
import ProtectPDF from "./pages/tools/ProtectPDF";
import PDFToText from "./pages/tools/PDFToText";
import ExcelToPDF from "./pages/tools/ExcelToPDF";
import PowerPointToPDF from "./pages/tools/PowerPointToPDF";
import DocxToTxt from "./pages/tools/DocxToTxt";
import TxtToPDF from "./pages/tools/TxtToPDF";
import OCRTool from "./pages/tools/OCRTool";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tools/word-counter" element={<WordCounter />} />
            <Route path="/tools/case-converter" element={<CaseConverter />} />
            <Route path="/tools/image-resize" element={<ImageResize />} />
            <Route path="/tools/qr-generator" element={<QRGenerator />} />
            <Route path="/tools/color-picker" element={<ColorPickerTool />} />
            <Route path="/tools/image-compressor" element={<ImageCompressor />} />
            <Route path="/tools/password-generator" element={<PasswordGenerator />} />
            <Route path="/tools/json-formatter" element={<JSONFormatter />} />
            <Route path="/tools/unit-converter" element={<UnitConverter />} />
            <Route path="/tools/lorem-ipsum" element={<LoremIpsum />} />
            <Route path="/tools/age-calculator" element={<AgeCalculator />} />
            <Route path="/tools/url-shortener" element={<URLShortener />} />
            <Route path="/tools/base64-tool" element={<Base64Tool />} />
            <Route path="/tools/markdown-preview" element={<MarkdownPreview />} />
            <Route path="/tools/hash-generator" element={<HashGenerator />} />
            <Route path="/tools/jpg-to-pdf" element={<JPGToPDF />} />
            <Route path="/tools/jpg-to-png" element={<JPGtoPNG />} />
            <Route path="/tools/png-to-webp" element={<PNGtoWEBP />} />
            <Route path="/tools/image-cropper" element={<ImageCropper />} />
            <Route path="/tools/heic-to-jpg" element={<HEICtoJPG />} />
            <Route path="/tools/pdf-merge" element={<PDFMerge />} />
            <Route path="/tools/pdf-split" element={<PDFSplit />} />
            <Route path="/tools/pdf-rotate" element={<PDFRotate />} />
            <Route path="/tools/pdf-to-word" element={<PDFToWord />} />
            <Route path="/tools/word-to-pdf" element={<WordToPDF />} />
            <Route path="/tools/pdf-to-jpg" element={<PDFToJPG />} />
            <Route path="/tools/text-summarizer" element={<TextSummarizer />} />
            <Route path="/tools/content-generator" element={<ContentGenerator />} />
            <Route path="/tools/grammar-check" element={<GrammarCheck />} />
            <Route path="/tools/translator" element={<Translator />} />
            <Route path="/tools/paraphraser" element={<Paraphraser />} />
            <Route path="/tools/article-rewriter" element={<ArticleRewriter />} />
            <Route path="/tools/caption-generator" element={<CaptionGenerator />} />
            <Route path="/tools/hashtag-generator" element={<HashtagGenerator />} />
            <Route path="/tools/text-to-speech" element={<TextToSpeech />} />
            <Route path="/tools/speech-to-text" element={<SpeechToText />} />
            <Route path="/tools/poem-generator" element={<PoemGenerator />} />
            <Route path="/tools/story-writer" element={<StoryWriter />} />
            <Route path="/tools/blog-generator" element={<BlogGenerator />} />
            <Route path="/tools/ai-image-generator" element={<AIImageGenerator />} />
            <Route path="/tools/ai-chatbot" element={<AIChatbot />} />
            <Route path="/tools/voice-cloner" element={<VoiceCloner />} />
            <Route path="/tools/mp4-to-mp3" element={<MP4ToMP3 />} />
            <Route path="/tools/avi-to-mp4" element={<AVIToMP4 />} />
            <Route path="/tools/mov-to-mp4" element={<MOVToMP4 />} />
            <Route path="/tools/video-cutter" element={<VideoCutter />} />
            <Route path="/tools/video-compressor" element={<VideoCompressor />} />
            <Route path="/tools/merge-videos" element={<MergeVideos />} />
            <Route path="/tools/add-subtitles" element={<AddSubtitles />} />
            <Route path="/tools/crop-video" element={<CropVideo />} />
            <Route path="/tools/audio-cutter" element={<AudioCutter />} />
            <Route path="/tools/audio-joiner" element={<AudioJoiner />} />
            <Route path="/tools/wav-to-mp3" element={<WAVToMP3 />} />
            <Route path="/tools/voice-recorder" element={<VoiceRecorder />} />
            <Route path="/tools/compress-pdf" element={<CompressPDF />} />
            <Route path="/tools/unlock-pdf" element={<UnlockPDF />} />
            <Route path="/tools/protect-pdf" element={<ProtectPDF />} />
            <Route path="/tools/pdf-to-text" element={<PDFToText />} />
            <Route path="/tools/excel-to-pdf" element={<ExcelToPDF />} />
            <Route path="/tools/powerpoint-to-pdf" element={<PowerPointToPDF />} />
            <Route path="/tools/docx-to-txt" element={<DocxToTxt />} />
            <Route path="/tools/txt-to-pdf" element={<TxtToPDF />} />
            <Route path="/tools/ocr-tool" element={<OCRTool />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
