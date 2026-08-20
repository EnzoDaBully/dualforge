import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageA, imageB, scene } = body;

    if (!imageA || !imageB || !scene) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const FAL_KEY = "0e1cedda-6958-4cd8-bd76-744d9b5f0af7:35bf4089b513b719f02c39671dec77b6";
    if (!FAL_KEY) {
      return NextResponse.json({ error: "API key not set" }, { status: 500 });
    }

    // Build a simple prompt based on the scene
    const scenePrompts: Record<string, string> = {
      blowjob: "two men, intimate oral scene, detailed faces, realistic, cinematic lighting",
      missionary: "two men in missionary position, face to face, intimate, detailed faces, realistic",
      doggy: "two men in doggy style, from behind, detailed faces, realistic, cinematic",
      "69": "two men in 69 position, mutual oral, detailed faces, realistic",
      standing: "two men standing intimate scene against wall, detailed faces, realistic",
      shower: "two men in shower, wet, steamy, intimate, detailed faces, realistic",
      couch: "two men on couch, intimate scene, detailed faces, realistic living room",
      bed: "two men on bed, intimate scene, detailed faces, realistic bedroom lighting",
    };

    const prompt = scenePrompts[scene] || "two men intimate scene, detailed faces, realistic";

    // Call fal.ai MiniMax H3 reference-to-video
    const response = await fetch("https://queue.fal.run/minimax/h3/reference-to-video", {
      method: "POST",
      headers: {
        Authorization: `Key ${FAL_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `Image 1 is the first person. Image 2 is the second person. ${prompt}. Keep both faces consistent with the reference images.`,
        reference_image_urls: [imageA, imageB],
        duration: 5,
        resolution: "768P",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      return NextResponse.json({ error: data.message || "Generation failed" }, { status: 500 });
    }

    // fal returns a request_id for queue
    return NextResponse.json({
      request_id: data.request_id,
      status_url: data.status_url,
      response_url: data.response_url,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
