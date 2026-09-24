import { useState, useRef } from 'react'

const defaultNoteLines = [
  'Before we step into our little gallery of memories,',
  'there is one special secret key only you and I hold.',
  'Three simple words that mean the whole universe to me,',
  'and the sweetest truth that lives in my heart every single day.',
  'Type the secret password below to unlock what is inside... 💖',
]

export default function SecretNoteSlide({
  lines = defaultNoteLines,
  targetPassword = 'I LOVE YOU',
  onUnlock,
}) {
  const [passwordInput, setPasswordInput] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [isShaking, setIsShaking] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const inputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isUnlocked) return

    const cleaned = passwordInput.trim().toUpperCase()
    if (cleaned === targetPassword.trim().toUpperCase()) {
      setIsUnlocked(true)
      setErrorMsg('')
      if (onUnlock) {
        setTimeout(() => {
          onUnlock()
        }, 650)
      }
    } else {
      setIsShaking(true)
      setErrorMsg('Oops, not quite! Hint: 3 little words 💕')
      setTimeout(() => {
        setIsShaking(false)
      }, 700)
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }

  return (
    <div className="secret-note-slide-container animate__animated animate__fadeIn">
      {/* Decorative Floating Hearts/Sparkles around card */}
      <div className="secret-decor-layer" aria-hidden="true">
        <span className="decor-item d1">✨</span>
        <span className="decor-item d2">💌</span>
        <span className="decor-item d3">🌸</span>
        <span className="decor-item d4">💖</span>
      </div>

      <div className={`secret-note-wrapper ${isShaking ? 'animate__animated animate__headShake' : ''}`}>
        {/* Decorative Top Ribbon Bow */}
        <div className="secret-note-bow" aria-hidden="true">
          <span className="bow-icon">🎀</span>
        </div>

        {/* Main Note Card */}
        <div className={`secret-note-card ${isUnlocked ? 'secret-card-unlocked' : ''}`}>
          {/* Header Badge */}
          <div className="secret-note-header">
            <span className="secret-badge-icon">{isUnlocked ? '🔓' : '🔐'}</span>
            <span className="secret-badge-title">
              {isUnlocked ? 'Access Granted 💕' : 'A Little Secret For You'}
            </span>
          </div>

          {/* 5 Lines Note */}
          <div className="secret-note-body">
            {lines.map((line, idx) => (
              <p key={idx} className="secret-note-line">
                {line}
              </p>
            ))}
          </div>

          {/* Decorative Divider */}
          <div className="secret-divider" aria-hidden="true">
            <span className="divider-line" />
            <span className="divider-symbol">✦ 💖 ✦</span>
            <span className="divider-line" />
          </div>

          {/* Password Form */}
          <form className="secret-password-form" onSubmit={handleSubmit}>
            <div className="secret-input-wrapper">
              <span className="secret-input-icon" aria-hidden="true">
                🗝️
              </span>
              <input
                ref={inputRef}
                type="text"
                className={`secret-password-input ${isUnlocked ? 'input-unlocked' : ''}`}
                placeholder="Enter password here..."
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value)
                  if (errorMsg) setErrorMsg('')
                }}
                disabled={isUnlocked}
                autoFocus
                autoComplete="off"
                spellCheck="false"
              />
              <button
                type="submit"
                className={`secret-submit-btn ${isUnlocked ? 'btn-unlocked' : ''}`}
                disabled={isUnlocked || !passwordInput.trim()}
              >
                {isUnlocked ? (
                  <span>Unlocked! ✨</span>
                ) : (
                  <span>
                    Unlock <i className="fas fa-heart" style={{ marginLeft: '4px' }} />
                  </span>
                )}
              </button>
            </div>

            {/* Error or Success feedback message */}
            {errorMsg && (
              <p className="secret-error-msg animate__animated animate__fadeIn">
                {errorMsg}
              </p>
            )}

            {isUnlocked && (
              <p className="secret-success-msg animate__animated animate__fadeIn">
                Yay! Opening your memories now... 💖
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
