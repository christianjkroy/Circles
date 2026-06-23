import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Camera, Heart, Sparkles, Star, ArrowLeft, Send, Image, X } from "lucide-react";

const EMOJIS = ["😍", "🔥", "😂", "🥰", "✨"];

const Feedback = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"survey" | "moment" | "done">("survey");
  const [rating, setRating] = useState<number | null>(null);
  const [meetAgain, setMeetAgain] = useState<string | null>(null);
  const [highlight, setHighlight] = useState("");
  const [caption, setCaption] = useState("");
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const toggleEmoji = (emoji: string) => {
    setSelectedEmojis((prev) =>
      prev.includes(emoji) ? prev.filter((e) => e !== emoji) : [...prev, emoji]
    );
  };

  const handlePhotoUpload = () => {
    // Simulate photo selection with a placeholder
    setPhotoPreview("https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=400&fit=crop");
  };

  if (step === "done") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          className="text-center max-w-sm"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            className="text-6xl mb-4"
            initial={{ rotate: -10 }}
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            🎉
          </motion.div>
          <h1 className="text-3xl font-bold font-heading text-foreground mb-2">
            Moment shared!
          </h1>
          <p className="text-muted-foreground mb-8">
            Your Circle will love it. Thanks for sharing your night!
          </p>
          <Button variant="hero" onClick={() => navigate("/")}>
            Back to home
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <button onClick={() => navigate("/chat")} className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="font-heading font-bold text-foreground text-lg">
            {step === "survey" ? "How did it go?" : "Share your Moment"}
          </h1>
          <p className="text-xs text-muted-foreground">
            Dinner at Zareen's · April 12
          </p>
        </div>
        <div className="flex gap-1">
          <div className={`w-2 h-2 rounded-full transition-colors ${step === "survey" ? "bg-primary" : "bg-muted"}`} />
          <div className={`w-2 h-2 rounded-full transition-colors ${step === "moment" ? "bg-primary" : "bg-muted"}`} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-start justify-center p-4 pt-6 overflow-y-auto">
        <AnimatePresence mode="wait">
          {step === "survey" ? (
            <motion.div
              key="survey"
              className="w-full max-w-md space-y-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Star Rating */}
              <div>
                <Label className="mb-3 block text-base font-heading font-semibold">
                  Rate your night
                </Label>
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => setRating(num)}
                      className="group transition-all duration-200"
                    >
                      <Star
                        className={`w-10 h-10 transition-all duration-200 ${
                          rating !== null && num <= rating
                            ? "fill-primary text-primary scale-110"
                            : "text-muted-foreground/40 group-hover:text-primary/60"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {rating && (
                  <motion.p
                    className="text-center text-sm text-muted-foreground mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {rating <= 2 ? "We'll do better next time" : rating <= 4 ? "Glad you had fun!" : "Amazing!!"}
                  </motion.p>
                )}
              </div>

              {/* Meet Again */}
              <div>
                <Label className="mb-3 block text-base font-heading font-semibold">
                  Would you hang with this group again?
                </Label>
                <div className="flex gap-2">
                  {["100% yes", "Maybe", "Probably not"].map((label) => (
                    <button
                      key={label}
                      onClick={() => setMeetAgain(label)}
                      className={`flex-1 py-3 px-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        meetAgain === label
                          ? "bg-primary text-primary-foreground shadow-soft scale-[1.02]"
                          : "bg-muted text-muted-foreground hover:bg-accent"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Highlight */}
              <div>
                <Label className="mb-2 block text-base font-heading font-semibold">
                  Best part of the night?
                </Label>
                <Textarea
                  placeholder="The butter chicken was incredible..."
                  value={highlight}
                  onChange={(e) => setHighlight(e.target.value)}
                  className="rounded-xl border-border/50 bg-muted/50 focus:bg-background resize-none"
                  rows={3}
                />
              </div>

              <Button
                variant="hero"
                size="lg"
                className="w-full"
                disabled={rating === null}
                onClick={() => setStep("moment")}
              >
                Next: Share a Moment
              </Button>

              <button
                onClick={() => {
                  setStep("done");
                }}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Skip & finish
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="moment"
              className="w-full max-w-md space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {/* Moment card preview */}
              <div className="gradient-card rounded-2xl shadow-card overflow-hidden">
                {/* Photo area */}
                {photoPreview ? (
                  <div className="relative">
                    <img
                      src={photoPreview}
                      alt="Your moment"
                      className="w-full h-56 object-cover"
                    />
                    <button
                      onClick={() => setPhotoPreview(null)}
                      className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full p-1.5 text-foreground"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handlePhotoUpload}
                    className="w-full h-44 bg-muted/50 flex flex-col items-center justify-center gap-3 hover:bg-muted transition-colors"
                  >
                    <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center">
                      <Camera className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">Add a photo</p>
                      <p className="text-xs text-muted-foreground">Share a moment from your night</p>
                    </div>
                  </button>
                )}

                {/* Caption */}
                <div className="p-4 space-y-4">
                  <Textarea
                    placeholder="What made tonight special?"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="border-0 bg-transparent p-0 text-base placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none min-h-[60px]"
                    rows={2}
                  />

                  {/* Emoji reactions */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Vibe check</p>
                    <div className="flex gap-2">
                      {EMOJIS.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => toggleEmoji(emoji)}
                          className={`text-2xl p-2 rounded-xl transition-all duration-200 ${
                            selectedEmojis.includes(emoji)
                              ? "bg-accent scale-110 shadow-soft"
                              : "hover:bg-muted"
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Group tag */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {["bg-primary", "bg-secondary", "bg-accent"].map((color, i) => (
                    <div
                      key={i}
                      className={`w-6 h-6 rounded-full ${color} border-2 border-background`}
                    />
                  ))}
                </div>
                <span>Sharing with your Zareen's Circle</span>
              </div>

              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={() => setStep("done")}
              >
                <Send className="w-4 h-4 mr-1" />
                Share Moment
              </Button>

              <button
                onClick={() => setStep("survey")}
                className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to survey
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Feedback;
