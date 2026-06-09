'use client'
import { useEffect, useRef } from 'react'

export default function ParticleCar() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef<'forming' | 'formed' | 'exploding'>('forming')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number

    const W = canvas.offsetWidth
    const H = canvas.offsetHeight
    canvas.width = W
    canvas.height = H

    // ── Rasteriser la voiture sur un canvas hors-écran ─────────────────────
    const OW = 440, OH = 220
    const oc = document.createElement('canvas')
    oc.width = OW; oc.height = OH
    const octx = oc.getContext('2d')!

    const scale = Math.min((OW * 0.78) / 148, (OH * 0.72) / 64)
    const cw = 148 * scale, ch = 64 * scale
    const ox = (OW - cw) / 2, oy = (OH - ch) / 2
    const s = scale

    octx.fillStyle = '#fff'
    // Corps bas
    octx.fillRect(ox + 8 * s, oy + 32 * s, 132 * s, 24 * s)
    // Toit
    octx.beginPath()
    octx.moveTo(ox + 32 * s, oy + 32 * s)
    octx.lineTo(ox + 44 * s, oy + 13 * s)
    octx.lineTo(ox + 100 * s, oy + 13 * s)
    octx.lineTo(ox + 120 * s, oy + 32 * s)
    octx.closePath(); octx.fill()
    // Roue avant
    octx.beginPath(); octx.arc(ox + 118 * s, oy + 56 * s, 10 * s, 0, Math.PI * 2); octx.fill()
    // Roue arrière
    octx.beginPath(); octx.arc(ox + 34 * s, oy + 56 * s, 10 * s, 0, Math.PI * 2); octx.fill()

    if (!octx) return
    const imgData = octx.getImageData(0, 0, OW, OH).data
    const targets: Array<{ x: number; y: number }> = []
    const STEP = 4
    for (let py = 0; py < OH; py += STEP) {
      for (let px = 0; px < OW; px += STEP) {
        if (imgData[(py * OW + px) * 4 + 3] > 100) {
          targets.push({
            x: W / 2 + (px / OW - 0.5) * W * 0.76,
            y: H / 2 + (py / OH - 0.5) * H * 0.82,
          })
        }
      }
    }

    // ── Créer les particules ───────────────────────────────────────────────
    const COLORS = ['#2d6a4f', '#52b788', '#40916c', '#74c69d', '#1b4332', '#95d5b2']
    const particles = targets.map(t => ({
      x: Math.random() * W,
      y: Math.random() * H,
      tx: t.x, ty: t.y,
      vx: 0, vy: 0,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 3 + 1.2,
      alpha: Math.random() * 0.4 + 0.65,
      ev_x: (Math.random() - 0.5) * 16,
      ev_y: (Math.random() - 0.5) * 16 - 4,
    }))

    // ── Boucle d'animation ─────────────────────────────────────────────────
    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, W, H)
      const state = stateRef.current

      particles.forEach(p => {
        if (state === 'forming' || state === 'formed') {
          p.x += (p.tx - p.x) * 0.07
          p.y += (p.ty - p.y) * 0.07
          p.alpha = Math.min(p.alpha + 0.01, 0.95)
        } else if (state === 'exploding') {
          p.vx *= 0.94
          p.vy = p.vy * 0.94 + 0.22
          p.x += p.vx
          p.y += p.vy
          p.alpha -= 0.011
        }
        if (p.alpha <= 0) return
        ctx.globalAlpha = Math.max(0, p.alpha)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      })
      ctx.globalAlpha = 1
      animId = requestAnimationFrame(draw)
    }

    draw()

    // ── Interaction clic ──────────────────────────────────────────────────
    let reformTimer: ReturnType<typeof setTimeout>

    const handleClick = () => {
      if (stateRef.current === 'exploding') return
      stateRef.current = 'exploding'
      particles.forEach(p => {
        p.vx = p.ev_x * (0.7 + Math.random() * 0.6)
        p.vy = p.ev_y * (0.7 + Math.random() * 0.6)
        p.alpha = 0.95
      })
      clearTimeout(reformTimer)
      reformTimer = setTimeout(() => {
        particles.forEach(p => {
          p.vx = 0; p.vy = 0; p.alpha = 0.4
          p.x = Math.random() * W
          p.y = Math.random() * H
        })
        stateRef.current = 'forming'
      }, 2400)
    }

    canvas.addEventListener('click', handleClick)

    return () => {
      cancelAnimationFrame(animId)
      canvas.removeEventListener('click', handleClick)
      clearTimeout(reformTimer)
    }
  }, [])

  return (
    <div className="relative w-full" style={{ height: '280px' }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-pointer select-none"
        aria-label="Voiture en particules — cliquez pour animer"
      />
      <p
        className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs font-medium pointer-events-none whitespace-nowrap animate-pulse-slow"
        style={{ color: 'var(--secondary-text)', opacity: 0.55 }}
      >
        Clique pour faire exploser la voiture
      </p>
    </div>
  )
}
