/**
 * Animated cosmic background — concentric circles + scattered dots, grey on
 * transparent. Decorative only; pointer-events disabled. CSS handles all
 * animations so it is cheap (no JS).
 *
 * 🎨 To tweak intensity / size:
 *   - LAYER configs below          → opacity, scale, rotation speed per layer
 *   - DOTS array                   → number/position of pontinhos
 *   - strokeWidth on <circle>      → line thickness
 *   - text-brand-grey-XX classes   → grey shade (60 darker · 40 medium · 20 lighter)
 */

const RING_RADII = [7.07, 14.14, 21.21, 28.29, 35.36, 42.43, 49.5, 56.57, 63.64, 70.71, 77.79, 84.86, 91.93, 99.0]

// Stars scattered across the canvas (coords on 200×200 viewBox).
const DOTS = [
  { cx: 28, cy: 38, r: 1.2 },
  { cx: 62, cy: 22, r: 0.8 },
  { cx: 148, cy: 30, r: 1.0 },
  { cx: 178, cy: 70, r: 0.7 },
  { cx: 165, cy: 158, r: 1.2 },
  { cx: 110, cy: 188, r: 0.9 },
  { cx: 42, cy: 170, r: 1.0 },
  { cx: 12, cy: 110, r: 0.7 },
  { cx: 86, cy: 16, r: 0.9 },
  { cx: 190, cy: 120, r: 0.9 },
  { cx: 50, cy: 88, r: 0.7 },
  { cx: 152, cy: 92, r: 0.7 },
  { cx: 75, cy: 145, r: 0.9 },
  { cx: 130, cy: 65, r: 0.7 },
  { cx: 100, cy: 50, r: 0.6 },
  { cx: 100, cy: 150, r: 0.6 },
  { cx: 35, cy: 132, r: 0.6 },
  { cx: 165, cy: 50, r: 0.6 },
  { cx: 22, cy: 75, r: 0.5 },
  { cx: 180, cy: 175, r: 0.5 },
  { cx: 60, cy: 60, r: 0.5 },
  { cx: 140, cy: 130, r: 0.5 },
]

export function CosmicBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden text-brand-grey-60"
    >
      {/* Three stacked rotating layers at different speeds for parallax-like depth */}
      <CosmicLayer durationSeconds={90} scale={1.6} opacity={0.45} reverse={false} strokeWidth={0.5} />
      <CosmicLayer durationSeconds={55} scale={1.1} opacity={0.55} reverse strokeWidth={0.4} />
      <CosmicLayer durationSeconds={28} scale={0.7} opacity={0.65} reverse={false} strokeWidth={0.4} />

      <style>{`
        @keyframes cosmic-spin-cw  { to { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes cosmic-spin-ccw { to { transform: translate(-50%, -50%) rotate(-360deg); } }
      `}</style>
    </div>
  )
}

interface LayerProps {
  durationSeconds: number
  scale: number
  opacity: number
  reverse: boolean
  strokeWidth: number
}

function CosmicLayer({ durationSeconds, scale, opacity, reverse, strokeWidth }: LayerProps) {
  const animation = reverse
    ? `cosmic-spin-ccw ${durationSeconds}s linear infinite`
    : `cosmic-spin-cw ${durationSeconds}s linear infinite`

  return (
    <div
      className="absolute left-1/2 top-1/2 aspect-square"
      style={{
        width: `${100 * scale}%`,
        transform: "translate(-50%, -50%)",
        animation,
        opacity,
      }}
    >
      <svg
        viewBox="0 0 200 200"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <g>
          {RING_RADII.map((r) => (
            <circle
              key={r}
              cx="100"
              cy="100"
              r={r}
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {DOTS.map((d, i) => (
            <circle
              key={i}
              cx={d.cx}
              cy={d.cy}
              r={d.r}
              fill="currentColor"
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
