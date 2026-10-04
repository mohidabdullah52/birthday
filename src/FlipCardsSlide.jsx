import { useState, useEffect } from 'react'

const defaultCards = [
  {
    id: 1,
    suit: '♥',
    rank: 'A',
    title: 'THE LIBRARY',
    lines: [
      'The time when we were sitting in the library and you kicked me, it was so cute and it still brings a smile to my face',
    ],
  },
  {
    id: 2,
    suit: '✨',
    rank: 'K',
    title: 'WATER COOLER',
    lines: [
      'And the time you brought me food for the first time, near the water cooler, and we both were awkwardly smiling and i forgot to answer the salam.',
    ],
  },
  {
    id: 3,
    suit: '🌸',
    rank: 'Q',
    title: 'THE BENCH',
    lines: [
      'And when we sat together for the first time on the bench near the entrance and i just spouted cringe non stop, even tho embarrassing but stilll a moment i always smile when i think about it',
    ],
  },
  {
    id: 4,
    suit: '🌟',
    rank: 'J',
    title: 'SPORTS DAY',
    lines: [
      'The time when on sports day i got you the crocheted flower and you just didnt take it and started walking away from me, that was so cute, also i loved seeing them in snaps of them you sent a few times',
    ],
  },
]

export default function FlipCardsSlide({
  cards = defaultCards,
  onRevealed,
  onPullString,
  tapVisible,
}) {
  const [isDealt, setIsDealt] = useState(false)
  const [flippedIds, setFlippedIds] = useState({})
  const [hasInteracted, setHasInteracted] = useState(false)

  // Trigger dealing animation after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDealt(true)
    }, 400)
    return () => clearTimeout(timer)
  }, [])

  const handleCardClick = (id) => {
    setFlippedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))

    if (!hasInteracted) {
      setHasInteracted(true)
      setTimeout(() => {
        if (onRevealed) onRevealed()
      }, 1000)
    }
  }

  return (
    <div className="playing-cards-slide-container animate__animated animate__fadeIn">
      {/* Header text section above */}
      <div className="cards-slide-header">
        <div className="cards-intro-box">
          <p className="cards-intro-text">
            And many many more that even if i wanted to i couldnt list all of them
          </p>
        </div>
      </div>

      {/* Cards Deck / Spread Arena */}
      <div className="cards-table-arena">
        <div className={`cards-deck-spread ${isDealt ? 'is-dealt' : 'is-stacked'}`}>
          {cards.map((card, index) => {
            const isFlipped = !!flippedIds[card.id]
            return (
              <div
                key={card.id}
                className={`authentic-playing-card card-index-${index} ${
                  isFlipped ? 'card-is-flipped' : ''
                }`}
                onClick={() => handleCardClick(card.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleCardClick(card.id)
                }}
                title={isFlipped ? 'Click to flip back' : 'Click to flip card'}
              >
                <div className="card-flipper-3d">
                  {/* CARD BACK: Simple & Elegant */}
                  <div className="card-face card-back-face">
                    <div className="card-back-frame">
                      <div className="card-back-center-icon">
                        <span className="card-back-heart">♥</span>
                      </div>
                      <span className="card-back-tap-hint">tap to flip</span>
                    </div>
                  </div>

                  {/* CARD FRONT: Clean & Heartfelt */}
                  <div className="card-face card-front-face">
                    {/* Top Header */}
                    <div className="card-face-header">
                      <span className="card-category-title">{card.title}</span>
                      <div className="card-corner-rank">
                        <span className="rank-char">{card.rank}</span>
                        <span className="suit-char">{card.suit}</span>
                      </div>
                    </div>

                    {/* Dotted lines content */}
                    <div className="card-face-body">
                      {card.lines.map((line, idx) => (
                        <div key={idx} className="card-content-row">
                          <p className="card-row-text">{line}</p>
                          {idx < card.lines.length - 1 && <div className="card-dotted-divider" />}
                        </div>
                      ))}
                    </div>

                    {/* Clean Minimal Footer */}
                    <div className="card-face-footer-simple">
                      <span className="card-footer-heart">♥</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Message section below cards */}
      <div className="cards-footer-message">
        <div className="cards-footer-box">
          <p className="cards-footer-text">
            Thank you for choosing me
          </p>
        </div>
      </div>

      {/* Continue Prompt */}
      {tapVisible && (
        <div className="cards-continue-wrapper animate__animated animate__fadeIn">
          <p id="tap" className="animate__animated animate__pulse animate__infinite" onClick={onPullString}>
            Pull the string to continue
          </p>
        </div>
      )}
    </div>
  )
}
