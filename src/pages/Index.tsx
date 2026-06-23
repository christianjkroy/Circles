import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Users, ClipboardList, PartyPopper } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const steps = [
  {
    icon: ClipboardList,
    title: "Fill out a quick form",
    description: "Tell us about your interests, vibe, and what you're into this quarter.",
  },
  {
    icon: Users,
    title: "Get matched into a Circle",
    description: "We pair you with 4-5 people who share your energy and interests.",
  },
  {
    icon: PartyPopper,
    title: "Show up & have fun",
    description: "Your activity is booked, your group chat is ready. Just show up.",
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 gradient-hero-bg" />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
              Spring 2026 Circles are open
            </span>
            <h1 className="text-5xl md:text-7xl font-bold font-heading text-foreground leading-tight mb-6">
              Meet your next{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                best friends.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10">
              Circles matches you with a small group of students who share your interests.
              One form, one activity, endless possibilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="hero"
                size="xl"
                onClick={() => navigate("/onboarding")}
              >
                Join the next Circle
              </Button>
              <Button
                variant="hero-outline"
                size="xl"
                onClick={() => {
                  document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                How it works
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Floating circles decoration */}
        <motion.div
          className="absolute top-20 left-10 w-40 h-40 rounded-full bg-primary/10 blur-2xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-secondary/10 blur-3xl"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">
              How Circles works
            </h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Three simple steps to expanding your world.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                className="gradient-card rounded-2xl p-8 shadow-card text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div className="w-14 h-14 rounded-2xl gradient-btn flex items-center justify-center mx-auto mb-5">
                  <step.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold font-heading text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <motion.div
          className="max-w-3xl mx-auto gradient-primary rounded-3xl p-12 text-center shadow-elevated"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary-foreground mb-4">
            Your circle is waiting.
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-md mx-auto">
            Sign up takes less than 5 minutes. Friendships last a lifetime.
          </p>
          <Button
            variant="hero-outline"
            size="xl"
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            onClick={() => navigate("/onboarding")}
          >
            Get started now
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-muted-foreground text-sm">
        <p>© 2026 Circles. Made for college students everywhere.</p>
      </footer>
    </div>
  );
};

export default Index;
