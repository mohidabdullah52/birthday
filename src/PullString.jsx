import { useState, useRef, useEffect, useCallback } from 'react'

export default function PullString({ onPull, isPrompting, disabled }) {
  const [pullY, setPullY] = useState(0)
  const [isPulling, setIsPulling] = useState(false)
  const [isSnapping, setIsSnapping] = useState(false)
  const startYRef = useRef(0)
  const currentYRef = useRef(0)

  // Spring release animation
  const snapBackAndTrigger = useCallback(
    (shouldTrigger = true) => {
      setIsSnapping(true)
      setIsPulling(false)
      setPullY(0)

      if (shouldTrigger && onPull && !disabled) {
        onPull()
      }

      setTimeout(() => {
        setIsSnapping(false)
      }, 500)
    },
    [onPull, disabled]
  )

  // Mouse / touch drag handlers
  const handleStart = (clientY) => {
    if (disabled || isSnapping) return
    setIsPulling(true)
    startYRef.current = clientY
    currentYRef.current = 0
  }

  const handleMove = useCallback(
    (clientY) => {
      if (!isPulling) return
      const delta = Math.max(0, Math.min(100, clientY - startYRef.current))
      currentYRef.current = delta
      setPullY(delta)
    },
    [isPulling]
  )

  const handleEnd = useCallback(() => {
    if (!isPulling) return
    if (currentYRef.current > 35) {
      snapBackAndTrigger(true)
    } else {
      snapBackAndTrigger(false)
    }
  }, [isPulling, snapBackAndTrigger])

  // Global mouse move and mouse up listeners for smooth dragging
  useEffect(() => {
    const onMouseMove = (e) => handleMove(e.clientY)
    const onMouseUp = () => handleEnd()
    const onTouchMove = (e) => {
      if (e.touches[0]) handleMove(e.touches[0].clientY)
    }
    const onTouchEnd = () => handleEnd()

    if (isPulling) {
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)
      window.addEventListener('touchmove', onTouchMove)
      window.addEventListener('touchend', onTouchEnd)
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [isPulling, handleMove, handleEnd])

  // Simple click handler
  const handleClick = (e) => {
    e.stopPropagation()
    if (disabled || isSnapping || isPulling) return
    setIsSnapping(true)
    setPullY(65)
    setTimeout(() => {
      snapBackAndTrigger(true)
    }, 150)
  }

  const stringHeight = 180 + pullY

  return (
    <div
      className={`pull-string-wrapper ${isPrompting ? 'prompting' : ''} ${
        isSnapping ? 'snapping' : ''
      }`}
      style={{
        transform: `translateY(${pullY * 0.1}px)`,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Top Ceiling Mount */}
      <div className="pull-string-mount" aria-hidden="true">
        <div className="mount-bracket" />
        <div className="mount-ring" />
      </div>

      {/* Hanging Cord with Beads */}
      <div
        className="pull-string-cord"
        style={{
          height: `${stringHeight}px`,
        }}
        aria-hidden="true"
      >
        <div className="cord-line" />
        <div className="cord-bead bead-1" />
        <div className="cord-bead bead-2" />
        <div className="cord-bead bead-3" />
        <div className="cord-bead bead-4" />
      </div>

      {/* Pull Handle (Heart Charm & Bow) */}
      <button
        type="button"
        className="pull-string-handle"
        style={{
          top: `${stringHeight}px`,
        }}
        onClick={handleClick}
        onMouseDown={(e) => {
          e.stopPropagation()
          handleStart(e.clientY)
        }}
        onTouchStart={(e) => {
          e.stopPropagation()
          if (e.touches[0]) handleStart(e.touches[0].clientY)
        }}
        aria-label="Pull string to continue"
        title="Pull down to continue"
      >
        {/* Decorative Blue Bow (Matches My Melody) */}
        <div className="handle-bow" aria-hidden="true">
          <svg viewBox="0 0 40 24" width="36" height="22" fill="#70d6ff">
            <path
              d="M 6 12 C 0 5 12 1 18 10 C 18 10 12 19 6 12 Z"
              fill="#8ecae6"
              stroke="#5ba4c7"
              strokeWidth="1.2"
            />
            <path
              d="M 34 12 C 40 5 28 1 22 10 C 22 10 28 19 34 12 Z"
              fill="#8ecae6"
              stroke="#5ba4c7"
              strokeWidth="1.2"
            />
            <circle cx="20" cy="11" r="4.5" fill="#5ba4c7" />
          </svg>
        </div>

        {/* Heart Tag Pendant */}
        <div className="handle-heart">
          <svg viewBox="0 0 32 30" width="46" height="42" fill="#ff758f">
            <path
              d="M16 28 C16 28 3 19.5 3 10 C3 4.5 7.5 1.5 12.5 1.5 C15.5 1.5 16 3.5 16 3.5 C16 3.5 16.5 1.5 19.5 1.5 C24.5 1.5 29 4.5 29 10 C29 19.5 16 28 16 28 Z"
              stroke="#ffffff"
              strokeWidth="2"
            />
          </svg>
          <span className="handle-text">PULL</span>
          <span className="handle-arrow">↓</span>
        </div>
      </button>
    </div>
  )
}
