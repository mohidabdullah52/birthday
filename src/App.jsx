import { useEffect, useRef, useState, useCallback } from 'react'
import './App.css'
import bgElements from './bg_elements.json'
import PullString from './PullString'
import CloudTransition from './CloudTransition'
import RainEffect from './RainEffect'
import MemoriesSlide from './MemoriesSlide'
import FlipCardsSlide from './FlipCardsSlide'

const memory1Lines = [
  'Every memory with you feels like a little piece of magic.',
  'From the quiet laughs to the sweetest adventures,',
  'you bring so much warmth and light into every single day.',
  'Thank you for simply being the wonderful soul you are.',
  'Wishing you a year as bright and beautiful as your smile! ✨',
]

const memory2Lines = [
  'Some of the sweetest moments in life are the simplest ones,',
  'like talking for hours about everything and nothing at all.',
  'Your kindness and gentle heart make the whole world softer.',
  'Never forget how truly special and loved you are,',
  'today, tomorrow, and in all the years ahead. 🌸',
]

const memory3Lines = [
  'Looking back at every journey, every milestone, every laugh,',
  "I'm reminded of how lucky I am to share these chapters with you.",
  'May your coming year be filled with exciting new adventures,',
  'endless joy, peace in your heart, and dreams coming true.',
  'Always cheering for you with all my love! 🎂💖',
]

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
  const [slide, setSlide] = useState(0) // 0: timer, 1: banner, 2: mem1, 3: mem2, 4: mem3, 5: flipCards, 6: paper1, 7: paper2, 8: question, 9: celebration
  const [tapVisible, setTapVisible] = useState(false)
  const [slideOutAnim, setSlideOutAnim] = useState('')
  const [teks1Typed, setTeks1Typed] = useState('')
  const [teks2Typed, setTeks2Typed] = useState('')
  const [trimsTyped, setTrimsTyped] = useState('')
  const [noPos, setNoPos] = useState({ top: 0, left: 0, dodged: false })
  const [isCloudTransitioning, setIsCloudTransitioning] = useState(false)
  const [theme, setTheme] = useState('pink') // 'pink' | 'sad-rainy'

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

  // Slide 6 Typewriter effect (Paper Note 1)
  useEffect(() => {
    if (slide !== 6) return
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

  // Slide 7 Typewriter effect (Paper Note 2)
  useEffect(() => {
    if (slide !== 7) return
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

  // Preload cloud image so there is zero hitching when transition starts
  useEffect(() => {
    const img = new Image()
    img.src = '/img/clean_cloud_2.png'
  }, [])

  // Slide 9 Typewriter effect
  useEffect(() => {
    if (slide !== 9) return
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
      // Banner -> Memory 1
      setIsCloudTransitioning(true)
      setTapVisible(false)
      setTimeout(() => {
        setSlide(2)
        setTheme('pink')
      }, 1050)
      setTimeout(() => {
        setIsCloudTransitioning(false)
      }, 2300)
    } else if (slide === 2) {
      // Memory 1 -> Memory 2
      setIsCloudTransitioning(true)
      setTapVisible(false)
      setTimeout(() => {
        setSlide(3)
        setTheme('pink')
      }, 1050)
      setTimeout(() => {
        setIsCloudTransitioning(false)
      }, 2300)
    } else if (slide === 3) {
      // Memory 2 -> Memory 3
      setIsCloudTransitioning(true)
      setTapVisible(false)
      setTimeout(() => {
        setSlide(4)
        setTheme('pink')
      }, 1050)
      setTimeout(() => {
        setIsCloudTransitioning(false)
      }, 2300)
    } else if (slide === 4) {
      // Memory 3 -> Flip Cards
      setIsCloudTransitioning(true)
      setTapVisible(false)
      setTimeout(() => {
        setSlide(5)
        setTheme('pink')
      }, 1050)
      setTimeout(() => {
        setIsCloudTransitioning(false)
      }, 2300)
    } else if (slide === 5) {
      // Flip Cards -> Paper Note 1 (Sad Rainy theme)
      setIsCloudTransitioning(true)
      setTapVisible(false)
      setTimeout(() => {
        setTeks1Typed('')
        setSlide(6)
        setTheme('sad-rainy')
      }, 1050)
      setTimeout(() => {
        setIsCloudTransitioning(false)
      }, 2300)
    } else if (slide === 6) {
      // Paper Note 1 -> Paper Note 2 (Pink theme)
      setIsCloudTransitioning(true)
      setTapVisible(false)
      setTimeout(() => {
        setTeks2Typed('')
        setSlide(7)
        setTheme('pink')
      }, 1050)
      setTimeout(() => {
        setIsCloudTransitioning(false)
      }, 2300)
    } else if (slide === 7) {
      // Paper Note 2 -> Question Box
      setIsCloudTransitioning(true)
      setTapVisible(false)
      setTimeout(() => {
        setSlide(8)
      }, 1050)
      setTimeout(() => {
        setIsCloudTransitioning(false)
      }, 2300)
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
      setSlide(9)
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
    setTheme('pink')
    setNoPos({ top: 0, left: 0, dodged: false })
    runConfetti()
  }

  return (
    <div className={`bg ${theme === 'sad-rainy' ? 'theme-sad-rainy' : ''}`} id="content">
      {/* Bottom-to-Top Cloud Wave Transition */}
      <CloudTransition active={isCloudTransitioning} />

      {/* Atmospheric Rain Effect for Sad Rainy Theme */}
      <RainEffect active={theme === 'sad-rainy'} />

      {/* Interactive Top-Right Themed Pull String */}
      <PullString
        onPull={handlePullString}
        isPrompting={tapVisible}
        disabled={slide === 8 || slide === 9 || isCloudTransitioning}
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

      {/* Slide 2: Memory 1 */}
      {slide === 2 && (
        <MemoriesSlide
          key="mem1"
          photoSrc="/img/memory_photo_1.png"
          caption="Cherished Moments 💕"
          lines={memory1Lines}
          tiltAngle={-7}
          onRevealed={() => setTapVisible(true)}
          onPullString={handlePullString}
          tapVisible={tapVisible}
        />
      )}

      {/* Slide 3: Memory 2 */}
      {slide === 3 && (
        <MemoriesSlide
          key="mem2"
          photoSrc="/img/memory_photo_2.png"
          caption="Happy Days & Sunshine ☀️"
          lines={memory2Lines}
          tiltAngle={6}
          onRevealed={() => setTapVisible(true)}
          onPullString={handlePullString}
          tapVisible={tapVisible}
        />
      )}

      {/* Slide 4: Memory 3 */}
      {slide === 4 && (
        <MemoriesSlide
          key="mem3"
          photoSrc="/img/memory_photo_3.png"
          caption="Magical Nights & Sparklers ✨"
          lines={memory3Lines}
          tiltAngle={-5}
          onRevealed={() => setTapVisible(true)}
          onPullString={handlePullString}
          tapVisible={tapVisible}
        />
      )}

      {/* Slide 5: Interactive Flip Cards */}
      {slide === 5 && (
        <FlipCardsSlide
          key="flipCards"
          onRevealed={() => setTapVisible(true)}
          onPullString={handlePullString}
          tapVisible={tapVisible}
        />
      )}

      {/* Slide 6: Paper Note 1 */}
      {slide === 6 && (
        <div
          id="slideDua"
          className={`slides paper animate__animated ${slideOutAnim || 'animate__fadeIn animate__faster'}`}
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

      {/* Slide 7: Paper Note 2 */}
      {slide === 7 && (
        <div
          id="slideTiga"
          className={`slides paper animate__animated ${slideOutAnim || 'animate__fadeIn animate__faster'}`}
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

      {/* Slide 8: Question Box */}
      {slide === 8 && (
        <div
          className={`kotak slides animate__animated ${slideOutAnim || 'animate__fadeIn animate__faster'}`}
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

      {/* Slide 9: Heart Celebration */}
      {slide === 9 && (
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
