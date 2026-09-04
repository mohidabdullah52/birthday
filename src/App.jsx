import { useEffect, useRef, useState, useCallback } from 'react'
import './App.css'
import bgElements from './bg_elements.json'
import PullString from './PullString'
import CloudTransition from './CloudTransition'

const teks1Lines = [
  'Today, I send all my warmest prayers and wishes to the heavens for you.',
  'May the challenges that tried to break you become the reasons you continue to grow.',
  'May the world always watch over and protect you, wherever you may be.',
  'May your days always be surrounded by love that knows no bounds.',
  'May every step you take be blessed until you achieve all that your heart desires.',
]

const teks2Lines = [
  'With or without me, may the universe always bring you happiness in every way.',
  '',
  'Happy birthday, and thank you for being so strong and making it this far.',
  '',
  '- Wishing you all the best',
]

export default function App() {
  const [slide, setSlide] = useState(0) // 0: timer/transition, 1: slideSatu, 2: slideDua, 3: slideTiga, 4: slideEmpat, 5: slideLima
  const [tapVisible, setTapVisible] = useState(false)
  const [slideOutAnim, setSlideOutAnim] = useState('')
  const [teks1Typed, setTeks1Typed] = useState('')
  const [teks2Typed, setTeks2Typed] = useState('')
  const [trimsTyped, setTrimsTyped] = useState('')
  const [noPos, setNoPos] = useState({ top: 0, left: 0, dodged: false })
  const [isCloudTransitioning, setIsCloudTransitioning] = useState(false)

  const canvasRef = useRef(null)
  const animationFrameRef = useRef(null)

  // Trigger confetti
  const runConfetti = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = []
    const particleCount = 140
    const colors = ['#e63946', '#f4a261', '#2a9d8f', '#e76f51', '#e0aaff', '#ffd166', '#ff70a6', '#70d6ff']

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height * 0.5,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 360,
        tiltSpeed: Math.random() * 8 + 3,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 4 + 2.5,
      })
    }

    const startTime = Date.now()
    const duration = 5000

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const elapsed = Date.now() - startTime

      particles.forEach((p) => {
        p.tilt += p.tiltSpeed
        p.x += p.vx + Math.sin(p.tilt * (Math.PI / 180)) * 1.5
        p.y += p.vy

        ctx.save()
        ctx.fillStyle = p.color
        ctx.translate(p.x, p.y)
        ctx.rotate((p.tilt * Math.PI) / 180)
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
        ctx.restore()
      })

      if (elapsed < duration) {
        animationFrameRef.current = requestAnimationFrame(render)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }

    render()
  }, [])

  // Auto-start on mount & Custom cursor active state
  useEffect(() => {
    // Transition from timer to slide 1
    const timer = setTimeout(() => {
      setSlide(1)
      runConfetti()
    }, 1200)

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
      }
    }

    const handleMouseDown = () => document.body.classList.add('mouse-down')
    const handleMouseUp = () => document.body.classList.remove('mouse-down')

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      clearTimeout(timer)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [runConfetti])

  // Slide 1 "tap" appearance
  useEffect(() => {
    if (slide !== 1) return
    const t = setTimeout(() => {
      setTapVisible(true)
    }, 2500)
    return () => clearTimeout(t)
  }, [slide])

  // Slide 2 Typewriter effect
  useEffect(() => {
    if (slide !== 2) return
    const fullText = teks1Lines.join('\n\n')
    let index = 0

    const interval = setInterval(() => {
      if (index < fullText.length) {
        setTeks1Typed(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        setTapVisible(true)
      }
    }, 55)

    return () => clearInterval(interval)
  }, [slide])

  // Slide 3 Typewriter effect
  useEffect(() => {
    if (slide !== 3) return
    const fullText = teks2Lines.join('\n')
    let index = 0

    const interval = setInterval(() => {
      if (index < fullText.length) {
        setTeks2Typed(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        setTapVisible(true)
      }
    }, 60)

    return () => clearInterval(interval)
  }, [slide])

  // Slide 5 Typewriter effect
  useEffect(() => {
    if (slide !== 5) return
    const text = 'Thank you.'
    let index = 0

    const t = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < text.length) {
          setTrimsTyped(text.slice(0, index + 1))
          index++
        } else {
          clearInterval(interval)
        }
      }, 120)
    }, 1000)

    return () => clearTimeout(t)
  }, [slide])

  // Advance slides via Pull String with Bottom-to-Top Cloud Transition Wave
  const handlePullString = () => {
    if (isCloudTransitioning) return

    if (slide === 1) {
      setIsCloudTransitioning(true)
      setTapVisible(false)
      setTimeout(() => {
        setTeks1Typed('')
        setSlide(2)
      }, 1600)
      setTimeout(() => {
        setIsCloudTransitioning(false)
      }, 3800)
    } else if (slide === 2) {
      setIsCloudTransitioning(true)
      setTapVisible(false)
      setTimeout(() => {
        setTeks2Typed('')
        setSlide(3)
      }, 1600)
      setTimeout(() => {
        setIsCloudTransitioning(false)
      }, 3800)
    } else if (slide === 3) {
      setIsCloudTransitioning(true)
      setTapVisible(false)
      setTimeout(() => {
        setSlide(4)
      }, 1600)
      setTimeout(() => {
        setIsCloudTransitioning(false)
      }, 3800)
    }
  }

  // Dodge "Gak!" button
  const dodgeButton = (e) => {
    e.stopPropagation()
    const randomY = Math.floor(Math.random() * 200) - 100
    const randomX = Math.floor(Math.random() * 260) - 130
    setNoPos({ top: randomY, left: randomX, dodged: true })
  }

  // Click "Suka!!" button
  const handleSuka = (e) => {
    e.stopPropagation()
    setSlideOutAnim('animate__bounceOut')
    setTimeout(() => {
      setTrimsTyped('')
      setSlide(5)
      setSlideOutAnim('')
      runConfetti()
    }, 700)
  }

  // Restart
  const handleRestart = (e) => {
    e.stopPropagation()
    setTapVisible(false)
    setTeks1Typed('')
    setTeks2Typed('')
    setTrimsTyped('')
    setSlide(1)
    setNoPos({ top: 0, left: 0, dodged: false })
    runConfetti()
  }

  return (
    <div className="bg" id="content">
      {/* Bottom-to-Top Cloud Wave Transition */}
      <CloudTransition active={isCloudTransitioning} />

      {/* Interactive Top-Right Themed Pull String */}
      <PullString
        onPull={handlePullString}
        isPrompting={tapVisible}
        disabled={slide === 4 || slide === 5 || isCloudTransitioning}
      />
      <div className="original-sky-layer" aria-hidden="true">
        {bgElements.clouds.map((c, index) => (
          <img
            key={c.id}
            src={c.file}
            alt=""
            className={`original-cloud original-cloud-${index}`}
            style={{
              top: `${c.top}%`,
              left: `${c.left}%`,
              width: `${c.width}%`,
              height: `${c.height}%`,
            }}
          />
        ))}

        {bgElements.hearts.map((h, index) => {
          const animClass = index % 3 === 0 ? 'heartFloatA' : index % 3 === 1 ? 'heartFloatB' : 'heartFloatC'
          const duration = 3.2 + (index % 5) * 0.45
          const delay = (index * 0.35) % 3.5
          return (
            <img
              key={h.id}
              src={h.file}
              alt=""
              className="original-heart"
              style={{
                top: `${h.top}%`,
                left: `${h.left}%`,
                width: `${h.width}%`,
                height: `${h.height}%`,
                animationName: animClass,
                animationDuration: `${duration}s`,
                animationDelay: `-${delay}s`,
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
              }}
            />
          )
        })}
      </div>

      {/* Confetti Canvas */}
      <canvas ref={canvasRef} className="confetti-canvas-container" />

      {/* Slide 0: Countdown Timer */}
      {slide === 0 && (
        <div className="timer-container animate__animated animate__fadeIn" id="timer">
          <h5>Countdown to birthday :</h5>
          <ul>
            <li>
              <span id="days">0</span>
              Days
            </li>
            <li>
              <span id="hours">0</span>
              Hours
            </li>
            <li>
              <span id="minutes">0</span>
              Minutes
            </li>
            <li>
              <span id="seconds">0</span>
              Seconds
            </li>
          </ul>
        </div>
      )}

      {/* Slide 1: Happy Birthday Banner */}
      {slide === 1 && (
        <div
          id="slideSatu"
          className={`animate__animated ${slideOutAnim || 'animate__slideInDown animate__slow'}`}
        >
          <img src="/img/hbd1.png" className="img" alt="Happy Birthday" />
          <p
            id="tap"
            className={`animate__animated ${tapVisible ? 'animate__pulse animate__infinite' : 'd-none'}`}
            style={{ display: tapVisible ? 'inline-block' : 'none' }}
            onClick={handlePullString}
          >
            Pull the string to continue
          </p>
        </div>
      )}

      {/* Slide 2: Paper Note 1 */}
      {slide === 2 && (
        <div
          id="slideDua"
          className={`slides paper animate__animated ${slideOutAnim || 'animate__zoomInDown animate__slow'}`}
        >
          <div className="paper-content">
            <p id="teks1" className="teks">
              {teks1Typed}
              <span className="cursor-blink">|</span>
            </p>
          </div>
          {tapVisible && (
            <div style={{ position: 'absolute', bottom: '15px', right: '20px', zIndex: 10 }}>
              <span
                id="tap"
                className="animate__animated animate__pulse animate__infinite"
                onClick={handlePullString}
              >
                Pull the string to continue
              </span>
            </div>
          )}
        </div>
      )}

      {/* Slide 3: Paper Note 2 */}
      {slide === 3 && (
        <div
          id="slideTiga"
          className={`slides paper animate__animated ${slideOutAnim || 'animate__fadeInRight'}`}
        >
          <div className="paper-content">
            <p id="teks2" className="teks">
              {teks2Typed}
              <span className="cursor-blink">|</span>
            </p>
          </div>
          {tapVisible && (
            <div style={{ position: 'absolute', bottom: '15px', right: '20px', zIndex: 10 }}>
              <span
                id="tap"
                className="animate__animated animate__pulse animate__infinite"
                onClick={handlePullString}
              >
                Pull the string to continue
              </span>
            </div>
          )}
        </div>
      )}

      {/* Slide 4: Question Box */}
      {slide === 4 && (
        <div
          className={`kotak slides animate__animated ${slideOutAnim || 'animate__fadeInDown'}`}
          id="slideEmpat"
        >
          <h5>Do you like it?</h5>
          <div className="button-row">
            <button
              id="gak"
              className="btn btn-outline-danger"
              type="button"
              onMouseEnter={dodgeButton}
              onClick={dodgeButton}
              style={{
                position: noPos.dodged ? 'relative' : 'static',
                top: `${noPos.top}px`,
                left: `${noPos.left}px`,
                transition: 'top 0.15s ease, left 0.15s ease',
              }}
            >
              No!
            </button>
            <button id="suka" className="btn btn-outline-info" type="button" onClick={handleSuka}>
              Love it!!
            </button>
          </div>
        </div>
      )}

      {/* Slide 5: Heart Celebration */}
      {slide === 5 && (
        <div id="slideLima" className="animate__animated animate__bounceIn animate__slow">
          <i className="fas fa-heart heart-icon" />
          <p id="trims">{trimsTyped}</p>
          <button className="btn-replay" type="button" onClick={handleRestart}>
            <i className="fas fa-redo-alt" style={{ marginRight: '8px' }} />
            Play Again
          </button>
        </div>
      )}
    </div>
  )
}
