import { useRef, useEffect } from 'react'

export default function DoodleLetterCard({
  id = 'doodleCard',
  className = '',
  salutation = 'Meri Piyari Bushra,',
  text = '',
  tapVisible = false,
  onPullString,
  onClick,
}) {
  const bodyRef = useRef(null)

  // Smoothly scroll down as text is typed
  useEffect(() => {
    if (bodyRef.current && !tapVisible) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [text, tapVisible])

  return (
    <div id={id} className={`doodle-letter-card slides ${className}`} onClick={onClick}>
      {/* Top Header Row with Salutation, Bow Doodle, and Flower Doodles */}
      <div className="doodle-card-header">
        <div className="doodle-salutation-group">
          <span className="doodle-recipient-name">{salutation}</span>
          
          {/* Hand-Drawn Pink Bow Doodle */}
          <svg
            className="doodle-bow-icon"
            viewBox="0 0 54 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Left Bow Loop */}
            <path
              d="M 24 19 C 14 10 4 12 5 22 C 6 29 16 28 24 23 Z"
              fill="#ff8da7"
              stroke="#231f20"
              strokeWidth="2.8"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {/* Right Bow Loop */}
            <path
              d="M 30 19 C 40 10 50 12 49 22 C 48 29 38 28 30 23 Z"
              fill="#ff8da7"
              stroke="#231f20"
              strokeWidth="2.8"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {/* Left Ribbon Tail */}
            <path
              d="M 23 24 C 18 31 14 36 12 40 L 17 38 L 22 41 C 24 35 25 28 25 24 Z"
              fill="#ff8da7"
              stroke="#231f20"
              strokeWidth="2.6"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {/* Right Ribbon Tail */}
            <path
              d="M 31 24 C 36 31 40 36 42 40 L 37 38 L 32 41 C 30 35 29 28 29 24 Z"
              fill="#ff8da7"
              stroke="#231f20"
              strokeWidth="2.6"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {/* Center Knot */}
            <ellipse
              cx="27"
              cy="21"
              rx="5.5"
              ry="4.5"
              fill="#ff7594"
              stroke="#231f20"
              strokeWidth="2.8"
            />
          </svg>
        </div>

        {/* Top-Right Hand-Drawn Flower Doodles */}
        <div className="doodle-flowers-group" aria-hidden="true">
          {/* Flower 1 (Upper Left of the pair) */}
          <svg
            className="doodle-flower-icon flower-upper"
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="19" cy="8" r="5.5" fill="#dba0db" stroke="#231f20" strokeWidth="2.4" />
            <circle cx="28.5" cy="14.5" r="5.5" fill="#dba0db" stroke="#231f20" strokeWidth="2.4" />
            <circle cx="25" cy="26" r="5.5" fill="#dba0db" stroke="#231f20" strokeWidth="2.4" />
            <circle cx="13" cy="26" r="5.5" fill="#dba0db" stroke="#231f20" strokeWidth="2.4" />
            <circle cx="9.5" cy="14.5" r="5.5" fill="#dba0db" stroke="#231f20" strokeWidth="2.4" />
            <circle cx="19" cy="18.5" r="4.8" fill="#ffd152" stroke="#231f20" strokeWidth="2.4" />
          </svg>

          {/* Flower 2 (Lower Right of the pair) */}
          <svg
            className="doodle-flower-icon flower-lower"
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="19" cy="8" r="5.5" fill="#dba0db" stroke="#231f20" strokeWidth="2.4" />
            <circle cx="28.5" cy="14.5" r="5.5" fill="#dba0db" stroke="#231f20" strokeWidth="2.4" />
            <circle cx="25" cy="26" r="5.5" fill="#dba0db" stroke="#231f20" strokeWidth="2.4" />
            <circle cx="13" cy="26" r="5.5" fill="#dba0db" stroke="#231f20" strokeWidth="2.4" />
            <circle cx="9.5" cy="14.5" r="5.5" fill="#dba0db" stroke="#231f20" strokeWidth="2.4" />
            <circle cx="19" cy="18.5" r="4.8" fill="#ffd152" stroke="#231f20" strokeWidth="2.4" />
          </svg>
        </div>
      </div>

      {/* Main Letter Body with Typewriter Text */}
      <div ref={bodyRef} className="doodle-card-body">
        <p className="doodle-letter-text">
          {text}
          <span className="cursor-blink">|</span>
        </p>
      </div>

      {/* Continue Prompt if available */}
      {tapVisible && (
        <div className="doodle-card-footer">
          <span
            id="tap"
            className="animate__animated animate__pulse animate__infinite doodle-continue-btn"
            onClick={onPullString}
          >
            Pull the string to continue
          </span>
        </div>
      )}
    </div>
  )
}
