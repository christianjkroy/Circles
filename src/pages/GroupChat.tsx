import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";

interface Message {
  id: number;
  sender: string;
  text: string;
  isMe: boolean;
  isPrompt?: boolean;
}

const initialMessages: Message[] = [
  { id: 1, sender: "Circles Bot", text: "Welcome to your Circle! Here's a conversation starter: What's everyone most excited about this quarter?", isMe: false, isPrompt: true },
  { id: 2, sender: "Jordan", text: "Hey everyone!! I'm so hyped for this. I'm excited about the new music festival on campus", isMe: false },
  { id: 3, sender: "Priya", text: "Hi!! Same, I've been wanting to meet more people outside my classes. Also I heard dinner at Zareen's is going to be amazing", isMe: false },
];

const GroupChat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "You", text: input, isMe: true },
    ]);
    setInput("");
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="gradient-card shadow-card px-4 py-3 flex items-center gap-3 border-b border-border">
        <Button variant="ghost" size="icon" onClick={() => navigate("/match")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex -space-x-2">
          {["J", "P", "M", "L"].map((l, i) => (
            <div key={i} className="w-8 h-8 rounded-full gradient-btn flex items-center justify-center text-xs text-primary-foreground font-bold border-2 border-card">
              {l}
            </div>
          ))}
        </div>
        <div>
          <h2 className="font-semibold font-heading text-foreground text-sm">Zareen's Circle</h2>
          <p className="text-xs text-muted-foreground">5 members</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                msg.isPrompt
                  ? "gradient-primary text-primary-foreground"
                  : msg.isMe
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              {!msg.isMe && (
                <p className={`text-xs font-medium mb-1 ${msg.isPrompt ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {msg.sender}
                </p>
              )}
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border gradient-card">
        <div className="flex gap-2">
          <Input
            placeholder="Say something nice..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="rounded-full"
          />
          <Button variant="hero" size="icon" onClick={sendMessage} className="rounded-full shrink-0">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GroupChat;
