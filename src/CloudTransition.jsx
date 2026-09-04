import { memo } from 'react'

// Flotilla of well-formed clouds (clean_cloud_2.png) positioned from top to bottom
// of a unified ascending formation. Zero flat edges, zero gaps, perfectly rounded on all sides.
const CLOUDS = [
  // Tier 1: Leading edge (enters screen immediately)
  { id: 'c1', left: '-6%', width: 580, top: 0, flip: false, z: 12 },
  { id: 'c2', left: '28%', width: 660, top: -25, flip: true, z: 11 },
  { id: 'c3', left: '66%', width: 590, top: 15, flip: false, z: 13 },

  // Tier 2: Dense center core (completely blankets screen)
  { id: 'c4', left: '-12%', width: 720, top: 170, flip: true, z: 21 },
  { id: 'c5', left: '22%', width: 760, top: 150, flip: false, z: 23 },
  { id: 'c6', left: '58%', width: 720, top: 185, flip: true, z: 22 },
  { id: 'c7', left: '6%', width: 690, top: 330, flip: false, z: 24 },
  { id: 'c8', left: '44%', width: 710, top: 350, flip: true, z: 25 },

  // Tier 3: Trailing edge (leaves screen last)
  { id: 'c9', left: '-5%', width: 600, top: 510, flip: false, z: 15 },
  { id: 'c10', left: '32%', width: 670, top: 530, flip: true, z: 16 },
  { id: 'c11', left: '68%', width: 590, top: 500, flip: false, z: 14 },
]

function CloudTransition({ active }) {
  if (!active) return null

  return (
    <div className="cloud-transition-overlay" aria-hidden="true">
      <div className="cloud-wave-flotilla">
        {/* Soft white core sheet traveling locked with the clouds for 100% seamless opacity */}
        <div className="cloud-wave-sheet" />

        {/* Well-formed clouds */}
        {CLOUDS.map((c) => (
          <div
            key={c.id}
            className="smooth-cloud-item"
            style={{
              left: c.left,
              width: `${c.width}px`,
              top: `${c.top}px`,
              zIndex: c.z,
              transform: c.flip ? 'scaleX(-1)' : 'none',
            }}
          >
            <img
              src="/img/clean_cloud_2.png"
              alt=""
              className="smooth-cloud-img"
              decoding="async"
              loading="eager"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(CloudTransition)
