"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { Reveal } from "@/components/reveal";

export function AboutShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    videoRef.current?.play();
  };

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-[#833AB4]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
            About Our Shop
          </p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold sm:text-4xl">
            <span className="text-foreground">See Unique Appliances,</span>{" "}
            <span className="text-gradient">up close</span>
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-foreground">
            A quick look inside our store, and how we sell and service every
            appliance we carry.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Left: static banner image */}
          <Reveal delay={100}>
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-primary/10">
              <img
                src="/images/large banner.jpeg"
                alt="Unique Appliances store"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          {/* Right: click-to-play video, using its own first frame as the cover */}
          <Reveal delay={180}>
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-primary/10">
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                controls={isPlaying}
                playsInline
                preload="metadata"
                onClick={() => !isPlaying && handlePlay()}
              >
                <source src="/images/shopvid2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {!isPlaying && (
                <button
                  type="button"
                  onClick={handlePlay}
                  aria-label="Play shop intro video"
                  className="group absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-300 hover:bg-black/30"
                >
                  <span className="flex size-16 items-center justify-center rounded-full bg-white/90 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
                    <Play
                      className="size-7 translate-x-0.5 text-primary"
                      fill="currentColor"
                    />
                  </span>
                </button>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
