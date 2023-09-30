"use client";

import { useRef, useState } from "react";

let animationController;

export default function AudioVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const source = useRef<MediaElementAudioSourceNode>();
  const analyzer = useRef<AnalyserNode>();

  const [file, setFile] = useState<File | null>(null);

  function handleAudioPlay() {
    if (!audioRef.current) return;
    const audioContext = new AudioContext();

    if (!source.current) {
      source.current = audioContext.createMediaElementSource(audioRef.current);
      analyzer.current = audioContext.createAnalyser();

      source.current.connect(analyzer.current);
      analyzer.current.connect(audioContext.destination);
    }

    visualizeData();
  }

  function visualizeData() {
    if (!canvasRef.current) return;
    if (!audioRef.current) return;
    if (!analyzer.current) return;

    animationController = requestAnimationFrame(visualizeData);

    if (audioRef.current.paused) {
      return cancelAnimationFrame(animationController);
    }

    const songData = new Uint8Array(140);
    analyzer.current.getByteFrequencyData(songData);

    let start = 0;
    const barWidth = 3;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    for (let i = 0; i < songData.length; i++) {
      start = i * 4;

      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      gradient.addColorStop(0.2, "#2392f5");
      gradient.addColorStop(0.5, "#fe0095");
      gradient.addColorStop(1.0, "purple");

      ctx.fillStyle = gradient;
      ctx.fillRect(start, canvasRef.current.height, barWidth, -songData[i]);
    }
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col items-center">
        <input
          type="file"
          onChange={({ target: { files } }) => {
            const file = files?.[0];
            if (file) setFile(file);
          }}
        />
        {file && (
          <audio
            ref={audioRef}
            controls
            onPlay={handleAudioPlay}
            src={URL.createObjectURL(file)}
          />
        )}
        <canvas ref={canvasRef} width={500} height={200} />
      </div>
    </div>
  );
}
