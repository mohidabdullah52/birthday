// The well-formed original clouds from the artwork
const CLOUDS = [
  // Wave 1: Leading fluffy clouds
  { id: 'w1-1', src: '/img/clean_cloud_2.png', left: '-4%', width: 540, delay: 0.0, drift: 20, z: 12 },
  { id: 'w1-2', src: '/img/clean_cloud_0.png', left: '36%', width: 580, delay: 0.06, drift: -18, z: 11 },
  { id: 'w1-3', src: '/img/clean_cloud_3.png', left: '70%', width: 520, delay: 0.1, drift: 22, z: 13 },

  // Wave 2: Main center blanket (well-formed clouds covering the view)
  { id: 'w2-1', src: '/img/clean_cloud_2.png', left: '12%', width: 660, delay: 0.2, drift: -22, z: 22 },
  { id: 'w2-2', src: '/img/clean_cloud_0.png', left: '48%', width: 620, delay: 0.24, drift: 18, z: 23 },
  { id: 'w2-3', src: '/img/clean_cloud_1.png', left: '-8%', width: 480, delay: 0.26, drift: 14, z: 18 },
  { id: 'w2-4', src: '/img/clean_cloud_3.png', left: '72%', width: 560, delay: 0.22, drift: -20, z: 20 },

  // Wave 3: Trailing clouds floating gracefully away
  { id: 'w3-1', src: '/img/clean_cloud_0.png', left: '4%', width: 500, delay: 0.36, drift: 16, z: 15 },
  { id: 'w3-2', src: '/img/clean_cloud_2.png', left: '40%', width: 600, delay: 0.4, drift: -14, z: 17 },
  { id: 'w3-3', src: '/img/clean_cloud_1.png', left: '68%', width: 480, delay: 0.44, drift: 20, z: 14 },
]

export default function CloudTransition({ active }) {
  if (!active) return null

  return (
    <div className="cloud-transition-overlay" aria-hidden="true">
      {/* Soft central cloud haze for 100% seamless transition coverage */}
      <div className="cloud-smooth-veil" />

      {/* Well-formed original artwork clouds rising smoothly */}
      {CLOUDS.map((c) => (
        <div
          key={c.id}
          className="smooth-cloud-item"
          style={{
            left: c.left,
            width: `${c.width}px`,
            zIndex: c.z,
            animationDelay: `${c.delay}s`,
            '--drift': `${c.drift}px`,
          }}
        >
          <img
            src={c.src}
            alt=""
            className="smooth-cloud-img"
          />
        </div>
      ))}
    </div>
  )
}
