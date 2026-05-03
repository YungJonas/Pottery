// Abstract pottery silhouette SVGs — flat, brutalist, like the moodboard.
// All shapes draw within a 0..200 viewBox. Pass `fill` to override the color.

const Vase = {
  // Curved double-bulb totem
  Totem: ({ fill = "currentColor", className, style }) => (
    <svg viewBox="0 0 200 280" className={className} style={style} preserveAspectRatio="xMidYMid meet">
      <path
        fill={fill}
        d="M70 10 H130 V30 Q160 50 160 90 Q160 120 130 130 Q160 145 160 175 Q160 220 130 240 V270 H70 V240 Q40 220 40 175 Q40 145 70 130 Q40 120 40 90 Q40 50 70 30 Z"
      />
    </svg>
  ),

  // Wide-bottom amphora w/ small neck
  Amphora: ({ fill = "currentColor", className, style }) => (
    <svg viewBox="0 0 200 280" className={className} style={style} preserveAspectRatio="xMidYMid meet">
      <path
        fill={fill}
        d="M85 10 H115 V30 H120 V50 H125 Q175 80 175 170 Q175 240 130 265 H70 Q25 240 25 170 Q25 80 75 50 H80 V30 H85 Z"
      />
    </svg>
  ),

  // Round bottle with skinny neck
  Bottle: ({ fill = "currentColor", className, style }) => (
    <svg viewBox="0 0 200 280" className={className} style={style} preserveAspectRatio="xMidYMid meet">
      <path
        fill={fill}
        d="M82 10 H118 V70 Q170 95 170 175 Q170 250 100 265 Q30 250 30 175 Q30 95 82 70 Z"
      />
    </svg>
  ),

  // Donut / hollow round vase
  Donut: ({ fill = "currentColor", className, style }) => (
    <svg viewBox="0 0 200 280" className={className} style={style} preserveAspectRatio="xMidYMid meet">
      <path
        fill={fill}
        fillRule="evenodd"
        d="M90 15 H110 V40 Q175 60 175 160 Q175 260 100 270 Q25 260 25 160 Q25 60 90 40 Z M100 105 Q60 105 60 165 Q60 220 100 220 Q140 220 140 165 Q140 105 100 105 Z"
      />
    </svg>
  ),

  // Twin-handle pot
  Handle: ({ fill = "currentColor", className, style }) => (
    <svg viewBox="0 0 200 280" className={className} style={style} preserveAspectRatio="xMidYMid meet">
      <path
        fill={fill}
        d="M75 10 H125 Q140 10 140 30 V50 Q175 60 185 110 Q185 130 165 130 Q175 160 175 200 Q175 250 130 270 H70 Q25 250 25 200 Q25 160 35 130 Q15 130 15 110 Q25 60 60 50 V30 Q60 10 75 10 Z M50 80 Q35 90 35 105 Q40 110 50 105 Q60 95 60 80 Z M150 80 Q165 90 165 105 Q160 110 150 105 Q140 95 140 80 Z"
      />
    </svg>
  ),

  // Wavy / segmented vase (column of bulges)
  Wavy: ({ fill = "currentColor", className, style }) => (
    <svg viewBox="0 0 200 280" className={className} style={style} preserveAspectRatio="xMidYMid meet">
      <path
        fill={fill}
        d="M75 10 H125 V40 Q165 50 165 75 Q165 100 125 110 Q165 120 165 145 Q165 170 125 180 Q165 190 165 215 Q165 250 125 265 H75 Q35 250 35 215 Q35 190 75 180 Q35 170 35 145 Q35 120 75 110 Q35 100 35 75 Q35 50 75 40 Z"
      />
    </svg>
  ),

  // Goblet / chalice
  Goblet: ({ fill = "currentColor", className, style }) => (
    <svg viewBox="0 0 200 280" className={className} style={style} preserveAspectRatio="xMidYMid meet">
      <path
        fill={fill}
        d="M40 10 H160 V30 Q160 90 110 110 V190 Q140 200 145 230 Q150 260 175 270 H25 Q50 260 55 230 Q60 200 90 190 V110 Q40 90 40 30 Z"
      />
    </svg>
  ),

  // Stout bowl
  Bowl: ({ fill = "currentColor", className, style }) => (
    <svg viewBox="0 0 200 200" className={className} style={style} preserveAspectRatio="xMidYMid meet">
      <path
        fill={fill}
        d="M15 70 H185 Q180 170 100 175 Q20 170 15 70 Z"
      />
    </svg>
  ),

  // Plate (with subtle rim)
  Plate: ({ fill = "currentColor", className, style }) => (
    <svg viewBox="0 0 200 200" className={className} style={style} preserveAspectRatio="xMidYMid meet">
      <circle cx="100" cy="100" r="90" fill={fill} />
      <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(0,0,0,.18)" strokeWidth="2" />
    </svg>
  ),

  // Cup / mug
  Cup: ({ fill = "currentColor", className, style }) => (
    <svg viewBox="0 0 200 200" className={className} style={style} preserveAspectRatio="xMidYMid meet">
      <path
        fill={fill}
        d="M40 30 H160 V60 Q190 65 190 110 Q190 150 160 150 V170 Q160 190 140 190 H60 Q40 190 40 170 Z M160 80 V130 Q170 130 170 110 Q170 80 160 80 Z"
      />
    </svg>
  ),

  // Jug with spout
  Jug: ({ fill = "currentColor", className, style }) => (
    <svg viewBox="0 0 200 280" className={className} style={style} preserveAspectRatio="xMidYMid meet">
      <path
        fill={fill}
        d="M70 25 Q90 5 130 15 V45 Q170 65 170 160 Q170 250 100 270 Q30 250 30 160 Q30 80 70 55 Z"
      />
    </svg>
  ),

  // Decorative spiral mark (like the moodboard's UCLAY badge swirl)
  Spiral: ({ fill = "currentColor", size = 36 }) => (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path
        d="M20 4 Q34 4 34 18 Q34 30 22 30 Q12 30 12 22 Q12 16 18 16 Q22 16 22 20"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  ),
};

window.Vase = Vase;
