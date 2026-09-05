import { useEffect, useRef, memo } from 'react'

function RainEffect({ active }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Generate rain particles
    const dropCount = Math.floor(Math.min(window.innerWidth * 0.18, 160))
    const drops = []
    const splashes = []

    for (let i = 0; i < dropCount; i++) {
      drops.push({
        x: Math.random() * (canvas.width + 100) - 50,
        y: Math.random() * canvas.height,
        length: Math.random() * 20 + 15,
        speed: Math.random() * 10 + 16,
        thickness: Math.random() * 1.2 + 0.8,
        opacity: Math.random() * 0.4 + 0.25,
      })
    }

    const windAngle = -0.12 // slight diagonal slant

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw raindrops
      for (let i = 0; i < drops.length; i++) {
        const d = drops[i]

        const tailX = d.x
        const tailY = d.y
        const headX = d.x + Math.sin(windAngle) * d.length
        const headY = d.y + Math.cos(windAngle) * d.length

        const grad = ctx.createLinearGradient(tailX, tailY, headX, headY)
        grad.addColorStop(0, `rgba(180, 200, 220, 0)`)
        grad.addColorStop(1, `rgba(200, 220, 240, ${d.opacity})`)

        ctx.strokeStyle = grad
        ctx.lineWidth = d.thickness
        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(headX, headY)
        ctx.stroke()

        // Move
        d.x += Math.sin(windAngle) * d.speed
        d.y += Math.cos(windAngle) * d.speed

        // Splash trigger near bottom
        if (d.y > canvas.height - 40 && Math.random() < 0.12 && splashes.length < 25) {
          splashes.push({
            x: headX,
            y: headY,
            radius: 1,
            maxRadius: Math.random() * 7 + 4,
            opacity: 0.5,
          })
        }

        // Reset drop
        if (d.y > canvas.height) {
          d.y = -d.length - Math.random() * 50
          d.x = Math.random() * (canvas.width + 120) - 40
        }
      }

      // Draw subtle splash ripples
      for (let i = splashes.length - 1; i >= 0; i--) {
        const s = splashes[i]
        s.radius += 0.4
        s.opacity -= 0.035

        if (s.opacity <= 0) {
          splashes.splice(i, 1)
          continue
        }

        ctx.strokeStyle = `rgba(200, 220, 240, ${s.opacity})`
        ctx.lineWidth = 0.9
        ctx.beginPath()
        ctx.ellipse(s.x, s.y, s.radius * 2, s.radius * 0.7, 0, 0, Math.PI * 2)
        ctx.stroke()
      }

      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [active])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      className="rain-canvas-overlay"
      aria-hidden="true"
    />
  )
}

export default memo(RainEffect)
