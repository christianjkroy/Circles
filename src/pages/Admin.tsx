import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Calendar, MessageSquare } from "lucide-react";

const groups = [
  { id: 1, members: ["Alex", "Jordan", "Priya", "Marcus", "Lily"], activity: "Dinner at Zareen's", date: "Apr 12", status: "Confirmed" },
  { id: 2, members: ["Sam", "Devon", "Mia", "Chris"], activity: "Board Games", date: "Apr 14", status: "Pending" },
  { id: 3, members: ["Taylor", "Jamie", "Rio", "Quinn", "Sage"], activity: "Hiking Trail", date: "Apr 13", status: "Confirmed" },
];

const feedbackData = [
  { group: 1, rating: 4.5, meetAgain: "80% yes", comments: 3 },
  { group: 3, rating: 4.8, meetAgain: "100% yes", comments: 5 },
];

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold font-heading text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground text-sm">Spring 2026 · 3 active circles</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: Users, label: "Total Students", value: "14" },
            { icon: Calendar, label: "Active Circles", value: "3" },
            { icon: MessageSquare, label: "Feedback Received", value: "8" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="gradient-card rounded-2xl p-5 shadow-card">
              <Icon className="w-5 h-5 text-primary mb-2" />
              <p className="text-2xl font-bold font-heading text-foreground">{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        <Tabs defaultValue="groups">
          <TabsList className="mb-4">
            <TabsTrigger value="groups">Groups</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="groups" className="space-y-3">
            {groups.map((g) => (
              <div key={g.id} className="gradient-card rounded-xl p-5 shadow-card flex items-center justify-between">
                <div>
                  <h3 className="font-semibold font-heading text-foreground">Circle #{g.id} — {g.activity}</h3>
                  <p className="text-sm text-muted-foreground">{g.members.join(", ")}</p>
                  <p className="text-xs text-muted-foreground mt-1">{g.date}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  g.status === "Confirmed" ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {g.status}
                </span>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="feedback" className="space-y-3">
            {feedbackData.map((f) => (
              <div key={f.group} className="gradient-card rounded-xl p-5 shadow-card">
                <h3 className="font-semibold font-heading text-foreground">Circle #{f.group}</h3>
                <div className="flex gap-6 mt-2 text-sm text-muted-foreground">
                  <span>Rating: {f.rating}/5</span>
                  <span>Meet again: {f.meetAgain}</span>
                  <span>{f.comments} comments</span>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
