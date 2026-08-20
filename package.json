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

  const pollResult = async (statusUrl: string, responseUrl: string) => {
    for (let i = 0; i < 60; i++) {
      await new Promise((r) => setTimeout(r, 3000));
      setStatus(`Generating... (${i * 3}s)`);

      try {
        const res = await fetch(statusUrl);
        const data = await res.json();

        if (data.status === "COMPLETED") {
          const finalRes = await fetch(responseUrl);
          const finalData = await finalRes.json();
          const videoUrl = finalData?.video?.url || finalData?.data?.video?.url;
          if (videoUrl) {
            setResultUrl(videoUrl);
            setStatus("Done");
            return;
          }
        }

        if (data.status === "FAILED") {
          setStatus("Generation failed");
          return;
        }
      } catch {
        // keep polling
      }
    }
    setStatus("Timed out. Try again.");
  };

  const handleGenerate = async () => {
    if (!imageA || !imageB || !selectedScene) {
      setStatus("Upload both pics and pick a scene.");
      return;
    }

    setIsGenerating(true);
    setStatus("Sending to model...");
    setResultUrl(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageA,
          imageB,
          scene: selectedScene,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus(data.error || "Something went wrong");
        setIsGenerating(false);
        return;
      }

      setStatus("Queued... waiting for video");
      await pollResult(data.status_url, data.response_url);
    } catch (err) {
      setStatus("Network error");
    } finally {
      setIsGenerating(false);
    }
  };

  const canGenerate = !!(imageA && imageB && selectedScene && !isGenerating);

  return (
    <div style={{ minHeight: "100dvh", background: "#09090b", color: "#fafafa", display: "flex", flexDirection: "column", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid #27272a", background: "rgba(9,9,11,0.9)", paddingTop: "env(safe-area-inset-top)" }}>
        <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "#e11d48", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14 }}>DF</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 16 }}>DualForge</div>
            <div style={{ fontSize: 11, color: "#71717a" }}>Dual-face video</div>
          </div>
        </div>
      </header>

      <main style={{ flex: 1, padding: "20px 16px 120px", maxWidth: 480, margin: "0 auto", width: "100%" }}>
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>1. Upload faces</h2>
          <p style={{ fontSize: 12, color: "#71717a", marginBottom: 16 }}>Clear photos work best</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ background: "#18181b", border: "1px solid #27272a", borderRadius: 16, overflow: "hidden" }}>
              <div style={{ padding: "10px 12px 6px", display: "flex", justifyContent: "space-between", fontSize: 12, color: "#a1a1aa" }}>
                <span>You</span>
                {imageA && <button onClick={() => setImageA(null)} style={{ background: "none", border: "none", color: "#71717a", fontSize: 11 }}>Clear</button>}
              </div>
              <button onClick={() => fileARef.current?.click()} style={{ width: "100%", aspectRatio: "3/4", background: "#09090b", border: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {imageA ? <img src={imageA} alt="You" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ textAlign: "center", color: "#52525b" }}><div style={{ fontSize: 24 }}>+</div><div style={{ fontSize: 11 }}>Tap</div></div>}
              </button>
              <input ref={fileARef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleImageUpload(e, "A")} />
            </div>
            <div style={{ background: "#18181b", border: "1px solid #27272a", borderRadius: 16, overflow: "hidden" }}>
              <div style={{ padding: "10px 12px 6px", display: "flex", justifyContent: "space-between", fontSize: 12, color: "#a1a1aa" }}>
                <span>Other</span>
                {imageB && <button onClick={() => setImageB(null)} style={{ background: "none", border: "none", color: "#71717a", fontSize: 11 }}>Clear</button>}
              </div>
              <button onClick={() => fileBRef.current?.click()} style={{ width: "100%", aspectRatio: "3/4", background: "#09090b", border: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {imageB ? <img src={imageB} alt="Other" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ textAlign: "center", color: "#52525b" }}><div style={{ fontSize: 24 }}>+</div><div style={{ fontSize: 11 }}>Tap</div></div>}
              </button>
              <input ref={fileBRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleImageUpload(e, "B")} />
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>2. Pick scene</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {SCENES.map((scene) => (
              <button key={scene.id} onClick={() => setSelectedScene(scene.id)}
                style={{
                  textAlign: "left", padding: 14, borderRadius: 12, border: selectedScene === scene.id ? "1px solid #e11d48" : "1px solid #27272a",
                  background: selectedScene === scene.id ? "rgba(225,29,72,0.15)" : "#18181b", color: "#fafafa"
                }}>
                <div style={{ fontWeight: 500, fontSize: 14 }}>{scene.label}</div>
                <div style={{ fontSize: 11, color: "#71717a" }}>{scene.desc}</div>
              </button>
            ))}
          </div>
        </section>

        {status && <p style={{ textAlign: "center", color: "#a1a1aa", fontSize: 14, marginBottom: 16 }}>{status}</p>}

        {resultUrl && (
          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Result</h2>
            <div style={{ background: "#18181b", border: "1px solid #27272a", borderRadius: 16, overflow: "hidden" }}>
              <video src={resultUrl} controls playsInline style={{ width: "100%", aspectRatio: "16/9", background: "#000" }} autoPlay loop />
              <div style={{ padding: 12, display: "flex", gap: 8 }}>
                <a href={resultUrl} download className="download" style={{ flex: 1, textAlign: "center", padding: "10px 0", borderRadius: 10, background: "#27272a", color: "#fafafa", textDecoration: "none", fontSize: 14 }}>Download</a>
                <button onClick={() => { setResultUrl(null); setStatus(""); }} style={{ flex: 1, padding: "10px 0", borderRadius: 10, background: "#27272a", border: "none", color: "#fafafa", fontSize: 14 }}>Clear</button>
              </div>
            </div>
          </section>
        )}
      </main>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(9,9,11,0.95)", borderTop: "1px solid #27272a", paddingBottom: "env(safe-area-inset-bottom)" }}>
        <div style={{ padding: "12px 16px", maxWidth: 480, margin: "0 auto" }}>
          <button onClick={handleGenerate} disabled={!canGenerate}
            style={{
              width: "100%", padding: "14px 0", borderRadius: 16, border: "none", fontWeight: 600, fontSize: 15,
              background: canGenerate ? "#e11d48" : "#27272a", color: canGenerate ? "#fff" : "#71717a"
            }}>
            {isGenerating ? "Generating..." : "Generate Video"}
          </button>
        </div>
      </div>
    </div>
  );
}
