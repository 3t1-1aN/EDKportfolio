"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ModelViewerProps {
  /** Path to a .glb file (Draco compressed files are fine) */
  src: string;
  alt: string;
  poster?: string;
  className?: string;
}

let loadPromise: Promise<unknown> | null = null;

/**
 * Loads @google/model-viewer on first use only, so the library and its three.js
 * bundle never ship with the normal page load. Draco files decode from /public/draco.
 */
function loadModelViewer() {
  if (!loadPromise) {
    loadPromise = import("@google/model-viewer").then((mod) => {
      mod.ModelViewerElement.dracoDecoderLocation = "/draco/";
    });
  }
  return loadPromise;
}

export function ModelViewer({ src, alt, poster, className }: ModelViewerProps) {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    loadModelViewer()
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      className={cn("relative w-full bg-black/30", className)}
      // keep wheel and touch gestures inside the viewer instead of the page
      data-lenis-prevent
    >
      {ready && !failed ? (
        React.createElement("model-viewer", {
          src,
          alt,
          poster,
          "camera-controls": "",
          "auto-rotate": "",
          "rotation-per-second": "20deg",
          "interaction-prompt": "none",
          "shadow-intensity": "1",
          "shadow-softness": "0.8",
          exposure: "1.05",
          "environment-image": "neutral",
          "touch-action": "pan-y",
          style: { width: "100%", height: "100%", background: "transparent" },
        })
      ) : poster ? (
        <img src={poster} alt={alt} className="h-full w-full object-contain" />
      ) : null}
      {!failed && (
        <p className="pointer-events-none absolute bottom-2 left-0 right-0 text-center text-xs text-zinc-400">
          Drag to rotate. Preview shape from MakerWorld.
        </p>
      )}
    </div>
  );
}
