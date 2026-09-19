import { useState, useEffect } from 'react'

const defaultCards = [
  {
    id: 1,
    suit: '♥',
    rank: 'A',
    title: 'A WISH',
    lines: [
      'May your smile stay as warm as sunshine',
      'Quiet wishes whispered in the dark come true',
      'The purest kind of happiness in all you do',
    ],
  },
  {
    id: 2,
    suit: '✨',
    rank: 'K',
    title: 'KINDNESS',
    lines: [
      'Radiant energy that lights up any room',
      'A heart that loves so deeply and so true',
      'Never stop being so wonderfully you',
    ],
  },
  {
    id: 3,
    suit: '🌸',
    rank: 'Q',
    title: 'STRENGTH',
    lines: [
      'Walking through every storm with quiet grace',
      'Blooming brighter through every passing year',
      'So endlessly proud of the soul you are',
    ],
  },
  {
    id: 4,
    suit: '🌟',
    rank: 'J',
    title: 'FUTURE',
    lines: [
      'Unstoppable laughter on new journeys ahead',
      'Cherished memories still waiting to unfold',
      'The best chapters are only beginning now',
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
      {/* Header Banner */}
      <div className="cards-slide-header">
        <h3 className="cards-deck-title">Pick a Card 💕</h3>
        <p className="cards-deck-subtitle">Click each card to flip and reveal</p>
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
                  {/* CARD BACK: Intricate Celestial Pink Pattern */}
                  <div className="card-face card-back-face">
                    <div className="card-back-outer-border">
                      <div className="card-back-inner-frame">
                        {/* Corner Accents */}
                        <span className="card-back-corner tl">✦</span>
                        <span className="card-back-corner tr">✦</span>
                        <span className="card-back-corner bl">✦</span>
                        <span className="card-back-corner br">✦</span>

                        {/* Intricate Geometric & Cloud Artwork */}
                        <div className="card-back-art">
                          <div className="art-sunburst" />
                          <div className="art-rhombus">
                            <div className="art-inner-rhombus">
                              <span className="art-center-emblem">💖</span>
                            </div>
                          </div>
                          <div className="art-lines-top" />
                          <div className="art-lines-bottom" />
                        </div>

                        {/* Subtle Tap to Flip prompt */}
                        <div className="card-back-hint">
                          <span className="hint-arrow">↺</span>
                          <span className="hint-text">FLIP</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CARD FACE: Authentic Playing Card Layout matching Reference */}
                  <div className="card-face card-front-face">
                    {/* Top Header */}
                    <div className="card-face-header">
                      <span className="card-category-title">{card.title}</span>
                      <div className="card-corner-rank">
                        <span className="rank-char">{card.rank}</span>
                        <span className="suit-char">{card.suit}</span>
                      </div>
                    </div>

                    {/* Dotted lines content matching reference design */}
                    <div className="card-face-body">
                      {card.lines.map((line, idx) => (
                        <div key={idx} className="card-content-row">
                          <p className="card-row-text">{line}</p>
                          {idx < card.lines.length - 1 && <div className="card-dotted-divider" />}
                        </div>
                      ))}
                    </div>

                    {/* Inverted Bottom Footer (Playing Card Style) */}
                    <div className="card-face-footer">
                      <div className="card-corner-rank inverted">
                        <span className="rank-char">{card.rank}</span>
                        <span className="suit-char">{card.suit}</span>
                      </div>
                      <span className="card-category-title inverted">{card.title}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
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
