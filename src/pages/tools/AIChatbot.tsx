import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { streamChat, type Msg } from "@/lib/ai";

export default function AIChatbot() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hello! I'm your AI assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const send = async () => {
    if (!input.trim()) {
      toast.error("Please enter a message");
      return;
    }

    const userMsg: Msg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    let assistantSoFar = "";
    const upsertAssistant = (next: string) => {
      assistantSoFar += next;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      setIsLoading(true);
      await streamChat({
        messages: [...messages, userMsg],
        onDelta: (chunk) => upsertAssistant(chunk),
        onDone: () => setIsLoading(false),
      });
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      toast.error("Failed to get AI response");
    }
  };

  return (
    <ToolPage title="AI Chatbot" description="Chat with an AI assistant">
      <div className="space-y-4">
        <ScrollArea className="h-[400px] border rounded-lg p-4">
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex gap-2">
          <Input
            placeholder={isLoading ? "Waiting for AI..." : "Type your message..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isLoading && send()}
            disabled={isLoading}
          />
          <Button onClick={send} size="icon" disabled={isLoading}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </ToolPage>
  );
}
