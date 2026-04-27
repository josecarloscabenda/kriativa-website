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

// Sparse ring set — keeps the cosmic feel without saturating the canvas.
const RING_RADII = [42.43, 99.0]

// Sparse stars scattered across the canvas (coords on 200×200 viewBox).
const DOTS = [
  { cx: 28, cy: 38, r: 1.2 },
  { cx: 148, cy: 30, r: 1.0 },
  { cx: 178, cy: 70, r: 0.7 },
  { cx: 165, cy: 158, r: 1.2 },
  { cx: 42, cy: 170, r: 1.0 },
  { cx: 12, cy: 110, r: 0.7 },
  { cx: 86, cy: 16, r: 0.9 },
  { cx: 130, cy: 65, r: 0.7 },
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
