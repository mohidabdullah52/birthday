import { useState, useEffect } from 'react'

const defaultNoteLines = [
  'Every memory with you feels like a little piece of magic.',
  'From the quiet laughs to the sweetest adventures,',
  'you bring so much warmth and light into every single day.',
  'Thank you for being the wonderful soul you are.',
  'Wishing you a year as bright and beautiful as your smile! ✨',
]

export default function MemoriesSlide({
  photoSrc = '/img/memory_photo_1.png',
  lines = defaultNoteLines,
  caption = 'Cherished Moments 💕',
  tiltAngle = -7,
  photoPosition = 'center',
  onRevealed,
  onPullString,
  tapVisible,
}) {
  const [isRevealed, setIsRevealed] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Listen for Escape key to close modal
  useEffect(() => {
    if (!isModalOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen])

  const handleCardClick = () => {
    if (!isRevealed) {
      setIsRevealed(true)
      setShowSparkles(true)

      // Notify parent to enable pull string prompt after card finishes unfolding
      setTimeout(() => {
        if (onRevealed) onRevealed()
      }, 1200)

      setTimeout(() => {
        setShowSparkles(false)
      }, 2000)
    } else {
      setIsModalOpen(true)
    }
  }

  const handlePhotoClick = (e) => {
    if (!isRevealed) {
      handleCardClick()
    } else {
      e.stopPropagation()
      setIsModalOpen(true)
    }
  }

  return (
    <div className="memories-slide-container animate__animated animate__fadeIn">
      {/* Sparkle bursts when revealed */}
      {showSparkles && (
        <div className="memory-sparkles-layer" aria-hidden="true">
          <span className="sparkle s1">✨</span>
          <span className="sparkle s2">💖</span>
          <span className="sparkle s3">🌸</span>
          <span className="sparkle s4">✨</span>
          <span className="sparkle s5">💕</span>
          <span className="sparkle s6">⭐</span>
        </div>
      )}

      {/* Main interactive stage */}
      <div className={`memory-stage ${isRevealed ? 'is-revealed' : 'is-tilted'}`}>
        {/* Polaroid Photo Frame */}
        <div
          className={`polaroid-frame ${isRevealed ? 'straight-lifted' : 'tilted-floating'}`}
          style={{ '--tilt-angle': `${tiltAngle}deg` }}
          onClick={handleCardClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleCardClick()
          }}
          title={isRevealed ? 'Click photo to enlarge' : 'Click to reveal photo!'}
        >
          {/* Decorative washi tape on top */}
          <div className="washi-tape" aria-hidden="true" />

          {/* Photo Inner Container */}
          <div className="polaroid-photo-box" onClick={handlePhotoClick}>
            <img
              src={photoSrc}
              alt="Special Birthday Memory"
              className={`polaroid-img ${isRevealed ? 'revealed-img' : 'hidden-img'}`}
              style={{ objectPosition: photoPosition }}
            />

            {/* Mystery Overlay prior to click */}
            {!isRevealed && (
              <div className="polaroid-mystery-cover">
                <div className="mystery-badge">
                  <span className="mystery-icon">📸</span>
                  <span className="mystery-text">Tap to Reveal</span>
                  <span className="mystery-sparkle">✨</span>
                </div>
              </div>
            )}

            {/* Shimmer light sweep on reveal */}
            {isRevealed && <div className="photo-shine-sweep" />}

            {/* Subtle Zoom Hint Icon on hover when revealed */}
            {isRevealed && (
              <div className="photo-zoom-hint" title="Click to view full size">
                <i className="fas fa-search-plus" />
              </div>
            )}
          </div>

          {/* Polaroid bottom caption */}
          <div className="polaroid-caption">
            <span className="caption-text">{caption}</span>
          </div>
        </div>

        {/* Heartfelt Note (Unveiled after click) */}
        {isRevealed && (
          <div className="memory-note-card animate__animated animate__fadeInUp animate__faster">
            <div className="note-pin" aria-hidden="true">
              <span className="pin-head">🎀</span>
            </div>
            <div className="note-content">
              {lines.map((line, idx) => (
                <p key={idx} className="note-line">
                  {line}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Enlarged 16:9 Photo Modal */}
      {isModalOpen && (
        <div
          className="photo-modal-overlay animate__animated animate__fadeIn animate__faster"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged photo view"
        >
          <div
            className="photo-modal-card animate__animated animate__zoomIn animate__faster"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Small cross button on top right of the newly opened image */}
            <button
              className="photo-modal-close-btn"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
              type="button"
              title="Close"
            >
              ✕
            </button>

            {/* 16:9 Image container */}
            <div className="photo-modal-img-wrap">
              <img
                src={photoSrc}
                alt="Enlarged Birthday Memory"
                className="photo-modal-img"
                style={{ objectPosition: photoPosition }}
              />
            </div>

            {caption && (
              <div className="photo-modal-caption">
                <span>{caption}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Continue Prompt if available */}
      {tapVisible && (
        <div className="memories-continue-wrapper animate__animated animate__fadeIn">
          <p id="tap" className="animate__animated animate__pulse animate__infinite" onClick={onPullString}>
            Pull the string to continue
          </p>
        </div>
      )}
    </div>
  )
}
