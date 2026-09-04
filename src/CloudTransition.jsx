const CLOUD_IMAGES = [
  '/img/full_clouds/full_cloud_0.png',
  '/img/full_clouds/full_cloud_1.png',
  '/img/full_clouds/full_cloud_2.png',
  '/img/full_clouds/full_cloud_3.png',
]

// 26 full, round, puffy clouds with staggered positions, sizes, and gentle drifts
const TRANSITION_CLOUDS = [
  // Wave 1: Leading clouds rising first
  { id: 1, src: 1, left: '-2%', width: 440, delay: 0.0, duration: 3.4, drift: 25, z: 12 },
  { id: 2, src: 0, left: '26%', width: 340, delay: 0.08, duration: 3.5, drift: -20, z: 10 },
  { id: 3, src: 2, left: '52%', width: 480, delay: 0.04, duration: 3.3, drift: 15, z: 14 },
  { id: 4, src: 3, left: '80%', width: 360, delay: 0.12, duration: 3.6, drift: -15, z: 11 },
  { id: 5, src: 0, left: '10%', width: 280, delay: 0.18, duration: 3.4, drift: -25, z: 9 },

  // Wave 2: Dense mid-layer full clouds
  { id: 6, src: 2, left: '-6%', width: 520, delay: 0.25, duration: 3.5, drift: 20, z: 15 },
  { id: 7, src: 1, left: '18%', width: 460, delay: 0.32, duration: 3.4, drift: -18, z: 13 },
  { id: 8, src: 3, left: '44%', width: 390, delay: 0.28, duration: 3.6, drift: 22, z: 12 },
  { id: 9, src: 0, left: '68%', width: 480, delay: 0.35, duration: 3.3, drift: -20, z: 16 },
  { id: 10, src: 2, left: '86%', width: 340, delay: 0.22, duration: 3.7, drift: 15, z: 10 },
  { id: 11, src: 1, left: '32%', width: 500, delay: 0.4, duration: 3.4, drift: -10, z: 18 },

  // Wave 3: Grand full cover layer (ensures full screen coverage at midpoint)
  { id: 12, src: 0, left: '-4%', width: 480, delay: 0.48, duration: 3.5, drift: -25, z: 14 },
  { id: 13, src: 2, left: '14%', width: 540, delay: 0.55, duration: 3.3, drift: 20, z: 20 },
  { id: 14, src: 1, left: '40%', width: 520, delay: 0.5, duration: 3.4, drift: -15, z: 19 },
  { id: 15, src: 3, left: '62%', width: 460, delay: 0.58, duration: 3.6, drift: 25, z: 17 },
  { id: 16, src: 0, left: '82%', width: 440, delay: 0.52, duration: 3.5, drift: -18, z: 15 },
  { id: 17, src: 2, left: '28%', width: 380, delay: 0.62, duration: 3.4, drift: 12, z: 16 },

  // Wave 4: Trailing full puffy clouds that gracefully clear the screen
  { id: 18, src: 1, left: '2%', width: 420, delay: 0.7, duration: 3.5, drift: 18, z: 13 },
  { id: 19, src: 3, left: '22%', width: 360, delay: 0.78, duration: 3.6, drift: -22, z: 11 },
  { id: 20, src: 0, left: '48%', width: 490, delay: 0.72, duration: 3.4, drift: 15, z: 15 },
  { id: 21, src: 2, left: '72%', width: 410, delay: 0.82, duration: 3.5, drift: -16, z: 12 },
  { id: 22, src: 1, left: '88%', width: 350, delay: 0.75, duration: 3.7, drift: 20, z: 10 },
  { id: 23, src: 0, left: '35%', width: 440, delay: 0.88, duration: 3.4, drift: -12, z: 14 },
  { id: 24, src: 3, left: '10%', width: 320, delay: 0.95, duration: 3.5, drift: 15, z: 9 },
  { id: 25, src: 2, left: '60%', width: 380, delay: 0.92, duration: 3.6, drift: -18, z: 11 },
]

export default function CloudTransition({ active }) {
  if (!active) return null

  return (
    <div className="cloud-transition-overlay" aria-hidden="true">
      {TRANSITION_CLOUDS.map((c) => (
        <div
          key={c.id}
          className="flotilla-cloud"
          style={{
            left: c.left,
            width: `${c.width}px`,
            zIndex: c.z,
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
            '--drift-x': `${c.drift}px`,
          }}
        >
          <img
            src={CLOUD_IMAGES[c.src]}
            alt=""
            className="flotilla-cloud-img"
          />
        </div>
      ))}
    </div>
  )
}
