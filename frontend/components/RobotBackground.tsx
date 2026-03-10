"use client";

import {
  motion,
  useMotionTemplate,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";


type RobotBackgroundProps = {
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
};


const armSegments = [
  { x1: 210, y1: 560, x2: 320, y2: 500, width: 28 },
  { x1: 320, y1: 500, x2: 440, y2: 465, width: 26 },
  { x1: 440, y1: 465, x2: 575, y2: 395, width: 24 },
  { x1: 575, y1: 395, x2: 720, y2: 348, width: 22 },
  { x1: 720, y1: 348, x2: 860, y2: 282, width: 18 },
];

const ghostSegments = [
  { x1: 250, y1: 610, x2: 360, y2: 560, width: 18 },
  { x1: 360, y1: 560, x2: 490, y2: 520, width: 16 },
  { x1: 490, y1: 520, x2: 625, y2: 452, width: 15 },
  { x1: 625, y1: 452, x2: 760, y2: 420, width: 13 },
];


export function RobotBackground({ pointerX, pointerY }: RobotBackgroundProps) {
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-14, 14]), {
    stiffness: 120,
    damping: 24,
    mass: 0.9,
  });
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [12, -12]), {
    stiffness: 120,
    damping: 24,
    mass: 0.9,
  });
  const shiftX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-32, 32]), {
    stiffness: 110,
    damping: 22,
  });
  const shiftY = useSpring(useTransform(pointerY, [-0.5, 0.5], [-24, 24]), {
    stiffness: 110,
    damping: 22,
  });
  const glowX = useTransform(pointerX, [-0.5, 0.5], ["28%", "72%"]);
  const glowY = useTransform(pointerY, [-0.5, 0.5], ["30%", "70%"]);
  const spotlight = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(34, 211, 238, 0.22), transparent 24%), radial-gradient(circle at 68% 42%, rgba(249, 115, 22, 0.16), transparent 18%)`;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        style={{ backgroundImage: spotlight }}
        className="absolute inset-0 opacity-90"
      />

      <motion.div
        style={{ rotateX, rotateY, x: shiftX, y: shiftY, transformPerspective: 1600 }}
        className="absolute inset-x-[4%] top-[10%] h-[78%] will-change-transform"
      >
        <motion.div
          animate={{ y: [0, -18, 0], rotateZ: [0, 0.8, -0.8, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="h-full w-full"
        >
          <svg viewBox="0 0 1200 800" className="h-full w-full opacity-90" aria-hidden="true">
            <defs>
              <linearGradient id="armatrix-arm-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.92)" />
                <stop offset="45%" stopColor="rgba(103,232,249,0.92)" />
                <stop offset="100%" stopColor="rgba(34,211,238,0.42)" />
              </linearGradient>
              <linearGradient id="armatrix-ghost-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(251,146,60,0.42)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
              </linearGradient>
              <radialGradient id="armatrix-joint-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
                <stop offset="50%" stopColor="rgba(103,232,249,0.7)" />
                <stop offset="100%" stopColor="rgba(34,211,238,0.08)" />
              </radialGradient>
              <filter id="armatrix-blur-glow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="18" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g opacity="0.3">
              <path d="M120 620C290 560 500 450 720 330C850 260 980 210 1085 188" stroke="rgba(148,163,184,0.14)" strokeWidth="2" strokeDasharray="10 12" fill="none" />
              <path d="M150 675C355 600 560 520 760 424C882 366 982 322 1090 300" stroke="rgba(148,163,184,0.10)" strokeWidth="2" strokeDasharray="8 14" fill="none" />
            </g>

            <motion.g
              animate={{ opacity: [0.38, 0.62, 0.38] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
              filter="url(#armatrix-blur-glow)"
            >
              {ghostSegments.map((segment, index) => (
                <line
                  key={`ghost-${index}`}
                  x1={segment.x1}
                  y1={segment.y1}
                  x2={segment.x2}
                  y2={segment.y2}
                  stroke="url(#armatrix-ghost-gradient)"
                  strokeWidth={segment.width}
                  strokeLinecap="round"
                />
              ))}
            </motion.g>

            <motion.g
              animate={{ rotate: [0, 1.4, -1.2, 0] }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "500px 480px" }}
            >
              {armSegments.map((segment, index) => (
                <g key={`segment-${index}`}>
                  <line
                    x1={segment.x1}
                    y1={segment.y1 + 12}
                    x2={segment.x2}
                    y2={segment.y2 + 12}
                    stroke="rgba(2,6,23,0.65)"
                    strokeWidth={segment.width + 6}
                    strokeLinecap="round"
                  />
                  <line
                    x1={segment.x1}
                    y1={segment.y1}
                    x2={segment.x2}
                    y2={segment.y2}
                    stroke="url(#armatrix-arm-gradient)"
                    strokeWidth={segment.width}
                    strokeLinecap="round"
                  />
                  <line
                    x1={segment.x1}
                    y1={segment.y1 - 4}
                    x2={segment.x2}
                    y2={segment.y2 - 4}
                    stroke="rgba(255,255,255,0.28)"
                    strokeWidth={Math.max(2, segment.width / 6)}
                    strokeLinecap="round"
                    opacity="0.9"
                  />
                </g>
              ))}

              {armSegments.flatMap((segment, index) => {
                const joints = index === armSegments.length - 1
                  ? [
                      { cx: segment.x1, cy: segment.y1, r: segment.width * 0.56 },
                      { cx: segment.x2, cy: segment.y2, r: segment.width * 0.72 },
                    ]
                  : [{ cx: segment.x1, cy: segment.y1, r: segment.width * 0.56 }];

                return joints.map((joint, jointIndex) => (
                  <g key={`joint-${index}-${jointIndex}`}>
                    <circle cx={joint.cx} cy={joint.cy + 10} r={joint.r + 4} fill="rgba(2,6,23,0.65)" />
                    <circle cx={joint.cx} cy={joint.cy} r={joint.r + 6} fill="rgba(6,12,28,0.9)" stroke="rgba(103,232,249,0.18)" />
                    <circle cx={joint.cx} cy={joint.cy} r={joint.r} fill="url(#armatrix-joint-glow)" />
                    <circle cx={joint.cx - 3} cy={joint.cy - 3} r={joint.r / 4} fill="rgba(255,255,255,0.88)" />
                  </g>
                ));
              })}
            </motion.g>

            <motion.g
              animate={{ x: [0, 14, 0], y: [0, -10, 0] }}
              transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <circle cx="917" cy="257" r="15" fill="rgba(255,255,255,0.9)" />
              <circle cx="917" cy="257" r="44" fill="rgba(34,211,238,0.14)" />
              <path d="M920 257L985 220" stroke="rgba(103,232,249,0.9)" strokeWidth="5" strokeLinecap="round" />
              <path d="M917 257L975 282" stroke="rgba(251,146,60,0.66)" strokeWidth="4" strokeLinecap="round" />
              <circle cx="988" cy="219" r="10" fill="rgba(255,255,255,0.9)" />
              <circle cx="978" cy="283" r="8" fill="rgba(251,146,60,0.85)" />
            </motion.g>

            <motion.g
              animate={{ opacity: [0.25, 0.6, 0.25] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <circle cx="316" cy="500" r="90" fill="rgba(34,211,238,0.06)" />
              <circle cx="723" cy="350" r="120" fill="rgba(34,211,238,0.04)" />
              <circle cx="910" cy="257" r="100" fill="rgba(249,115,22,0.05)" />
            </motion.g>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}