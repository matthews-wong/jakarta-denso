"use client"

import type React from "react"
import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { Award, ThumbsUp, Droplet, MapPin, Play } from "lucide-react"
import { motion } from "framer-motion"
import FAQSection from "./FAQ" // Import the FAQ component

interface VideoData {
  url: string
  thumbnail?: string
  title: string
  description: string
  duration?: string
}

interface AlasanData {
  icon: React.ElementType
  title: string
  description: string
}

const alasanMemilih: AlasanData[] = [
  {
    icon: Award,
    title: "Profesional & Berpengalaman",
    description: "Teknisi kami ahli dalam perawatan mobil sejak tahun 2004.",
  },
  {
    icon: ThumbsUp,
    title: "Pelayanan Terbaik",
    description: "Kami mengutamakan kepuasan pelanggan dengan hasil cuci dan poles berkualitas tinggi.",
  },
  {
    icon: Droplet,
    title: "Cuci Mobil dengan Air PDAM Berkualitas",
    description:
      "Kami menggunakan air PDAM berkualitas untuk mencuci mobil Anda, memastikan hasil bersih tanpa bercak.",
  },
  {
    icon: MapPin,
    title: "Lokasi Strategis",
    description: "Bengkel kami mudah diakses di Jl. Garuda Raya No 2-4, Cirebon.",
  },
]

const videoPortofolio: VideoData[] = [
  {
    url: "/videos/video-bengkel.mp4",
    thumbnail: "/videos/video-bengkel.mp4?thumb=1",
    title: "Layanan Salon Mobil Terbaik Cirebon",
    description:
      "Lihat proses salon mobil premium dengan teknisi berpengalaman",
    duration: "0:24",
  },
  {
    url: "/videos/video-bengkel2.mp4",
    thumbnail: "/videos/video-bengkel2.mp4?thumb=1",
    title: "Salon Mobil Profesional: Perawatan Interior untuk Tampilan Maksimal!",
    description:
      "Salon mobil terbaik di Cirebon, menghadirkan perawatan interior profesional untuk kenyamanan dan tampilan maksimal!",
    duration: "1:08",
  },
]

// Optimized VideoThumbnail with direct fullscreen and autoplay
const VideoThumbnail = ({ video }: { video: VideoData }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const fullscreenVideoRef = useRef<HTMLVideoElement>(null)
  const playPromiseRef = useRef<Promise<void> | null>(null)

  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isInViewport, setIsInViewport] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Safely play video with promise tracking to prevent AbortError
  const safePlay = useCallback(async (videoElement: HTMLVideoElement) => {
    if (!videoElement) return false

    // If there's already a play promise in progress, wait for it
    if (playPromiseRef.current) {
      try {
        await playPromiseRef.current
      } catch {
        // Previous promise failed, but we can still try again
      }
    }

    try {
      // Store the new play promise
      playPromiseRef.current = videoElement.play()
      await playPromiseRef.current
      playPromiseRef.current = null
      return true
    } catch (error) {
      console.warn("Play failed:", error)
      playPromiseRef.current = null
      return false
    }
  }, [])

  // Safely pause video to prevent AbortError
  const safePause = useCallback(async (videoElement: HTMLVideoElement) => {
    if (!videoElement) return

    // If there's a play promise in progress, wait for it before pausing
    if (playPromiseRef.current) {
      try {
        await playPromiseRef.current
        videoElement.pause()
      } catch {
        // If the play promise was rejected, we don't need to pause
      } finally {
        playPromiseRef.current = null
      }
    } else {
      // No play promise in progress, safe to pause
      videoElement.pause()
    }
  }, [])

  // Setup intersection observer with debounce to prevent rapid play/pause cycles
  useEffect(() => {
    if (!containerRef.current) return

    let timeoutId: NodeJS.Timeout | null = null

    const options = {
      threshold: 0.5, // 50% visibility threshold
      rootMargin: "0px",
    }

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries
      const isNowInViewport = entry.isIntersecting

      // Clear any pending timeout
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }

      // Set a small delay to debounce rapid changes
      timeoutId = setTimeout(() => {
        setIsInViewport(isNowInViewport)

        if (isNowInViewport && videoRef.current && !isPlaying) {
          // Autoplay when in viewport
          videoRef.current.muted = true
          videoRef.current.playsInline = true
          videoRef.current.loop = true

          safePlay(videoRef.current).then((success) => {
            if (success) setIsPlaying(true)
          })
        } else if (!isNowInViewport && videoRef.current && isPlaying) {
          // Pause when out of viewport to save resources
          safePause(videoRef.current).then(() => setIsPlaying(false))
        }
      }, 150) // Small debounce delay
    }, options)

    observer.observe(containerRef.current)

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [isPlaying, safePlay, safePause])

  // Apply fixed position fallback for devices without fullscreen support
  const applyFixedPositionFallback = useCallback((videoElement: HTMLVideoElement) => {
    videoElement.style.position = "fixed"
    videoElement.style.top = "0"
    videoElement.style.left = "0"
    videoElement.style.width = "100%"
    videoElement.style.height = "100%"
    videoElement.style.zIndex = "9999"
    videoElement.style.backgroundColor = "black"
    videoElement.style.objectFit = "contain"
    setIsFullscreen(true)
  }, [])

  // Direct fullscreen playback - simplified for performance
  const playFullscreen = useCallback(() => {
    if (!fullscreenVideoRef.current) return

    const fullscreenVideo = fullscreenVideoRef.current

    // Pause the preview video if it's playing
    if (videoRef.current && isPlaying) {
      safePause(videoRef.current).then(() => setIsPlaying(false))
    }

    // Configure fullscreen video
    fullscreenVideo.src = video.url
    fullscreenVideo.muted = false
    fullscreenVideo.controls = true // Use native controls for better performance
    fullscreenVideo.style.display = "block"
    fullscreenVideo.preload = "auto"

    // Set metadata for better SEO
    fullscreenVideo.title = video.title

    // Load video
    fullscreenVideo.load()

    // Play and request fullscreen
    safePlay(fullscreenVideo).then((success) => {
      if (success) {
        // Try to go fullscreen
        if (document.fullscreenEnabled) {
          fullscreenVideo
            .requestFullscreen()
            .then(() => setIsFullscreen(true))
            .catch(() => {
              // Fallback for devices that don't support fullscreen
              applyFixedPositionFallback(fullscreenVideo)
            })
        } else {
          // Fallback for browsers that don't support fullscreen
          applyFixedPositionFallback(fullscreenVideo)
        }
      }
    })
  }, [video.url, video.title, isPlaying, safePlay, safePause, applyFixedPositionFallback])

  // Reset video position and state
  const resetVideo = useCallback(
    (videoElement: HTMLVideoElement) => {
      safePause(videoElement).then(() => {
        videoElement.style.display = "none"
        videoElement.style.position = ""
        videoElement.style.top = ""
        videoElement.style.left = ""
        videoElement.style.width = ""
        videoElement.style.height = ""
        videoElement.style.zIndex = ""
        videoElement.style.backgroundColor = ""
        videoElement.style.objectFit = ""
        setIsFullscreen(false)

        // Resume preview video if in viewport
        if (isInViewport && videoRef.current && !isPlaying) {
          safePlay(videoRef.current).then((success) => {
            if (success) setIsPlaying(true)
          })
        }
      })
    },
    [isInViewport, isPlaying, safePlay, safePause],
  )

  // Handle fullscreen exit
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && fullscreenVideoRef.current && isFullscreen) {
        resetVideo(fullscreenVideoRef.current)
      }
    }

    // Handle ESC key for fixed position fallback
    const handleEscKey = (e: KeyboardEvent) => {
      if (
        e.key === "Escape" &&
        fullscreenVideoRef.current &&
        fullscreenVideoRef.current.style.position === "fixed" &&
        isFullscreen
      ) {
        resetVideo(fullscreenVideoRef.current)
      }
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    document.addEventListener("keydown", handleEscKey)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isInViewport, isPlaying, isFullscreen, resetVideo])

  // Preload video when in viewport for smoother playback
  useEffect(() => {
    if (isInViewport && videoRef.current) {
      videoRef.current.preload = "auto"

      // Load video data
      if (!isLoaded) {
        videoRef.current.load()
      }
    }
  }, [isInViewport, isLoaded])

  // Clean up on unmount
  useEffect(() => {
    return () => {
      // Make sure to clean up any pending play promises
      playPromiseRef.current = null

      // Pause videos to prevent memory leaks
      if (videoRef.current) {
        videoRef.current.pause()
      }

      if (fullscreenVideoRef.current) {
        fullscreenVideoRef.current.pause()
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative rounded-3xl overflow-hidden aspect-[9/16] w-full cursor-pointer transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
      onClick={playFullscreen}
      // Add structured data attributes for SEO
      itemScope
      itemType="https://schema.org/VideoObject"
    >
      {/* Hidden structured data for SEO */}
      <meta itemProp="name" content={video.title} />
      <meta itemProp="description" content={video.description} />
      <meta itemProp="thumbnailUrl" content={video.thumbnail || ""} />
      <meta itemProp="contentUrl" content={video.url} />
      <meta itemProp="uploadDate" content="2023-01-01T08:00:00+08:00" />
      <meta itemProp="duration" content={video.duration || ""} />

      {/* Video title overlay */}
      <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/70 to-transparent z-10">
        <h3 className="text-white text-sm font-medium truncate">{video.title}</h3>
      </div>

      {/* Play button overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center z-10 bg-black bg-opacity-20 hover:bg-opacity-30 transition-all duration-300"
        aria-label={`Play video: ${video.title}`}
      >
        <div className="bg-blue-600 bg-opacity-80 rounded-full p-4 transform hover:scale-110 transition-transform shadow-lg">
          <Play className="w-8 h-8 text-white fill-white" />
        </div>
      </div>

      {/* Preview video that autoplays when in viewport */}
      <video
        ref={videoRef}
        className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        poster={video.thumbnail}
        muted
        playsInline
        loop
        preload="metadata"
        aria-hidden="true"
        onLoadedData={() => setIsLoaded(true)}
      >
        <source src={video.url} type="video/mp4" />
      </video>

      {/* Loading placeholder with thumbnail */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse">
          <Image
            src={video.thumbnail || `/placeholder.svg?height=600&width=400`}
            alt={video.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Duration badge */}
      <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md z-10">
        {video.duration}
      </div>

      {/* Hidden video element for fullscreen playback */}
      <video ref={fullscreenVideoRef} className="hidden" playsInline preload="none" aria-label={video.title}>
        <source src={video.url} type="video/mp4" />
        <p>
          Your browser does not support HTML5 video. Here is a <a href={video.url}>link to the video</a> instead.
        </p>
      </video>
    </div>
  )
}

const KelebihanKami: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  return (
    <>
      <section
        ref={sectionRef}
        id="kelebihan-kami"
        className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden"
        // Add structured data for SEO
        itemScope
        itemType="https://schema.org/Service"
      >
        {/* Hidden structured data for SEO */}
        <meta itemProp="name" content="Layanan Cuci dan Servis AC Mobil Cirebon" />
        <meta
          itemProp="description"
          content="Layanan profesional cuci mobil dan servis AC mobil di Cirebon dengan teknisi berpengalaman dan peralatan modern."
        />
        <meta itemProp="areaServed" content="Cirebon, Jawa Barat" />
        <meta itemProp="serviceType" content="Cuci Mobil, Servis AC Mobil" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16 md:mb-24"
          >
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight leading-tight"
              itemProp="headline"
            >
              Mengapa Memilih Kami?
            </h2>
            <div className="relative">
              <div className="h-2 w-32 md:w-40 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full" />
              <div className="absolute top-0 h-2 w-32 md:w-40 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full blur-xl opacity-50 left-1/2 transform -translate-x-1/2" />
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="flex flex-row justify-center gap-4 sm:gap-6 w-full">
              {videoPortofolio.map((video, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative w-1/2"
                >
                  <div className="relative rounded-3xl shadow-xl overflow-hidden">
                    <VideoThumbnail video={video} />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
              {alasanMemilih.map((alasan, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={cardVariants}
                >
                  <div
                    className="bg-white rounded-2xl p-6 h-full border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    itemProp="serviceType"
                  >
                    <div className="mb-5 relative">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 w-14 h-14 flex items-center justify-center">
                        <alasan.icon className="h-7 w-7 text-white" aria-hidden="true" />
                      </div>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-900">{alasan.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">{alasan.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative background elements */}
        <div
          className="absolute top-0 right-0 -mr-40 -mt-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 -ml-40 -mb-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 blur-3xl"
          aria-hidden="true"
        />
      </section>

      {/* Import and render the FAQ section below */}
      <FAQSection />
    </>
  )
}

export default KelebihanKami

