import { useState } from "react";
import { MessageSquarePlus, X } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export const SuggestionsBox = () => {
  const [suggestion, setSuggestion] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim()) {
      toast.error("Please enter a suggestion");
      return;
    }
    
    // Here you could send to backend/email service
    console.log("Suggestion submitted:", suggestion);
    toast.success("Thank you for your suggestion!");
    setSuggestion("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-6 right-6 rounded-full shadow-lg hover:scale-110 transition-transform z-50 gap-2"
        >
          <MessageSquarePlus className="w-5 h-5" />
          Suggest a Tool
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Suggest a Tool</DialogTitle>
          <DialogDescription>
            Have an idea for a new tool? Let us know what you'd like to see!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Describe the tool you'd like us to add..."
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            className="min-h-[150px]"
          />
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit Suggestion</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
