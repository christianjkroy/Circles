import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

const INTERESTS = [
  "Music", "Sports", "Gaming", "Cooking", "Art", "Film",
  "Reading", "Hiking", "Photography", "Dance", "Tech", "Fashion",
  "Travel", "Anime", "Board Games", "Yoga", "Volunteering", "Comedy",
];

const ACTIVITIES = [
  "Food & Drinks", "Outdoor Adventure", "Board Games", "Arts & Crafts",
  "Movie Night", "Sports", "Cooking Together", "Explore Campus",
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const TOTAL_STEPS = 5;

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    year: "",
    major: "",
    interests: [] as string[],
    introExtro: [50],
    spontPlanner: [50],
    availability: [] as string[],
    activities: [] as string[],
    icebreaker: "",
  });

  const toggleTag = (key: "interests" | "activities" | "availability", val: string) => {
    setForm((f) => ({
      ...f,
      [key]: f[key].includes(val) ? f[key].filter((v) => v !== val) : [...f[key], val],
    }));
  };

  const canNext = () => {
    if (step === 0) return form.name && form.year && form.major;
    if (step === 1) return form.interests.length >= 2;
    if (step === 2) return true;
    if (step === 3) return form.availability.length > 0 && form.activities.length > 0;
    if (step === 4) return form.icebreaker.length > 0;
    return true;
  };

  const handleSubmit = () => {
    navigate("/match");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                i <= step ? "gradient-btn" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="gradient-card rounded-2xl p-8 shadow-card"
          >
            {step === 0 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold font-heading text-foreground mb-2">Let's start with the basics</h2>
                  <p className="text-muted-foreground">Tell us a little about yourself.</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">First name</Label>
                    <Input id="name" placeholder="Alex" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="year">Year</Label>
                    <div className="flex gap-2 mt-1.5">
                      {["Freshman", "Sophomore", "Junior", "Senior"].map((y) => (
                        <Button key={y} variant={form.year === y ? "tag-active" : "tag"} size="tag" onClick={() => setForm({ ...form, year: y })}>
                          {y}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="major">Major</Label>
                    <Input id="major" placeholder="Computer Science" value={form.major} onChange={(e) => setForm({ ...form, major: e.target.value })} className="mt-1.5" />
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold font-heading text-foreground mb-2">What are you into?</h2>
                  <p className="text-muted-foreground">Pick at least 2 interests.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map((interest) => (
                    <Button
                      key={interest}
                      variant={form.interests.includes(interest) ? "tag-active" : "tag"}
                      size="tag"
                      onClick={() => toggleTag("interests", interest)}
                    >
                      {interest}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold font-heading text-foreground mb-2">Your vibe</h2>
                  <p className="text-muted-foreground">Help us understand your personality.</p>
                </div>
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between text-sm text-muted-foreground mb-3">
                      <span>Introvert</span>
                      <span>Extrovert</span>
                    </div>
                    <Slider value={form.introExtro} onValueChange={(v) => setForm({ ...form, introExtro: v })} max={100} step={1} className="w-full" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-muted-foreground mb-3">
                      <span>Planner</span>
                      <span>Spontaneous</span>
                    </div>
                    <Slider value={form.spontPlanner} onValueChange={(v) => setForm({ ...form, spontPlanner: v })} max={100} step={1} className="w-full" />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold font-heading text-foreground mb-2">When & what?</h2>
                  <p className="text-muted-foreground">When are you free and what sounds fun?</p>
                </div>
                <div>
                  <Label className="mb-2 block">Availability</Label>
                  <div className="flex flex-wrap gap-2">
                    {DAYS.map((d) => (
                      <Button key={d} variant={form.availability.includes(d) ? "tag-active" : "tag"} size="tag" onClick={() => toggleTag("availability", d)}>
                        {d}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="mb-2 block">Activity types</Label>
                  <div className="flex flex-wrap gap-2">
                    {ACTIVITIES.map((a) => (
                      <Button key={a} variant={form.activities.includes(a) ? "tag-active" : "tag"} size="tag" onClick={() => toggleTag("activities", a)}>
                        {a}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold font-heading text-foreground mb-2">One last thing</h2>
                  <p className="text-muted-foreground">What's something you're irrationally passionate about?</p>
                </div>
                <Textarea
                  placeholder="I could talk about the history of fonts for hours..."
                  value={form.icebreaker}
                  onChange={(e) => setForm({ ...form, icebreaker: e.target.value })}
                  className="min-h-[120px]"
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="ghost"
            onClick={() => (step > 0 ? setStep(step - 1) : navigate("/"))}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          {step < TOTAL_STEPS - 1 ? (
            <Button
              variant="hero"
              size="default"
              disabled={!canNext()}
              onClick={() => setStep(step + 1)}
              className="gap-2"
            >
              Next <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              variant="hero"
              size="default"
              disabled={!canNext()}
              onClick={handleSubmit}
              className="gap-2"
            >
              Find my Circle <Check className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
