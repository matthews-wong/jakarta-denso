"use client"

import { Suspense, useState, useEffect, useCallback, useMemo } from "react"
import { Analytics } from "@vercel/analytics/react"
import dynamic from "next/dynamic"
import { useInView } from "react-intersection-observer"
import { usePathname } from "next/navigation"

import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Loading from "./loading"

// Hash to section ID mapping
const HASH_TO_ID_MAP: Record<string, string> = {
  services: "services",
  "kelebihan-kami": "kelebihan-kami",
  beranda: "",
}

const Services = dynamic(() => import("./components/Services"), {
  loading: () => <Loading />,
  ssr: true,
})

const WhyChooseUs = dynamic(() => import("./components/WhyChooseUs"), {
  loading: () => <Loading />,
  ssr: true,
})

const BlogsPreview = dynamic(() => import("./components/BlogPreview"), {
  loading: () => <Loading />,
  ssr: true,
})

const Footer = dynamic(() => import("./components/Footer"), {
  loading: () => <Loading />,
  ssr: true,
})

const WhatsAppButton = dynamic(() => import("./components/WhatsAppButton"), {
  ssr: false,
  loading: () => null,
})

export default function Home() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [allComponentsVisible, setAllComponentsVisible] = useState(false)
  const [initialHashProcessed, setInitialHashProcessed] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const [isProgrammaticNavigation, setIsProgrammaticNavigation] = useState(false)

  const observerOptions = useMemo(
    () => ({
      triggerOnce: true,
      threshold: 0.1,
      rootMargin: "200px 0px",
    }),
    [],
  )

  const [servicesRef, servicesInView] = useInView(observerOptions)
  const [midSectionRef, midSectionInView] = useInView(observerOptions)
  const [bottomSectionRef, bottomSectionInView] = useInView(observerOptions)
  const [shouldLoadWhatsApp, setShouldLoadWhatsApp] = useState(false)

  useEffect(() => {
    if (document.documentElement.hasAttribute("data-css-vars-set")) {
      setMounted(true)
      return
    }
    const root = document.documentElement
    root.style.setProperty("--container-padding", "1rem")
    root.style.setProperty("--hero-height", "80vh")
    root.style.setProperty("--section-spacing", "4rem")
    root.setAttribute("data-css-vars-set", "true")
    setMounted(true)
  }, [])

  // ... keep your scroll/hash navigation logic the same ...

  useEffect(() => {
    if (!mounted) return
    const loadWhatsApp = () => setShouldLoadWhatsApp(true)

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      ;(window as any).requestIdleCallback(loadWhatsApp, { timeout: 3000 })
    } else {
      setTimeout(loadWhatsApp, 3000)
    }
  }, [mounted])

  return (
    <main className="min-h-screen bg-white">
      {isNavigating && <Loading />}

      <Navbar />
      <Hero />
      <About />

      {/* Services Section */}
      <div ref={servicesRef} id="services">
        {mounted && (servicesInView || allComponentsVisible) && (
          <Suspense fallback={<Loading />}>
            <section
              className="content-visibility-auto"
              style={{ contain: "content", containIntrinsicSize: "1px 600px" }}
            >
              <Services />
            </section>
          </Suspense>
        )}
      </div>

      {/* Why Choose Us */}
      <div ref={midSectionRef}>
        {mounted && (midSectionInView || allComponentsVisible) && (
          <Suspense fallback={<Loading />}>
            <section
              className="content-visibility-auto"
              style={{ contain: "content", containIntrinsicSize: "1px 900px" }}
            >
              <div id="kelebihan-kami">
                <WhyChooseUs />
              </div>
            </section>
          </Suspense>
        )}
      </div>

      {/* Blog + Footer */}
      <div ref={bottomSectionRef}>
        {mounted && (bottomSectionInView || allComponentsVisible) && (
          <Suspense fallback={<Loading />}>
            <section
              className="content-visibility-auto"
              style={{ contain: "content", containIntrinsicSize: "1px 1100px" }}
            >
              <BlogsPreview />
              <Footer />
            </section>
          </Suspense>
        )}
      </div>

      {shouldLoadWhatsApp && mounted && (
        <Suspense fallback={null}>
          <WhatsAppButton />
        </Suspense>
      )}

      <Analytics />
    </main>
  )
}
