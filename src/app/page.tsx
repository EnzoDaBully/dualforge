"use client";

import { useState, useRef } from "react";

const SCENES = [
  { id: "blowjob", label: "Blowjob", desc: "Oral, close-up faces" },
  { id: "missionary", label: "Missionary", desc: "Face-to-face" },
  { id: "doggy", label: "Doggy", desc: "From behind" },
  { id: "69", label: "69", desc: "Mutual oral" },
  { id: "standing", label: "Standing", desc: "Against wall" },
  { id: "shower", label: "Shower", desc: "Wet & steamy" },
  { id: "couch", label: "Couch", desc: "Living room" },
  { id: "bed", label: "Bed", desc: "Bedroom" },
];

export default function Home() {
  const [imageA, setImageA] = useState<string | null>(null);
  const [imageB, setImageB] = useState<string | null>(null);
  const [selectedScene, setSelectedScene] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [status, setStatus] = useState("");

  const fileARef = useRef<HTMLInputElement>(null);
  const fileBRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, which: "A" | "B") => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      if (which === "A") setImageA(result);
      else setImageB(result);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!imageA || !imageB || !selectedScene) {
      setStatus("Upload both pics and pick a scene.");
      return;
    }
    setIsGenerating(true);
    setStatus("Preparing...");
    setResultUrl(null);
    try {
      await new Promise((r) => setTimeout(r, 1200));
      setStatus("Sending faces to model...");
      await new Promise((r) => setTimeout(r, 1800));
      setStatus("Generating video... this can take a few minutes");
      await new Promise((r) => setTimeout(r, 2500));
      setResultUrl("https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4");
      setStatus("Done (placeholder for now)");
    } catch {
      setStatus("Something went wrong.");
    } finally {
      setIsGenerating(false);
    }
  };

  const canGenerate = !!(imageA && imageB && selectedScene && !isGenerating);

  return (
    <div style={{ minHeight: "100dvh", background: "#09090b", color: "#fafafa", display: "flex", flexDirection: "column", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid #27272a", background: "rgba(9,9,11,0.9)", paddingTop: "env(
