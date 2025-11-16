import React, { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Hero from './components/Hero'

function App() {
  const reduce = useReducedMotion()

  useEffect(() => {
    // Respect reduced motion; skip smooth scroll setup if user prefers reduced motion
    if (reduce) return
    let lenis
    import('@studio-freight/lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        smoothWheel: true,
        smoothTouch: false,
        syncTouch: true,
        lerp: 0.1,
        wheelMultiplier: 0.9,
      })
      const raf = (time) => {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
    })
    return () => {
      if (lenis && lenis.destroy) lenis.destroy()
    }
  }, [reduce])

  return (
    <div className="min-h-screen bg-[#0A192F] text-white">
      <Hero />

      {/* About Section placeholder to allow scrolling */}
      <section id="about" className="relative z-10 mx-auto max-w-[1400px] px-6 py-24">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500"
          initial={{ opacity: 0, y: 20, rotateY: -8 }}
          whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
          viewport={{ once: true, margin: '-20% 0px -20% 0px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          About Vraj
        </motion.h2>
        <motion.p
          className="mt-6 max-w-3xl text-white/80 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          I craft immersive web experiences that merge performance, accessibility, and delightful 3D interactions.
          This experience is an early slice of the full portfolio: dynamic 3D hero, smooth scrolling, and section
          transitions. More sections like Projects, Experience, Skills, and Contact will follow in the next iteration.
        </motion.p>
      </section>

      <footer className="relative z-10 border-t border-white/10 bg-[#0A192F]/80">
        <div className="mx-auto max-w-[1400px] px-6 py-10 flex items-center justify-between">
          <p className="text-white/60">© {new Date().getFullYear()} Vraj Valand</p>
          <a href="#top" className="text-cyan-400 hover:text-cyan-300 transition-colors">Back to top ↑</a>
        </div>
      </footer>
    </div>
  )
}

export default App
