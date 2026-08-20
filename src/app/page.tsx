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

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    which: "A" | "B"
  ) => {
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
      setStatus("Done (placeholder video for now)");
    } catch (err) {
      setStatus("Something went wrong.");
    } finally {
      setIsGenerating(false);
    }
  };

  const canGenerate = !!(imageA && imageB && selectedScene && !isGenerating);

  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-100 flex flex-col">
      <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md pt-[env(safe-area-inset-top)]">
        <div className="px-4 py-3 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-sm font-bold">DF</div>
          <div>
            <h1 className="font-semibold text-base leading-tight">DualForge</h1>
            <p className="text-[11px] text-zinc-500 leading-tight">Dual-face video</p>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-5 pb-28 max-w-lg mx-auto w-full">
        <section className="mb-8">
          <h2 className="text-base font-semibold mb-1">1. Upload faces</h2>
          <p className="text-xs text-zinc-500 mb-4">Clear photos work best.</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden">
              <div className="px-3 pt-2.5 pb-1.5 flex justify-between">
                <span className="text-xs font-medium text-zinc-400">You</span>
                {imageA && <button onClick={() => setImageA(null)} className="text-[11px] text-zinc-500">Clear</button>}
              </div>
              <button type="button" onClick={() => fileARef.current?.click()} className="w-full aspect-[3/4] bg-zinc-950 flex items-center justify-center">
                {imageA ? <img src={imageA} alt="You" className="w-full h-full object-cover" /> : <div className="text-center"><div className="text-2xl text-zinc-600">+</div><p className="text-[11px] text-zinc-500">Tap</p></div>}
              </button>
              <input ref={fileARef} type="file" accept="image/*" capture="user" className="hidden" onChange={(e) => handleImageUpload(e, "A")} />
            </div>
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden">
              <div className="px-3 pt-2.5 pb-1.5 flex justify-between">
                <span className="text-xs font-medium text-zinc-400">Other</span>
                {imageB && <button onClick={() => setImageB(null)} className="text-[11px] text-zinc-500">Clear</button>}
              </div>
              <button type="button" onClick={() => fileBRef.current?.click()} className="w-full aspect-[3/4] bg-zinc-950 flex items-center justify-center">
                {imageB ? <img src={imageB} alt="Other" className="w-full h-full object-cover" /> : <div className="text-center"><div className="text-2xl text-zinc-600">+</div><p className="text-[11px] text-zinc-500">Tap</p></div>}
              </button>
              <input ref={fileBRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "B")} />
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-base font-semibold mb-1">2. Pick scene</h2>
          <div className="grid grid-cols-2 gap-2.5">
            {SCENES.map((scene) => (
              <button key={scene.id} type="button" onClick={() => setSelectedScene(scene.id)}
                className={`text-left p-3.5 rounded-xl border ${selectedScene === scene.id ? "border-rose-600 bg-rose-600/15" : "border-zinc-800 bg-zinc-900/80"}`}>
                <div className="font-medium text-sm">{scene.label}</div>
                <div className="text-[11px] text-zinc-500">{scene.desc}</div>
              </button>
            ))}
          </div>
        </section>

        {status && <p className="text-sm text-zinc-400 mb-4 text-center">{status}</p>}

        {resultUrl && (
          <section className="mb-8">
            <h2 className="text-base font-semibold mb-3">Result</h2>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
              <video src={resultUrl} controls playsInline className="w-full aspect-video bg-black" autoPlay loop />
              <div className="p-3 flex gap-2">
                <a href={resultUrl} download className="flex-1 text-center text-sm py-2.5 rounded-xl bg-zinc-800">Download</a>
                <button type="button" onClick={() => { setResultUrl(null); setStatus(""); }} className="flex-1 text-sm py-2.5 rounded-xl bg-zinc-800">Clear</button>
              </div>
            </div>
          </section>
        )}
      </main>

      <div className="fixed bottom-0 inset-x-0 z-40 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800 pb-[env(safe-area-inset-bottom)]">
        <div className="px-4 py-3 max-w-lg mx-auto">
          <button type="button" onClick={handleGenerate} disabled={!canGenerate}
            className={`w-full py-3.5 rounded-2xl font-semibold text-sm ${canGenerate ? "bg-rose-600 text-white" : "bg-zinc-800 text-zinc-500"}`}>
            {isGenerating ? "Generating..." : "Generate Video"}
          </button>
        </div>
      </div>
    </div>
  );
}
