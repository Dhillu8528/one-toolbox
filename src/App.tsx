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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
