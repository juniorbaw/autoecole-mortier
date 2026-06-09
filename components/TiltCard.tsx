'use client'
import { useRef, useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'

interface TiltCardProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  intensity?: number
}

export default function TiltCard({
  children,
  className = '',
  style = {},
  intensity = 13,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [tr, setTr] = useState('')
  const [sh, setSh] = useState({ x: 50, y: 50, op: 0 })

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    const cx = r.width / 2
    const cy = r.height / 2
    const rx = ((y - cy) / cy) * -intensity
    const ry = ((x - cx) / cx) * intensity
    setTr(`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.03,1.03,1.03)`)
    setSh({ x: (x / r.width) * 100, y: (y / r.height) * 100, op: 1 })
  }

  const onLeave = () => {
    setTr('perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)')
    setSh(s => ({ ...s, op: 0 }))
  }

  const isReset = tr.includes('scale3d(1,')

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{
        ...style,
        transform: tr || undefined,
        transition: isReset
          ? 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
          : 'transform 0.08s ease-out',
        transformStyle: 'preserve-3d',
        position: 'relative',
      }}
    >
      {children}
      {/* Reflet lumineux */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at ${sh.x}% ${sh.y}%, rgba(255,255,255,0.22) 0%, transparent 65%)`,
          opacity: sh.op,
          transition: 'opacity 0.25s',
          pointerEvents: 'none',
          borderRadius: 'inherit',
          zIndex: 10,
        }}
      />
    </div>
  )
}
