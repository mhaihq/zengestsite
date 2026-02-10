"use client";

import { BrainCircuit, Database, BookOpen, HeartHandshake, ShieldCheck } from "lucide-react";
import RadialOrbitalTimeline from "../components/ui/radial-orbital-timeline";
import { SEO } from "../components/SEO";

const timelineData = [
  {
    id: 1,
    title: "MEMORY LAYER",
    date: "MEMORY LAYER",
    content: "What the patient said last time. Reported barriers, preferences, interaction history. Every conversation builds on the last.",
    category: "Memory",
    icon: BrainCircuit,
    relatedIds: [2, 4],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "EHR & PATIENT DATA",
    date: "EHR & PATIENT DATA",
    content: "Pulls directly from your EHR. Demographics, meds, conditions, care plan. Hana never asks what it already knows.",
    category: "Data",
    icon: Database,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 3,
    title: "CLINICAL PROTOCOLS",
    date: "CLINICAL PROTOCOLS",
    content: "Your protocols, not ours. Hana follows your clinical guidelines, escalation rules, and safety procedures exactly as defined.",
    category: "Protocols",
    icon: BookOpen,
    relatedIds: [2, 5],
    status: "in-progress" as const,
    energy: 85,
  },
  {
    id: 4,
    title: "ENGAGEMENT & PERSONALIZATION",
    date: "ENGAGEMENT & PERSONALIZATION",
    content: "Learns how each patient prefers to communicate voice vs text, time of day, language, complexity. Adapts automatically.",
    category: "Engagement",
    icon: HeartHandshake,
    relatedIds: [1, 5],
    status: "in-progress" as const,
    energy: 75,
  },
  {
    id: 5,
    title: "SAFETY & OBSERVABILITY",
    date: "SAFETY & OBSERVABILITY",
    content: "Real-time risk detection. Suicidality, distress, red flags flagged instantly and escalated to your team per your protocol.",
    category: "Safety",
    icon: ShieldCheck,
    relatedIds: [3, 4],
    status: "completed" as const,
    energy: 100,
  },
];

export function RadialOrbitalTimelineDemo() {
  return (
    <>
      <SEO 
        title="Reasoning Engine"
        description="See how Hana's Reasoning Engine works. Five layers of intelligence—Memory, Data, Protocols, Engagement, and Safety—power every patient interaction."
      />
      <RadialOrbitalTimeline 
        timelineData={timelineData} 
        label="Hana Reasoning Engine"
        title="How Hana thinks before it speaks."
        description="Every patient interaction is powered by five layers of reasoning not a generic chatbot reading a script."
      />
    </>
  );
}

export default RadialOrbitalTimelineDemo;
