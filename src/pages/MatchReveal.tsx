import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Clock, MessageCircle } from "lucide-react";

const members = [
  { name: "Jordan", year: "Junior", major: "Psychology", interests: ["Music", "Hiking", "Film"] },
  { name: "Priya", year: "Sophomore", major: "Biology", interests: ["Cooking", "Yoga", "Art"] },
  { name: "Marcus", year: "Senior", major: "English", interests: ["Film", "Comedy", "Music"] },
  { name: "Lily", year: "Freshman", major: "Design", interests: ["Art", "Photography", "Travel"] },
];

const avatarColors = [
  "from-primary to-secondary",
  "from-secondary to-primary",
  "from-accent to-primary",
  "from-primary to-accent",
];

const MatchReveal = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-3">
            Your Circle is here!
          </h1>
          <p className="text-muted-foreground text-lg">
            Meet the amazing people you've been matched with.
          </p>
        </motion.div>

        {/* Members */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {members.map((m, i) => (
            <motion.div
              key={m.name}
              className="gradient-card rounded-2xl p-5 shadow-card text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.12 }}
            >
              <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${avatarColors[i]} flex items-center justify-center mx-auto mb-3`}>
                <span className="text-primary-foreground font-bold text-lg font-heading">{m.name[0]}</span>
              </div>
              <h3 className="font-semibold font-heading text-foreground">{m.name}</h3>
              <p className="text-sm text-muted-foreground">{m.year} · {m.major}</p>
              <div className="flex flex-wrap gap-1 justify-center mt-3">
                {m.interests.map((int) => (
                  <span key={int} className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
                    {int}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Activity card */}
        <motion.div
          className="gradient-primary rounded-2xl p-8 shadow-elevated text-primary-foreground mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-sm font-medium uppercase tracking-wider opacity-80 mb-2">Your Activity</h3>
          <h2 className="text-2xl font-bold font-heading mb-4">Dinner Night at Zareen's</h2>
          <div className="space-y-2 text-primary-foreground/90">
            <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Saturday, April 12</div>
            <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> 6:30 PM</div>
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> 365 S California Ave, Palo Alto, CA 94306</div>
          </div>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Button variant="hero" size="xl" onClick={() => navigate("/chat")} className="gap-2">
            <MessageCircle className="w-5 h-5" /> Open Group Chat
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default MatchReveal;
