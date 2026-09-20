import { MotionConfig, motion } from 'framer-motion'
import './BirthdayLogo.css'

/* ─── Sparkle Particle System ─── */
function Sparkle({ x, y, size = 4, delay = 0 }) {
  return (
    <motion.circle
      cx={x}
      cy={y}
      r={size}
      fill="white"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0, 1.2, 0.8, 0],
      }}
      transition={{
        duration: 2.2,
        delay,
        repeat: Infinity,
        repeatDelay: 1.5 + ((x + y) % 30) / 10,
        ease: 'easeInOut',
      }}
      style={{ filter: 'blur(0.5px)' }}
    />
  )
}

/* ─── Floating Confetti ─── */
function ConfettiPiece({ x, y, color, rotation, delay, shape = 'rect' }) {
  return (
    <motion.g
      initial={{ y: -40, opacity: 0 }}
      animate={{
        y: [-20, 12, -8, 4, 0],
        x: [-5, 7, -3, 5, 0],
        opacity: [0, 1, 1, 1, 0.8],
        rotate: [rotation, rotation + 180, rotation + 360],
      }}
      transition={{
        duration: 4 + ((x + y) % 20) / 10,
        delay,
        repeat: Infinity,
        repeatDelay: ((x * 3 + y) % 20) / 10,
        ease: 'easeInOut',
      }}
    >
      {shape === 'circle' ? (
        <circle cx={x} cy={y} r="5" fill={color} />
      ) : shape === 'star' ? (
        <polygon
          points={`${x},${y - 6} ${x + 2},${y - 2} ${x + 6},${y - 2} ${x + 3},${y + 1} ${x + 4},${y + 6} ${x},${y + 3} ${x - 4},${y + 6} ${x - 3},${y + 1} ${x - 6},${y - 2} ${x - 2},${y - 2}`}
          fill={color}
        />
      ) : (
        <rect
          x={x - 5}
          y={y - 3}
          width="10"
          height="6"
          rx="2"
          fill={color}
          transform={`rotate(${rotation} ${x} ${y})`}
        />
      )}
    </motion.g>
  )
}

/* ─── Animated Balloon ─── */
function FloatingBalloon({ cx, cy, color, highlight, delay = 0, stringLength = 120 }) {
  return (
    <motion.g
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, delay, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <motion.g
        animate={{
          y: [-4, 6, -4],
          x: [-2, 3, -2],
          rotate: [-2, 2, -2],
        }}
        transition={{
          duration: 4 + ((cx + cy) % 20) / 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        {/* Balloon Glow */}
        <ellipse
          cx={cx}
          cy={cy}
          rx="52"
          ry="62"
          fill={color}
          opacity="0.15"
          style={{ filter: 'blur(12px)' }}
        />

        {/* Balloon Body */}
        <ellipse cx={cx} cy={cy} rx="38" ry="48" fill={color} />

        {/* Glass highlight */}
        <ellipse
          cx={cx - 12}
          cy={cy - 16}
          rx="7"
          ry="18"
          fill="white"
          opacity="0.55"
          transform={`rotate(-20 ${cx - 12} ${cy - 16})`}
        />

        {/* Small accent highlight */}
        <ellipse
          cx={cx - 6}
          cy={cy - 28}
          rx="4"
          ry="7"
          fill="white"
          opacity="0.35"
          transform={`rotate(-15 ${cx - 6} ${cy - 28})`}
        />

        {/* Balloon knot */}
        <path
          d={`M ${cx - 5} ${cy + 45} L ${cx} ${cy + 55} L ${cx + 5} ${cy + 45}`}
          fill={highlight}
        />

        {/* Curly string */}
        <motion.path
          d={`M ${cx} ${cy + 54}
              C ${cx - 12} ${cy + 75},
                ${cx + 14} ${cy + 95},
                ${cx - 8} ${cy + 115}
              C ${cx + 10} ${cy + 135},
                ${cx - 6} ${cy + 150},
                ${cx + 2} ${cy + 54 + stringLength}`}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
          animate={{ pathLength: [0, 1] }}
          transition={{ duration: 1.5, delay: delay + 0.5 }}
        />
      </motion.g>
    </motion.g>
  )
}

/* ─── Decorative Swoosh ─── */
function Swoosh({ d, color, delay = 0, width = 8 }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.7 }}
      transition={{ duration: 1.5, delay, ease: 'easeOut' }}
    />
  )
}

/* ─── Main Component ─── */
export default function BirthdayLogo({
  name = 'My Madam G',
  width = 420,
  primaryColor = '#F45C91',
  secondaryColor = '#7B3FA0',
  animate = true,
}) {
  const accentColor = '#F7C95B'
  const palePink = '#FFF7FA'
  const ribbonColor = '#A47BE0'
  const nameLen = (name || '').length
  // Dynamic sizing so names of any length (like 'My Madam G') scale gracefully without crowding
  const nameFontSize = nameLen <= 5 ? 120 : nameLen <= 8 ? 92 : nameLen <= 11 ? 80 : Math.max(48, Math.floor(840 / nameLen))
  const nameLetterSpacing = nameLen <= 5 ? '8px' : nameLen <= 8 ? '4px' : '3px'
  const nameStrokeWidth = Math.max(4, Math.min(8, Math.round(nameFontSize * 0.075)))

  // Calculate ray positions dynamically so they expand outward and never collide with the name
  const raySpread = nameLen <= 5 ? 0 : Math.min(80, (nameLen - 5) * 12)
  const leftRayX = 210 - raySpread
  const rightRayX = 690 + raySpread

  const sparkles = [
    { x: 85, y: 120, size: 3, delay: 0 },
    { x: 820, y: 140, size: 4, delay: 0.8 },
    { x: 150, y: 380, size: 3.5, delay: 1.2 },
    { x: 760, y: 340, size: 3, delay: 0.4 },
    { x: 120, y: 570, size: 4, delay: 1.6 },
    { x: 800, y: 590, size: 3.5, delay: 0.9 },
    { x: 210, y: 190, size: 2.5, delay: 2.0 },
    { x: 700, y: 200, size: 3, delay: 1.4 },
    { x: 100, y: 750, size: 3, delay: 0.6 },
    { x: 810, y: 720, size: 4, delay: 1.8 },
    { x: 450, y: 100, size: 3.5, delay: 2.2 },
    { x: 450, y: 780, size: 3, delay: 1.0 },
    { x: 300, y: 130, size: 2.5, delay: 2.5 },
    { x: 610, y: 150, size: 3, delay: 0.3 },
  ]

  const confettiPieces = [
    { x: 110, y: 80, color: '#FFD166', rotation: -25, delay: 0, shape: 'rect' },
    { x: 220, y: 55, color: '#F59BC1', rotation: 15, delay: 0.3, shape: 'circle' },
    { x: 340, y: 70, color: '#A88BE8', rotation: -40, delay: 0.6, shape: 'star' },
    { x: 560, y: 60, color: '#FFD166', rotation: 30, delay: 0.9, shape: 'rect' },
    { x: 680, y: 75, color: '#F59BC1', rotation: -20, delay: 0.2, shape: 'star' },
    { x: 790, y: 90, color: '#A88BE8', rotation: 45, delay: 0.5, shape: 'circle' },
    { x: 150, y: 730, color: '#FFD166', rotation: -15, delay: 1.0, shape: 'rect' },
    { x: 750, y: 740, color: '#F59BC1', rotation: 25, delay: 0.8, shape: 'circle' },
    { x: 90, y: 450, color: '#A88BE8', rotation: -35, delay: 1.3, shape: 'star' },
    { x: 810, y: 430, color: '#FFD166', rotation: 20, delay: 1.1, shape: 'rect' },
  ]

  return (
    <div className="birthday-logo" style={{ width: '100%', maxWidth: `${width}px` }}>
      <MotionConfig reducedMotion="user">
        <svg
        viewBox="40 70 820 720"
        width="100%"
        height="auto"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={`Happy Birthday, ${name}`}
        style={{ display: 'block', overflow: 'visible' }}
      >
        <defs>
          {/* Glow filters */}
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="strongGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="textShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(244, 92, 145, 0.3)" />
          </filter>
        </defs>

        {/* ─── Sparkle Particles ─── */}
        {sparkles.map((s, i) => (
          <Sparkle key={`sparkle-${i}`} {...s} />
        ))}

        {/* ─── Cascading Confetti ─── */}
        {confettiPieces.map((c, i) => (
          <ConfettiPiece key={`confetti-${i}`} {...c} />
        ))}

        {/* ─── Floating Balloons ─── */}
        <FloatingBalloon
          cx={100}
          cy={240}
          color="#F45C91"
          highlight="#D9457A"
          delay={0.2}
          stringLength={140}
        />
        <FloatingBalloon
          cx={800}
          cy={220}
          color="#A88BE8"
          highlight="#8C6FD0"
          delay={0.5}
          stringLength={150}
        />
        <FloatingBalloon
          cx={170}
          cy={160}
          color="#FFD166"
          highlight="#E6B84D"
          delay={0.8}
          stringLength={100}
        />
        <FloatingBalloon
          cx={730}
          cy={180}
          color="#FF85B3"
          highlight="#E06A95"
          delay={1.0}
          stringLength={110}
        />

        {/* ─── Decorative Swooshes ─── */}
        <Swoosh
          d="M 160 195 C 200 170, 270 185, 280 200"
          color="#FFD166"
          delay={1.2}
          width={5}
        />
        <Swoosh
          d="M 740 195 C 700 170, 630 185, 620 200"
          color="#FFD166"
          delay={1.4}
          width={5}
        />

        {/* ─── HAPPY ─── */}
        <motion.g
          initial={animate ? { y: -60, opacity: 0 } : {}}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <motion.g
            animate={animate ? { y: [0, -8, 0] } : {}}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Glow behind text */}
            <text
              x="450"
              y="230"
              textAnchor="middle"
              className="happy-text"
              style={{ fill: primaryColor, opacity: 0.32, filter: 'blur(12px)' }}
            >
              HAPPY
            </text>

            {/* White stroke for contrast */}
            <text
              x="450"
              y="230"
              textAnchor="middle"
              className="happy-text"
              style={{ fill: 'none', stroke: 'white', strokeWidth: 8, opacity: 0.9 }}
            >
              HAPPY
            </text>

            <text
              x="450"
              y="230"
              textAnchor="middle"
              className="happy-text"
              style={{ fill: palePink, filter: 'url(#textShadow)' }}
            >
              HAPPY
            </text>

            {/* Accent lines beside HAPPY */}
            <motion.g
              animate={animate ? { opacity: [0.4, 1, 0.4] } : {}}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <line x1="215" y1="210" x2="175" y2="200" stroke="#A88BE8" strokeWidth="6" strokeLinecap="round" />
              <line x1="205" y1="230" x2="165" y2="230" stroke={accentColor} strokeWidth="4" strokeLinecap="round" />
              <line x1="685" y1="210" x2="725" y2="200" stroke="#A88BE8" strokeWidth="6" strokeLinecap="round" />
              <line x1="695" y1="230" x2="735" y2="230" stroke={accentColor} strokeWidth="4" strokeLinecap="round" />
            </motion.g>
          </motion.g>
        </motion.g>

        {/* ─── Birthday ─── */}
        <motion.g
          initial={animate ? { scale: 0.5, opacity: 0 } : {}}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ transformOrigin: '450px 420px' }}
        >
          {/* Glow behind Birthday */}
          <text
            x="450"
            y="440"
            textAnchor="middle"
            className="birthday-text"
            style={{ fill: secondaryColor, opacity: 0.28, filter: 'blur(18px)' }}
          >
            Birthday
          </text>

          {/* White stroke for contrast */}
          <text
            x="450"
            y="440"
            textAnchor="middle"
            className="birthday-text"
            style={{ fill: 'none', stroke: 'white', strokeWidth: 6, opacity: 0.8 }}
          >
            Birthday
          </text>

          <text
            x="450"
            y="440"
            textAnchor="middle"
            className="birthday-text"
            style={{ fill: secondaryColor }}
          >
            Birthday
          </text>

          {/* Underline flourish - now animated */}
          <motion.path
            d="M 190 480 C 280 440, 350 500, 455 500 C 550 500, 600 460, 710 450"
            fill="none"
            stroke={secondaryColor}
            strokeWidth="7"
            strokeLinecap="round"
            initial={animate ? { pathLength: 0 } : {}}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1.2, ease: 'easeOut' }}
          />

          {/* Secondary flourish */}
          <motion.path
            d="M 240 495 C 320 470, 380 510, 450 508 C 520 506, 560 480, 660 468"
            fill="none"
            stroke="#F45C91"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.35"
            initial={animate ? { pathLength: 0 } : {}}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1.5, ease: 'easeOut' }}
          />
        </motion.g>

        {/* ─── Name ─── */}
        <motion.g
          initial={animate ? { y: 50, opacity: 0 } : {}}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.0, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <motion.g
            animate={
              animate
                ? {
                    scale: [1, 1.03, 1],
                  }
                : {}
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ transformOrigin: '450px 605px' }}
          >
            {/* Glow behind name */}
            <text
              x="450"
              y="610"
              textAnchor="middle"
              className="name-text"
              style={{
                fontSize: `${nameFontSize}px`,
                letterSpacing: nameLetterSpacing,
              fill: primaryColor,
                opacity: 0.35,
                filter: 'blur(14px)',
              }}
            >
              {name}
            </text>

            {/* White stroke for contrast */}
            <text
              x="450"
              y="610"
              textAnchor="middle"
              className="name-text"
              style={{
                fontSize: `${nameFontSize}px`,
                letterSpacing: nameLetterSpacing,
                fill: 'none',
                stroke: 'white',
                strokeWidth: nameStrokeWidth,
                opacity: 0.9,
              }}
            >
              {name}
            </text>

            <text
              x="450"
              y="610"
              textAnchor="middle"
              className="name-text"
              style={{
                fontSize: `${nameFontSize}px`,
                letterSpacing: nameLetterSpacing,
                fill: palePink,
              }}
            >
              {name}
            </text>
          </motion.g>

          {/* Decorative rays around name */}
          <motion.g
            animate={animate ? { opacity: [0.3, 0.8, 0.3] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <line x1={leftRayX} y1="575" x2={leftRayX - 35} y2="562" stroke="#A88BE8" strokeWidth="5" strokeLinecap="round" />
            <line x1={leftRayX - 10} y1="600" x2={leftRayX - 50} y2="600" stroke={accentColor} strokeWidth="4" strokeLinecap="round" />
            <line x1={leftRayX} y1="625" x2={leftRayX - 35} y2="638" stroke="#F59BC1" strokeWidth="5" strokeLinecap="round" />
            <line x1={rightRayX} y1="575" x2={rightRayX + 35} y2="562" stroke="#A88BE8" strokeWidth="5" strokeLinecap="round" />
            <line x1={rightRayX + 10} y1="600" x2={rightRayX + 50} y2="600" stroke={accentColor} strokeWidth="4" strokeLinecap="round" />
            <line x1={rightRayX} y1="625" x2={rightRayX + 35} y2="638" stroke="#F59BC1" strokeWidth="5" strokeLinecap="round" />
          </motion.g>
        </motion.g>

        {/* ─── Ribbon Banner ─── */}
        <motion.g
          initial={animate ? { scaleX: 0, opacity: 0 } : {}}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ transformOrigin: '450px 720px' }}
        >
          {/* Ribbon main */}
          <path
            d="M 230 695 Q 450 660 670 695 L 645 755 Q 450 725 255 755 Z"
            fill={ribbonColor}
          />

          {/* Ribbon left end */}
          <path d="M 230 695 L 180 678 L 195 740 L 255 755" fill="#A882DC" />
          {/* Ribbon right end */}
          <path d="M 670 695 L 720 678 L 705 740 L 645 755" fill="#A882DC" />

          {/* Ribbon fold shadows */}
          <path d="M 230 695 L 255 755 L 255 735 Z" fill="rgba(0,0,0,0.08)" />
          <path d="M 670 695 L 645 755 L 645 735 Z" fill="rgba(0,0,0,0.08)" />

          <text
            x="450"
            y="716"
            textAnchor="middle"
            style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: '21px',
              fontWeight: 900,
              letterSpacing: '4px',
              fill: '#FFFFFF',
            }}
          >
            ✦  CELEBRATING YOU  ✦
          </text>


        </motion.g>

        {/* ─── Bottom decorative hearts ─── */}
        <motion.g
          initial={animate ? { opacity: 0, y: 20 } : {}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <motion.text
            x="330"
            y="790"
            style={{ fontSize: '28px', fill: '#F59BC1' }}
            animate={animate ? { y: [0, -6, 0], opacity: [0.5, 1, 0.5] } : {}}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            ♡
          </motion.text>
          <motion.text
            x="450"
            y="795"
            textAnchor="middle"
            style={{ fontSize: '18px', fill: '#A88BE8' }}
            animate={animate ? { opacity: [0.4, 0.8, 0.4] } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            ✦  ✦  ✦
          </motion.text>
          <motion.text
            x="570"
            y="790"
            style={{ fontSize: '28px', fill: '#F59BC1' }}
            animate={animate ? { y: [0, -6, 0], opacity: [0.5, 1, 0.5] } : {}}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          >
            ♡
          </motion.text>
        </motion.g>
        </svg>
      </MotionConfig>
    </div>
  )
}
