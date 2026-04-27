/**
 * Animated cosmic background — concentric circles + scattered dots, grey on
 * transparent. Decorative only; pointer-events disabled. CSS handles all
 * animations so it is cheap (no JS).
 *
 * 🎨 To tweak intensity / size:
 *   - opacityClass below ('opacity-[0.18]')   → overall visibility
 *   - <circle r=...>                          → ring spacing (Pythagoras-aligned)
 *   - animation durations in <style>          → faster/slower rotation
 *   - DOTS array                              → number/position of pontinhos
 */

const RING_RADII = [7.07, 14.14, 21.21, 28.29, 35.36, 42.43, 49.5, 56.57, 63.64, 70.71, 77.79, 84.86, 91.93, 99.0]

// Random-but-stable dots scattered on the canvas (px coords on a 200×200 viewBox).
const DOTS = [
  { cx: 28, cy: 38, r: 0.7 },
  { cx: 62, cy: 22, r: 0.5 },
  { cx: 148, cy: 30, r: 0.6 },
  { cx: 178, cy: 70, r: 0.4 },
  { cx: 165, cy: 158, r: 0.7 },
  { cx: 110, cy: 188, r: 0.5 },
  { cx: 42, cy: 170, r: 0.6 },
  { cx: 12, cy: 110, r: 0.4 },
  { cx: 86, cy: 16, r: 0.5 },
  { cx: 190, cy: 120, r: 0.5 },
  { cx: 50, cy: 88, r: 0.4 },
  { cx: 152, cy: 92, r: 0.4 },
  { cx: 75, cy: 145, r: 0.5 },
  { cx: 130, cy: 65, r: 0.4 },
  { cx: 100, cy: 50, r: 0.3 },
  { cx: 100, cy: 150, r: 0.3 },
  { cx: 35, cy: 132, r: 0.3 },
  { cx: 165, cy: 50, r: 0.3 },
]

export function CosmicBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden text-brand-grey-40"
    >
      {/* Three stacked rotating layers at different speeds for parallax-like depth */}
      <CosmicLayer speed="slow" scale={1.4} opacity={0.16} reverse={false} />
      <CosmicLayer speed="medium" scale={1.0} opacity={0.22} reverse />
      <CosmicLayer speed="fast" scale={0.7} opacity={0.18} reverse={false} />

      <style>{`
        @keyframes cosmic-spin-cw  { to { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes cosmic-spin-ccw { to { transform: translate(-50%, -50%) rotate(-360deg); } }
        @keyframes cosmic-pulse    { 0%,100% { opacity: var(--cosmic-opacity, 0.2); } 50% { opacity: calc(var(--cosmic-opacity, 0.2) * 0.55); } }
      `}</style>
    </div>
  )
}

interface LayerProps {
  speed: "slow" | "medium" | "fast"
  scale: number
  opacity: number
  reverse: boolean
}

function CosmicLayer({ speed, scale, opacity, reverse }: LayerProps) {
  const duration = speed === "slow" ? 240 : speed === "medium" ? 140 : 80
  const animation = reverse
    ? `cosmic-spin-ccw ${duration}s linear infinite`
    : `cosmic-spin-cw ${duration}s linear infinite`

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
        <g style={{ animation: `cosmic-pulse ${duration / 4}s ease-in-out infinite` }}>
          {RING_RADII.map((r) => (
            <circle
              key={r}
              cx="100"
              cy="100"
              r={r}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.3"
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
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
