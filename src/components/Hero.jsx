import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'

const Title3D = () => {
  return (
    <motion.h1
      className="pointer-events-none select-none text-center font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow-[0_0_20px_rgba(56,189,248,0.35)]"
      style={{ textShadow: '0 0 30px rgba(0,217,255,0.25)' }}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">VRAJ VALAND</span>
      <span className="mt-3 block text-base sm:text-lg md:text-xl text-white/80">
        Frontend Developer • UX/UI Designer • Research Analytics
      </span>
    </motion.h1>
  )
}

const Hero = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    // Smooth entrance parallax on mouse move
    const el = containerRef.current
    if (!el) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = (e.clientX - cx) / r.width
      const dy = (e.clientY - cy) / r.height
      el.style.setProperty('--tiltX', `${dy * -6}deg`)
      el.style.setProperty('--tiltY', `${dx * 6}deg`)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0A192F] text-white">
      {/* 3D Spline Scene */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
        {/* Gradient overlays for depth; pointer-events-none so Spline remains interactive */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0A192F]/60 via-transparent to-[#0A192F]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0A192F]" />
      </div>

      {/* Content */}
      <div
        ref={containerRef}
        className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] flex-col items-center justify-center px-6 text-center"
        style={{ perspective: '1000px', transform: 'rotateX(var(--tiltX)) rotateY(var(--tiltY))' }}
      >
        <Title3D />
        <motion.a
          href="#about"
          className="mt-10 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-cyan-500/25 transition-transform hover:scale-[1.03] active:scale-95"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Explore My Work
        </motion.a>
      </div>
    </section>
  )
}

export default Hero
