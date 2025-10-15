import { useState } from "react";
import { ToolPage } from "@/components/ToolPage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { toast } from "sonner";

interface Message {
  role: "user" | "bot";
  content: string;
}

export default function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hello! I'm your AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const responses = [
    "That's an interesting question! Let me help you with that.",
    "I understand. Here's what I think about that...",
    "Great point! Based on my knowledge...",
    "I can definitely help with that. Here's my suggestion:",
    "Let me think about this for a moment...",
  ];

  const send = () => {
    if (!input.trim()) {
      toast.error("Please enter a message");
      return;
    }

    const userMsg: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      const botMsg: Message = {
        role: "bot",
        content: responses[Math.floor(Math.random() * responses.length)]
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <ToolPage
      title="AI Chatbot"
      description="Chat with an AI assistant"
    >
      <div className="space-y-4">
        <ScrollArea className="h-[400px] border rounded-lg p-4">
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
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
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && send()}
          />
          <Button onClick={send} size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </ToolPage>
  );
}
