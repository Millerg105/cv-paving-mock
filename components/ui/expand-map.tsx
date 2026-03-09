"use client"

import type React from "react"

import { useId, useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface LocationMapProps {
  location?: string
  coordinates?: string
  googleMapsUrl?: string
  className?: string
  dark?: boolean
}

export function LocationMap({
  location = "San Francisco, CA",
  coordinates = "37.7749° N, 122.4194° W",
  googleMapsUrl,
  className,
  dark = false,
}: LocationMapProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const gridId = useId()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-50, 50], [8, -8])
  const rotateY = useTransform(mouseX, [-50, 50], [-8, 8])

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  const handleClick = () => {
    setIsExpanded(!isExpanded)
  }

  const handleMapClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (googleMapsUrl) window.open(googleMapsUrl, '_blank');
  }

  return (
    <motion.div
      ref={containerRef}
      className={`relative cursor-pointer select-none ${className}`}
      style={{
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <motion.div
        className={`relative overflow-hidden rounded-2xl border ${dark ? 'border-foreground/10 bg-background/80' : 'border-border bg-background'}`}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          width: isExpanded ? 400 : 300,
          height: isExpanded ? 320 : 180,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 35,
        }}
      >
        <div className={`absolute inset-0 ${dark ? 'bg-gradient-to-br from-primary/10 via-transparent to-primary/5' : 'bg-gradient-to-br from-muted/20 via-transparent to-muted/40'}`} />

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="pointer-events-none absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className={`absolute inset-0 ${dark ? 'bg-background/20' : 'bg-muted'}`} />

              {/* Grid and abstract map lines kept same for style */}
              <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                {/* ... existing SVG content ... */}
                <motion.line x1="0%" y1="35%" x2="100%" y2="35%" className="stroke-foreground/25" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.2 }} />
                <motion.line x1="0%" y1="65%" x2="100%" y2="65%" className="stroke-foreground/25" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.3 }} />
                <motion.line x1="30%" y1="0%" x2="30%" y2="100%" className="stroke-foreground/20" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.4 }} />
                <motion.line x1="70%" y1="0%" x2="70%" y2="100%" className="stroke-foreground/20" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.5 }} />

                {[20, 50, 80].map((y, i) => (
                  <motion.line key={`h-${i}`} x1="0%" y1={`${y}%`} x2="100%" y2={`${y}%`} className="stroke-foreground/10" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }} />
                ))}
                {[15, 45, 55, 85].map((x, i) => (
                  <motion.line key={`v-${i}`} x1={`${x}%`} y1="0%" x2={`${x}%`} y2="100%" className="stroke-foreground/10" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }} />
                ))}
              </svg>

              {/* Keep abstract buildings */}
              <motion.div className="absolute left-[10%] top-[40%] h-[20%] w-[15%] rounded-sm border border-muted-foreground/20 bg-muted-foreground/30" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.5 }} />
              <motion.div className="absolute left-[35%] top-[15%] h-[15%] w-[12%] rounded-sm border border-muted-foreground/15 bg-muted-foreground/25" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.6 }} />
              <motion.div className="absolute left-[75%] top-[70%] h-[18%] w-[18%] rounded-sm border border-muted-foreground/18 bg-muted-foreground/28" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.7 }} />
              <motion.div className="absolute right-[10%] top-[20%] h-[25%] w-[10%] rounded-sm border border-muted-foreground/15 bg-muted-foreground/22" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.55 }} />
              <motion.div className="absolute left-[5%] top-[55%] h-[12%] w-[8%] rounded-sm border border-muted-foreground/12 bg-muted-foreground/20" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.65 }} />
              <motion.div className="absolute left-[75%] top-[8%] h-[10%] w-[14%] rounded-sm border border-muted-foreground/15 bg-muted-foreground/22" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.75 }} />

              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0, y: -20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.3 }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg" style={{ filter: "drop-shadow(0 0 10px rgba(var(--primary), 0.5))" }}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" className="fill-primary" />
                  <circle cx="12" cy="9" r="2.5" className="fill-background" />
                </svg>
              </motion.div>

              <div className={`absolute inset-0 opacity-60 ${dark ? 'bg-gradient-to-t from-background via-transparent to-transparent' : 'bg-gradient-to-t from-background via-transparent to-transparent'}`} />

              {/* Google Maps Link Button */}
              {googleMapsUrl && (
                <motion.div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-auto"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <button
                    onClick={handleMapClick}
                    className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-foreground text-xs font-bold uppercase tracking-wider rounded-full border border-primary/30 transition-all shadow-[0_0_15px_rgba(var(--primary),0.35)] hover:shadow-[0_0_20px_rgba(var(--primary),0.5)]"
                  >
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" /></svg>
                    <span>Open in Maps</span>
                  </button>
                </motion.div>
              )}

            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          animate={{ opacity: isExpanded ? 0 : 0.03 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id={gridId} width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" className="stroke-foreground" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${gridId})`} />
          </svg>
        </motion.div>

        <div className="relative z-10 flex h-full flex-col justify-between p-5">
          <div className="flex items-start justify-between">
            <div className="relative">
              <motion.div
                className="relative"
                animate={{
                  opacity: isExpanded ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                  animate={{
                    filter: isHovered
                      ? "drop-shadow(0 0 8px rgba(var(--primary), 0.6))"
                      : "drop-shadow(0 0 4px rgba(var(--primary), 0.3))",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                  <line x1="9" x2="9" y1="3" y2="18" />
                  <line x1="15" x2="15" y1="6" y2="21" />
                </motion.svg>
              </motion.div>
            </div>

            <motion.div
              className={`flex items-center gap-1.5 rounded-full px-2 py-1 backdrop-blur-sm ${dark ? 'bg-white/8' : 'bg-foreground/5'}`}
              animate={{
                scale: isHovered ? 1.05 : 1,
                backgroundColor: dark
                  ? (isHovered ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.10)")
                  : (isHovered ? "hsl(var(--foreground) / 0.08)" : "hsl(var(--foreground) / 0.05)"),
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className={`text-[10px] font-medium uppercase tracking-wide ${dark ? 'text-white/60' : 'text-muted-foreground'}`}>Live</span>
            </motion.div>
          </div>

          <div className="space-y-1">
            <motion.h3
              className={`text-sm font-medium tracking-tight ${dark ? 'text-white' : 'text-foreground'}`}
              animate={{
                x: isHovered ? 4 : 0,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {location}
            </motion.h3>

            <AnimatePresence>
              {isExpanded && (
                <motion.p
                  className={`text-xs font-mono ${dark ? 'text-white/70' : 'text-muted-foreground'}`}
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {coordinates}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.div
              className={`h-px ${dark ? 'bg-gradient-to-r from-primary/70 via-primary/45 to-transparent' : 'bg-gradient-to-r from-primary/50 via-primary/30 to-transparent'}`}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{
                scaleX: isHovered || isExpanded ? 1 : 0.3,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.div>

      <motion.p
        className={`absolute -bottom-6 left-1/2 whitespace-nowrap text-[10px] ${dark ? 'text-white/45' : 'text-muted-foreground'}`}
        style={{ x: "-50%" }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered && !isExpanded ? 1 : 0,
          y: isHovered ? 0 : 4,
        }}
        transition={{ duration: 0.2 }}
      >
        Click to expand
      </motion.p>
    </motion.div>
  )
}
