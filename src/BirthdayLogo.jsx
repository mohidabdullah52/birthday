import { motion } from 'framer-motion'
import './BirthdayLogo.css'

const confetti = [
  { x: 8, y: 18, r: -25, color: '#F59BC1' },
  { x: 17, y: 11, r: 20, color: '#A88BE8' },
  { x: 27, y: 21, r: -15, color: '#F9C74F' },
  { x: 38, y: 9, r: 35, color: '#F59BC1' },
  { x: 51, y: 17, r: -30, color: '#A88BE8' },
  { x: 67, y: 10, r: 15, color: '#F9C74F' },
  { x: 80, y: 19, r: -25, color: '#F59BC1' },
  { x: 91, y: 13, r: 25, color: '#A88BE8' },

  { x: 6, y: 42, r: 25, color: '#A88BE8' },
  { x: 14, y: 57, r: -20, color: '#F9C74F' },
  { x: 87, y: 43, r: 30, color: '#F59BC1' },
  { x: 94, y: 58, r: -20, color: '#F9C74F' },

  { x: 9, y: 79, r: 15, color: '#F59BC1' },
  { x: 18, y: 89, r: -25, color: '#A88BE8' },
  { x: 80, y: 82, r: 20, color: '#A88BE8' },
  { x: 91, y: 91, r: -15, color: '#F59BC1' },
]

function Star({ x, y, size = 14, color = '#F9C74F' }) {
  return (
    <path
      d={`
        M ${x} ${y - size}
        L ${x + size * 0.28} ${y - size * 0.28}
        L ${x + size} ${y}
        L ${x + size * 0.28} ${y + size * 0.28}
        L ${x} ${y + size}
        L ${x - size * 0.28} ${y + size * 0.28}
        L ${x - size} ${y}
        L ${x - size * 0.28} ${y - size * 0.28}
        Z
      `}
      fill={color}
    />
  )
}

function Balloon({ cx, cy, color, accent }) {
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx="42" ry="52" fill={color} />

      {/* balloon highlight */}
      <ellipse
        cx={cx - 14}
        cy={cy - 17}
        rx="8"
        ry="15"
        fill="white"
        opacity="0.65"
        transform={`rotate(-25 ${cx - 14} ${cy - 17})`}
      />

      {/* balloon bottom */}
      <path
        d={`M ${cx - 6} ${cy + 48}
            L ${cx} ${cy + 61}
            L ${cx + 6} ${cy + 48}`}
        fill={accent}
      />

      {/* string */}
      <path
        d={`M ${cx} ${cy + 60}
            C ${cx - 18} ${cy + 105},
              ${cx + 18} ${cy + 125},
              ${cx} ${cy + 160}`}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </g>
  )
}

function PartyHat() {
  return (
    <g transform="translate(650 90) rotate(10)">
      {/* hat */}
      <path d="M 0 120 L 80 0 L 125 120 Z" fill="#B79AEF" />

      {/* pink stripes */}
      <path d="M 30 76 L 60 30 L 75 120 L 48 120 Z" fill="#F45C91" />
      <path d="M 75 27 L 88 10 L 110 120 L 85 120 Z" fill="#F45C91" />

      {/* base */}
      <ellipse cx="62" cy="120" rx="63" ry="13" fill="#F45C91" />

      {/* flower */}
      <g transform="translate(80 -5)">
        {[0, 72, 144, 216, 288].map((angle) => (
          <ellipse
            key={angle}
            cx="0"
            cy="-16"
            rx="10"
            ry="19"
            fill="#F45C91"
            transform={`rotate(${angle})`}
          />
        ))}
        <circle cx="0" cy="0" r="8" fill="#FFD166" />
      </g>
    </g>
  )
}

export default function BirthdayLogo({
  name = 'MOHID',
  width = 370,
  primaryColor = '#F45C91',
  secondaryColor = '#5B3B8C',
  backgroundColor = '#FFFDFE',
  animate = true,
}) {
  return (
    <div className="birthday-logo" style={{ width: '100%', maxWidth: `${width}px` }}>
      <svg
        viewBox="0 0 900 1000"
        width="100%"
        height="auto"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        {/* Background Card */}
        <rect
          width="900"
          height="1000"
          rx="45"
          fill={backgroundColor}
          stroke="rgba(255, 215, 230, 0.75)"
          strokeWidth="6"
        />

        {/* Decorative confetti */}
        {confetti.map((item, index) => (
          <motion.rect
            key={index}
            x={`${item.x * 9 - 8}`}
            y={`${item.y * 10}`}
            width="14"
            height="7"
            rx="3"
            fill={item.color}
            transform={`rotate(${item.r} ${item.x * 9 - 1} ${item.y * 10 + 3.5})`}
            animate={
              animate
                ? {
                    y: [0, -8, 0],
                  }
                : {}
            }
            transition={{
              duration: 2.5 + (index % 5) * 0.25,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Balloons */}
        <Balloon cx="105" cy="270" color={primaryColor} accent="#D9457A" />
        <Balloon cx="795" cy="270" color="#A98AE8" accent="#8065C6" />

        {/* Stars */}
        <Star x={160} y={180} size={13} />
        <Star x={735} y={180} size={13} />
        <Star x={110} y={510} size={12} color="#A98AE8" />
        <Star x={795} y={510} size={12} color="#F9C74F" />
        <Star x={150} y={850} size={12} />
        <Star x={760} y={850} size={12} />

        {/* Party hat */}
        <PartyHat />

        {/* HAPPY */}
        <motion.text
          x="450"
          y="250"
          textAnchor="middle"
          className="happy-text"
          style={{ fill: primaryColor }}
          animate={
            animate
              ? {
                  y: [0, -6, 0],
                }
              : {}
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          HAPPY
        </motion.text>

        {/* Small decorative strokes */}
        <path
          d="M245 225 L215 210"
          stroke="#A98AE8"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M655 225 L685 210"
          stroke="#A98AE8"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* Birthday */}
        <text
          x="450"
          y="480"
          textAnchor="middle"
          className="birthday-text"
          style={{ fill: secondaryColor }}
        >
          Birthday
        </text>

        {/* Underline flourish */}
        <path
          d="
            M 215 520
            C 315 475,
              370 540,
              455 545
            C 530 550,
              570 510,
              660 490
          "
          fill="none"
          stroke={secondaryColor}
          strokeWidth="13"
          strokeLinecap="round"
        />

        {/* Name */}
        <motion.text
          x="450"
          y="680"
          textAnchor="middle"
          className="name-text"
          style={{ fill: primaryColor, transformOrigin: '450px 680px' }}
          animate={
            animate
              ? {
                  scale: [1, 1.03, 1],
                }
              : {}
          }
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {name}
        </motion.text>

        {/* Decorative rays */}
        <g stroke="#A98AE8" strokeWidth="10" strokeLinecap="round">
          <path d="M220 625 L190 610" />
          <path d="M215 660 L180 660" />
          <path d="M680 625 L710 610" />
          <path d="M685 660 L720 660" />
        </g>

        {/* Ribbon */}
        <path
          d="
            M 245 790
            Q 450 740 655 790
            L 625 880
            Q 450 835 275 880
            Z
          "
          fill="#C9B3F3"
        />

        {/* Ribbon ends */}
        <path d="M245 790 L190 765 L210 835 L275 880" fill="#B49AE9" />
        <path d="M655 790 L710 765 L690 835 L625 880" fill="#B49AE9" />

        {/* TO YOU */}
        <text
          x="450"
          y="825"
          textAnchor="middle"
          className="to-you-text"
          style={{ fill: secondaryColor }}
        >
          ♥ TO YOU ♥
        </text>

        {/* Bottom confetti */}
        <path
          d="M120 900 Q140 875 160 900"
          fill="none"
          stroke={primaryColor}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M760 900 Q780 875 800 900"
          fill="none"
          stroke="#A98AE8"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
