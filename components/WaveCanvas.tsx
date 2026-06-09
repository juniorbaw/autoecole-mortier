'use client'
import { useEffect, useRef } from 'react'

export default function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let t = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      a: Math.random() * 0.3 + 0.08,
    }))

    function draw() {
      if (!canvas || !ctx) return
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)

      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        for (let x = 0; x <= W; x += 3) {
          const y =
            Math.sin((x / W) * Math.PI * 3 + t + i * 1.2) * 22 +
            Math.sin((x / W) * Math.PI * 6 + t * 0.6 + i * 0.8) * 8 +
            H * (0.62 + i * 0.1)
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.lineTo(W, H)
        ctx.lineTo(0, H)
        ctx.closePath()
        ctx.fillStyle = `rgba(45,106,79,${0.055 - i * 0.015})`
        ctx.fill()
      }

      pts.forEach(p => {
        p.x = (p.x + p.vx + W) % W
        p.y = (p.y + p.vy + H) % H
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(45,106,79,${p.a})`
        ctx.fill()
      })

      t += 0.006
      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.9 }}
      aria-hidden
    />
  )
}
