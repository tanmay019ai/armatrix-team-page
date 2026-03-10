"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useId, useRef } from "react";

type YouTubePlayer = {
  destroy?: () => void;
  mute: () => void;
  playVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
};

type YouTubePlayerEvent = {
  target: YouTubePlayer;
};

type YouTubeStateChangeEvent = {
  data: number;
  target: YouTubePlayer;
};

type YouTubeWindow = Window & {
  YT?: {
    Player?: new (
      elementId: string,
      options: {
        host?: string;
        videoId: string;
        playerVars?: Record<string, string | number>;
        events?: {
          onReady?: (event: YouTubePlayerEvent) => void;
          onStateChange?: (event: YouTubeStateChangeEvent) => void;
        };
      },
    ) => YouTubePlayer;
  };
  onYouTubeIframeAPIReady?: () => void;
};

const floatingMedia = [
  {
    src: "/media/product/product-01.jpg",
    alt: "",
    className: "left-[-8%] top-[14%] hidden w-[22rem] rotate-[-10deg] lg:block",
    parallax: { input: [0, 900], output: [0, 90] },
  },
  {
    src: "/media/product/product-03.jpg",
    alt: "",
    className: "right-[-10%] top-[18%] hidden w-[24rem] rotate-[9deg] lg:block",
    parallax: { input: [0, 900], output: [0, -70] },
  },
  {
    src: "/media/product/product-05.jpg",
    alt: "",
    className: "left-[6%] bottom-[-10%] hidden w-[20rem] rotate-[7deg] md:block",
    parallax: { input: [0, 900], output: [0, 60] },
  },
  {
    src: "/media/product/product-07.png",
    alt: "",
    className: "right-[8%] bottom-[-12%] hidden w-[18rem] rotate-[-6deg] md:block",
    parallax: { input: [0, 900], output: [0, -50] },
  },
];

export function ScrollMediaBackdrop() {
  const { scrollY } = useScroll();
  const videoOpacity = useTransform(scrollY, [0, 420, 2400], [0.72, 0.62, 0]);
  const videoScale = useTransform(scrollY, [0, 2000], [1, 1.06]);
  const gridOpacity = useTransform(scrollY, [0, 2200], [0.8, 0]);
  const videoId = "sCH2gQIY67E";
  const playerHostId = useId().replace(/:/g, "");
  const playerReadyRef = useRef(false);
  const playerRef = useRef<YouTubePlayer | null>(null);

  useEffect(() => {
    if (playerReadyRef.current) {
      return undefined;
    }

    const mountPlayer = () => {
      const YT = (window as YouTubeWindow).YT;
      if (!YT?.Player) {
        return;
      }

      if (playerRef.current) {
        return;
      }

      playerRef.current = new YT.Player(playerHostId, {
        host: "https://www.youtube-nocookie.com",
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          loop: 1,
          playlist: videoId,
          playsinline: 1,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
          disablekb: 1,
          fs: 0,
          // Hint autoplay permission + avoids some embed restrictions.
          origin: window.location.origin,
        },
        events: {
          onReady: (event: YouTubePlayerEvent) => {
            try {
              event.target.mute();
              event.target.playVideo();
              playerReadyRef.current = true;
            } catch {
              // Ignore autoplay failures (browser policy). The video can still be clicked if needed.
            }
          },
          onStateChange: (event: YouTubeStateChangeEvent) => {
            // 0 = ended. Ensure looping even if playlist loop fails.
            if (event?.data === 0) {
              try {
                event.target.seekTo(0);
                event.target.playVideo();
              } catch {
                // ignore
              }
            }
          },
        },
      });
    };

    const ensureApi = () => {
      const w = window as YouTubeWindow;
      if (w.YT?.Player) {
        mountPlayer();
        return;
      }

      if (!document.getElementById("yt-iframe-api")) {
        const tag = document.createElement("script");
        tag.id = "yt-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        tag.async = true;
        document.head.appendChild(tag);
      }

      const previous = w.onYouTubeIframeAPIReady;
      w.onYouTubeIframeAPIReady = () => {
        if (typeof previous === "function") {
          previous();
        }
        mountPlayer();
      };
    };

    ensureApi();

    return () => {
      try {
        playerRef.current?.destroy?.();
      } catch {
        // ignore
      }
      playerRef.current = null;
      playerReadyRef.current = false;
    };
  }, [playerHostId]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ opacity: videoOpacity, scale: videoScale }}
      >
        <div
          className="absolute left-1/2 top-1/2 h-[56.25vw] w-[177.78vh] min-h-full min-w-full -translate-x-1/2 -translate-y-1/2"
        >
          <div id={playerHostId} className="h-full w-full" />
        </div>
      </motion.div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.22),transparent_50%),radial-gradient(circle_at_78%_30%,rgba(249,115,22,0.16),transparent_50%),linear-gradient(180deg,rgba(2,6,23,0.18),rgba(2,6,23,0.72)_70%,rgba(2,6,23,0.95))]" />

      {floatingMedia.map((item) => (
        <FloatingMediaCard key={item.src} item={item} scrollY={scrollY} />
      ))}

      <motion.div
        aria-hidden="true"
        style={{ opacity: gridOpacity }}
        className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:5rem_5rem]"
      />
    </div>
  );
}

type FloatingMediaItem = (typeof floatingMedia)[number];

type FloatingMediaCardProps = {
  item: FloatingMediaItem;
  scrollY: ReturnType<typeof useScroll>["scrollY"];
};

function FloatingMediaCard({ item, scrollY }: FloatingMediaCardProps) {
  const y = useTransform(scrollY, item.parallax.input, item.parallax.output);
  const opacity = useTransform(scrollY, [0, 220, 2200], [0, 1, 0]);

  return (
    <motion.div style={{ y, opacity }} className={`absolute ${item.className}`}>
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-[0_35px_120px_rgba(0,0,0,0.55)] backdrop-blur">
        <img src={item.src} alt={item.alt} aria-hidden="true" className="h-full w-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.15),rgba(2,6,23,0.85))]" />
      </div>
    </motion.div>
  );
}
