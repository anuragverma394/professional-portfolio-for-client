"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Menu, X, MapPin, Instagram, Facebook, Twitter, Linkedin, Phone, Mail } from "lucide-react"

export default function Portfolio() {
  const heroRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const isMenuOpen = useRef(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && selectedImage) {
        setSelectedImage(null)
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    const observerOptions = {
      threshold: [0, 0.2, 0.5, 0.8, 1],
      rootMargin: "0px 0px -50px 0px",
    }

    const unifiedObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        try {
          const section = entry.target as HTMLElement
          const rect = entry.boundingClientRect
          const windowHeight = window.innerHeight

          if (entry.isIntersecting && rect && windowHeight > 0) {
            const scrollProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight))
            const scale = 0.85 + scrollProgress * 0.15
            const opacity = Math.max(0.4, scrollProgress)

            if (animationFrameRef.current) {
              cancelAnimationFrame(animationFrameRef.current)
            }

            animationFrameRef.current = requestAnimationFrame(() => {
              section.style.transform = `scale3d(${scale}, ${scale}, 1)`
              section.style.opacity = `${opacity}`
              section.style.transition = "transform 0.3s ease-out, opacity 0.3s ease-out"
            })

            section.classList.add("section-visible")
            section.classList.remove("section-hidden")
          } else {
            section.classList.add("section-hidden")
            section.classList.remove("section-visible")

            if (animationFrameRef.current) {
              cancelAnimationFrame(animationFrameRef.current)
            }

            animationFrameRef.current = requestAnimationFrame(() => {
              section.style.transform = "scale3d(1, 1, 1)"
              section.style.opacity = "0"
              section.style.transition = "transform 0.1s ease-out, opacity 0.1  s ease-out"
            })
          }
        } catch (error) {
          console.log("[v0] Observer error:", error)
        }
      })
    }, observerOptions)

    document.querySelectorAll("section").forEach((section) => {
      unifiedObserver.observe(section)
      section.classList.add("transform-3d-section")
    })

    const createFloatingParticle = () => {
      const particle = document.createElement("div")
      particle.className = "floating-particle-3d"
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 8 + 3}px;
        height: ${Math.random() * 8 + 3}px;
        background: linear-gradient(45deg, rgba(99, 102, 241, ${Math.random() * 0.4 + 0.2}), rgba(168, 85, 247, ${Math.random() * 0.4 + 0.2}));
        border-radius: 50%;
        pointer-events: none;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float3d ${Math.random() * 25 + 20}s infinite linear;
        z-index: 1;
        box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
        transform-style: preserve-3d;
      `

      const heroSection = document.getElementById("hero")
      if (heroSection) {
        heroSection.appendChild(particle)

        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle)
          }
        }, 45000)
      }
    }

    // Create initial 3D particles
    for (let i = 0; i < 15; i++) {
      setTimeout(() => createFloatingParticle(), i * 1000)
    }

    const particleInterval = setInterval(createFloatingParticle, 2000)

    let mouseTimeout: NodeJS.Timeout
    const handleMouseMove = (e: MouseEvent) => {
      try {
        clearTimeout(mouseTimeout)
        mouseTimeout = setTimeout(() => {
          const { clientX, clientY } = e
          const { innerWidth, innerHeight } = window

          const xPercent = (clientX / innerWidth - 0.5) * 2
          const yPercent = (clientY / innerHeight - 0.5) * 2

          const hero = document.getElementById("hero")
          if (hero && !hero.style.transform.includes("scale3d")) {
            hero.style.transform = `perspective(1000px) rotateY(${xPercent * 1}deg) rotateX(${-yPercent * 1}deg)`
          }
        }, 16) // ~60fps throttling
      } catch (error) {
        console.log("[v0] Mouse move error:", error)
      }
    }

    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      unifiedObserver.disconnect()
      clearInterval(particleInterval)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      clearTimeout(mouseTimeout)
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [selectedImage])

  const toggleMenu = () => {
    const menu = menuRef.current
    if (!menu) return

    isMenuOpen.current = !isMenuOpen.current

    if (isMenuOpen.current) {
      menu.classList.remove("translate-x-full")
      menu.classList.add("translate-x-0")
    } else {
      menu.classList.remove("translate-x-0")
      menu.classList.add("translate-x-full")
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      toggleMenu()
    }
  }

  const openSocialMedia = (platform: string) => {
    const urls = {
      instagram: "https://instagram.com/rajnishverma_artist",
      facebook: "https://facebook.com/rajnishverma.sculptor",
      twitter: "https://twitter.com/rajnishverma_art",
      linkedin: "https://linkedin.com/in/rajnishverma-sculptor",
    }
    window.open(urls[platform as keyof typeof urls], "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white-100 via-white-300 to-white-100 text-white overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white shadow-2xl transform-gpu">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <h1 className="text-sm sm:text-lg md:text-xl font-bold tracking-tight text-white hover:text-cyan-400 transition-all duration-300 transform hover:scale-105">
            <span className="hidden sm:inline">Artist & Co-Founder of Beyond Boundaries Art Studio</span>
            <span className="sm:hidden">Rajnish Verma</span>
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="z-50 hover:bg-white/10 transform hover:scale-110 hover:rotate-180 transition-all duration-300"
          >
            <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </Button>
        </div>
      </nav>

      <div
        ref={menuRef}
        className="fixed top-0 right-0 h-full w-full sm:w-96 bg-black/30 backdrop-blur-2xl border-l border-white/20 z-40 transform translate-x-full transition-all duration-700 ease-out shadow-2xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="p-6 sm:p-8 pt-16 sm:pt-20 transform-gpu">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="absolute top-4 right-4 hover:bg-white/10 transform hover:scale-110 hover:rotate-90 transition-all duration-300"
          >
            <X className="h-6 w-6 text-white" />
          </Button>

          <nav className="space-y-4 sm:space-y-6">
            {[
              { id: "hero", label: "Home" },
              { id: "about", label: "About" },
              { id: "awards", label: "Awards" },
              { id: "international-awards", label: "International" },
              { id: "gallery", label: "Gallery" },
              { id: "contact", label: "Contact" },
            ].map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block text-xl sm:text-2xl font-light hover:text-cyan-400 transition-all duration-500 text-left w-full text-white transform hover:translate-x-4 hover:scale-105"
                style={{
                  animationDelay: `${index * 100}ms`,
                  transform: `perspective(500px) rotateY(-10deg) translateZ(${index * 10}px)`,
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-8 sm:mt-12 pt-6 border-t border-white/20">
            <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
            <div className="flex gap-3 flex-wrap">
              {[
                { platform: "instagram", icon: Instagram, color: "hover:bg-pink-500/20" },
                { platform: "facebook", icon: Facebook, color: "hover:bg-blue-500/20" },
                { platform: "twitter", icon: Twitter, color: "hover:bg-sky-500/20" },
                { platform: "linkedin", icon: Linkedin, color: "hover:bg-indigo-500/20" },
              ].map(({ platform, icon: Icon, color }) => (
                <Button
                  key={platform}
                  variant="outline"
                  size="icon"
                  onClick={() => openSocialMedia(platform)}
                  className={`${color} border-white/30 hover:border-white/50 transform hover:scale-110 hover:rotate-12 transition-all duration-300`}
                >
                  <Icon className="h-4 w-4 text-white" />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section
        id="hero"
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative overflow-hidden transform-gpu"
        style={{
          transformStyle: "preserve-3d",
          background: "white"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white-500 to-white-100"></div>

        <div className="absolute right-0 top-0 w-full sm:w-1/2 h-full opacity-80 sm:opacity-90 transform-gpu">
          <img
            src="/dp.jpg"
            alt="Artist silhouette"
            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-1000"
            style={{ filter: "drop-shadow(0 0 50px rgba(99, 102, 241, 0.3))" }}
          />
        </div>

        <div className="absolute inset-0 z-[2] transform-gpu" style={{ transformStyle: "preserve-3d" }}>
          <div className="absolute top-3/4 right-1/4 w-12 sm:w-24 h-12 sm:h-24 border-2 border-purple-400 rotate-12 animate-pulse-3d shadow-lg shadow-purple-400/30"></div>
        
         </div>

        <div
          className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 transform-gpu"
          style={{ transformStyle: "preserve-3d" }}
        >
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 sm:mb-6 text-balance leading-tight relative transform-gpu">
            <span
              className="relative inline-block text-white transform hover:scale-110 transition-all duration-500"
              style={{ textShadow: "0 0 30px rgba(99, 102, 241, 0.5), 0 0 60px rgba(168, 85, 238, 0.3)" }}
            >
              Rajnish
              <div className="absolute inset-0 bg-gradient-to-r from-gray-400/30 via-transparent to-gray-400/30 animate-shimmer-3d"></div>
            </span>
            <span
              className="block text-black-300 relative transform hover:scale-110 transition-all duration-500"
              style={{ textShadow: "0 0 30px rgba(34, 211, 238, 0.5), 0 0 60px rgba(147, 51, 234, 0.3)" }}
            >
              Verma
              <div className="absolute inset-0 bg-gradient-to-r from-gray-400/40 via-transparent to-gray-400/40 animate-shimmer-reverse-3d"></div>
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-black mb-6 sm:mb-8 font-light transform hover:scale-105 transition-all duration-300">
            Sculptor & Fine Artist
          </p>
          <p className="text-base sm:text-lg text-slate-500 mb-8 sm:mb-12 max-w-2xl mx-auto text-pretty transform hover:scale-105 transition-all duration-300">
            M.F.A in Sculpture from Jamia Millia Islamia, New Delhi. Award-winning artist with exhibitions across India.
          </p>
          <Button
            size="lg"
            onClick={() => scrollToSection("about")}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 border-0"
            style={{ boxShadow: "0 0 40px rgba(99, 102, 241, 0.4)" }}
          >
            Explore My Work
          </Button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-white/20 bg-black/20 backdrop-blur-xl">
          <div className="animate-3d whitespace-nowrap py-3 sm:py-4 text-xs sm:text-sm text-black text-center">
            <span className="hidden sm:inline">
              SCULPTOR • FINE ARTIST • AWARD WINNER • EXHIBITIONS • JAMIA MILLIA ISLAMIA • ALLAHABAD UNIVERSITY •
            </span>
            <span className="sm:hidden">SCULPTOR • FINE ARTIST • AWARD WINNER •</span>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-slate-100 via-gray-100 to-white-500 transform-gpu"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
            <div
              className="order-2 lg:order-1 transform hover:scale-105 transition-all duration-700"
              style={{ transform: "perspective(1000px) rotateY(5deg)" }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-balance text-black">
                About the Artist
              </h2>
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-black/80">
                <p className="transform hover:translate-x-2 transition-all duration-300">
                  Rajnish Verma is an accomplished sculptor with a Master of Fine Arts degree from the prestigious Jamia
                  Millia Islamia, New Delhi, and a Bachelor of Fine Arts from Allahabad University.
                </p>
                <p className="transform hover:translate-x-2 transition-all duration-300">
                  His artistic journey spans over a decade, marked by numerous awards and exhibitions across India. His
                  work explores the intersection of traditional sculptural techniques with contemporary artistic
                  expression.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                  <div className="transform hover:scale-90 hover:rotate-1  p-4 bg-white/5 rounded-lg ">
                    <h3 className="font-semibold text-black-300 mb-2">Education</h3>
                    <p className="text-sm">M.F.A in Sculpture</p>
                    <p className="text-sm text-black">Jamia Millia Islamia</p>
                  </div>
                  <div className="transform hover:scale-105 hover:-rotate-1 transition-all duration-300 p-4 bg-white/5 rounded-lg backdrop-blur-sm">
                    <h3 className="font-semibold text-white-700 mb-2">Specialization</h3>
                    <p className="text-sm">Contemporary Sculpture</p>
                    <p className="text-sm text-white/60">Mixed Media</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="relative order-1 lg:order-2 transform hover:scale-105 transition-all duration-700"
              style={{ transform: "perspective(1000px) rotateY(-5deg)" }}
            >
              <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm border border-white/10">
                <img
                  src="/rajnishpic2.jpg"
                  alt="Rajnish Verma in his studio"
                  className="w-full h-190 object-cover transform hover:scale-110 transition-transform duration-1000"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-24 sm:w-32 h-16 sm:h-20 bg-black/40 rounded-lg shadow-2xl overflow-hidden border border-white/20 transform hover:scale-110 hover:rotate-3 transition-all duration-500">
                <img
                  src="/india.jpg"
                  alt="Sculpture tools"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="international-awards"
        className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-r from-white-200 via-white-100 to-pink-100 overflow-hidden"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-balance text-gray-800">
              International Awards
            </h2>
            <p className="mt-4 text-slate-100 text-base sm:text-lg">
              Prestigious recognitions from around the globe celebrating creativity and excellence in snow and ice
              sculpting.
            </p>
          </div>

          <div className="space-y-8 sm:space-y-12">
            {[
              {
                year: "2025",
                title: "Commemorative Award",
                location: "36th Harbin International Ice Sculpture Competition, China",
                image: "/36thaward.jpg",
                description:
                  "Awarded for participation and recognition in the 36th Harbin International Ice Sculpture Competition (2nd Jan – 4th Jan).",
              },
              {
                year: "2025",
                title: "Commemorative Award",
                location: "27th Harbin International Snow Sculpture Competition, China",
                image: "/27thpic.jpg",
                description:
                  "Recognized at the 27th Harbin International Snow Sculpture Competition (6th Jan – 9th Jan).",
              },
              {
                year: "2020",
                title: "Artists' Choice Award",
                location: "30th International Snow Sculpture Championship, Breckenridge, Colorado, USA",
                image: "/30thUSA.jpg",
                description:
                  "Recognized for outstanding artistic excellence at the world-renowned snow sculpting event in Breckenridge.",
              },
              {
                year: "2020",
                title: "Excellence Prize",
                location: "26th Harbin International Snow Sculpture Competition, Harbin, China",
                image: "/placeholder-7aw3k.png",
                description:
                  "Awarded for artistic mastery in one of the most prestigious snow sculpture competitions globally.",
              },
              {
                year: "2019",
                title: "Excellence Prize",
                location: "34th China Harbin International Ice Sculpture Competition, Harbin, China",
                image: "/34thchina.jpg",
                description: "Honored for innovative ice sculpture design and flawless execution.",
              },
              {
                year: "2019",
                title: "First Prize",
                location: "19th International Snow Sculpting Competition Japan Cup, Japan",
                image: "/placeholder-gycgn.png",
                description: "Achieved the highest recognition at Japan's premier snow sculpting championship.",
              },
              {
                year: "2019",
                title: "Special Prize",
                location: "24th Harbin International Snow Sculpture Competition, Harbin, China",
                image: "/placeholder-hkvow.png",
                description: "Awarded for creative originality and artistic impact in snow sculpture.",
              },
              {
                year: "2019",
                title: "Excellence Prize",
                location: "33rd China Harbin International Ice Sculpture Competition, Harbin, China",
                image: "/34thchina.jpg",
                description: "Recognized for exceptional artistry in international ice sculpting.",
              },
              {
                year: "2019",
                title: "Excellence Prize",
                location: "8th China Harbin International Ice-Assemblage Sculpture Championship, Harbin, China",
                image: "/placeholder-nxgb7.png",
                description: "Awarded for excellence in collaborative large-scale ice sculpture.",
              },
            ].map((award, index) => (
              <div
                key={index}
                className="relative bg-white rounded-2xl shadow-2xl p-4 sm:p-8 border border-indigo-200 flex flex-col sm:flex-row items-center gap-4 sm:gap-8 transform transition-all duration-700 hover:scale-105 hover:shadow-3xl"
              >
                <div className="w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 bg-slate-100 rounded-xl overflow-hidden shadow-inner">
                  <img
                    src={award.image || "/placeholder.svg"}
                    alt={award.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-center sm:text-left">
                  <span className="inline-block px-3 sm:px-4 py-1 text-sm font-medium bg-indigo-100 text-indigo-800 rounded-full mb-3 sm:mb-4">
                    {award.year}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-3">{award.title}</h3>
                  <p className="text-slate-600 mb-3 sm:mb-4 text-sm sm:text-base">{award.description}</p>
                  <p className="text-xs sm:text-sm text-slate-500 flex items-center justify-center sm:justify-start gap-1">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                    {award.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="awards"
        className="py-24 px-6 bg-gradient-to-br from-white-200 via-indigo-400 to-purple-300 relative overflow-hidden "
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.3),transparent_80%)]"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16 transform hover:scale-105 transition-all duration-500">
            <div className="w-24 sm:w-32 h-24 sm:h-32 mx-auto mb-6 rounded-full overflow-hidden shadow-2xl transform hover:rotate-12 transition-all duration-500 border-2 border-cyan-400">
              <img
                src="/placeholder.svg?height=96&width=96"
                alt="Awards"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <h2
              className="text-4xl md:text-5xl font-bold text-black text-balance"
              style={{ textShadow: "0 0 30px rgba(99, 102, 241, 0.5)" }}
            >
              Awards & Recognition
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                year: "2018",
                title: "PrafullaDhanukar Art Foundation Delhi City Merit Certificate Award",
                location: "Delhi",
                image: "/placeholder.svg?height=200&width=300",
              },
              {
                year: "2017",
                title: "PrafullaDhanukar Art Foundation Delhi City Award",
                location: "Delhi",
                image: "/placeholder.svg?height=200&width=300",
              },
              {
                year: "2017",
                title: "Young Artist Scholarship Award",
                organization: "Ministry of Culture, Government of India",
                location: "Delhi",
                image: "/placeholder.svg?height=200&width=300",
              },
              {
                year: "2017",
                title: "83rd All India Exhibition of Arts",
                location: "Amritsar, Punjab",
                image: "/placeholder.svg?height=200&width=300",
              },
              {
                year: "2017",
                title: "27 Art Point, All India 3rd Online Art Competition",
                location: "Jodhpur",
                image: "/placeholder.svg?height=200&width=300",
              },
              {
                year: "2016",
                title: "Appreciating Your Art Award",
                organization: "Allahabad University",
                location: "Allahabad, UP",
                image: "/placeholder.svg?height=200&width=300",
              },
            ].map((award, index) => (
              <Card
                key={index}
                className="p-6 bg-black/20 backdrop-blur-xl border border-white/20 relative overflow-hidden rounded-xl 
                     shadow-2xl transform transition-all duration-700 
                     hover:rotate-y-12 hover:-rotate-x-6 hover:scale-110 
                     hover:shadow-cyan-500/15"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `perspective(1000px)`,
                  boxShadow: "0 0 40px rgba(99, 102, 241, 0.2)",
                }}
              >
                <div className="w-full h-36 mb-4 rounded-lg overflow-hidden transform transition-all duration-500 hover:scale-110 border border-white/10">
                  <img
                    src={award.image || "/placeholder.svg"}
                    alt={award.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-start gap-4">
                  <Badge
                    variant="secondary"
                    className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30 shadow-lg backdrop-blur-sm"
                  >
                    {award.year}
                  </Badge>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2 leading-tight text-white hover:text-cyan-300 transition-colors">
                      {award.title}
                    </h3>
                    {award.organization && <p className="text-sm text-white/70 mb-1">{award.organization}</p>}
                    <p className="text-sm text-white/50 flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-cyan-400" />
                      {award.location}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        id="gallery"
        className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-slate-50 via-white-900 to-indigo-50 relative overflow-hidden"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">Academic Works</h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              A curated selection of my sculptures, blending traditional and contemporary forms.
            </p>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-3 sm:space-y-4">
            {[
              { src: "/gallery/rj1.jpg", alt: "Mixed Media Installation" },
              { src: "/gallery/rj2.jpg", alt: "Abstract Modern Sculpture" },
              { src: "/gallery/rj4.jpg", alt: "Organic Clay Form" },
              { src: "/gallery/rj5.jpg", alt: "Metal and Wood Sculpture" },
              { src: "/gallery/rj6.jpg", alt: "Figurative Bronze Sculpture" },
              { src: "/gallery/rj7.jpg", alt: "Contemporary Stone Carving" },
              { src: "/gallery/rj8.jpg", alt: "Kinetic Art Piece" },
              { src: "/gallery/rj9.jpg", alt: "Minimalist Sculpture" },
             
            ].map((item, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-xl shadow-lg border border-slate-200 break-inside-avoid cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                onClick={() => setSelectedImage(item.src)}
              >
                <img
                  src={item.src || "/placeholder.svg"}
                  alt={item.alt}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                  <div className="text-center text-white p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="w-12 h-12 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                    </div>
                    <p className="text-sm sm:text-lg font-semibold mb-2">{item.alt}</p>
                    <p className="text-xs sm:text-sm opacity-90 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                      Click to enlarge
                    </p>
                  </div>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-full animate-in zoom-in-95 duration-300">
            <img
              src={selectedImage || "/placeholder.svg"}
              alt="Gallery image"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm"
            >
              <X className="h-6 w-6" />
            </Button>
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-white/80 text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
              Press ESC or click outside to close
            </div>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="w-24 sm:w-32 h-24 sm:h-32 mx-auto mb-6 sm:mb-8 bg-indigo-100 rounded-full overflow-hidden">
            <img src="/placeholder.svg?height=128&width=128" alt="Contact" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-balance text-slate-900">
            Get In Touch
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 mb-8 sm:mb-12 text-pretty">
            Interested in commissioning a piece or learning more about my work? I'd love to hear from you.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <Card className="p-4 sm:p-6 text-center bg-white border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-3 sm:mb-4 bg-indigo-100 rounded-full overflow-hidden">
                <img
                  src="/placeholder.svg?height=64&width=64"
                  alt="Commissions"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold mb-2 text-slate-900">Commissions</h3>
              <p className="text-sm text-slate-500">Custom sculptural works</p>
            </Card>
            <Card className="p-4 sm:p-6 text-center bg-white border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-3 sm:mb-4 bg-indigo-100 rounded-full overflow-hidden">
                <img
                  src="/placeholder.svg?height=64&width=64"
                  alt="Exhibitions"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold mb-2 text-slate-900">Exhibitions</h3>
              <p className="text-sm text-slate-500">Gallery collaborations</p>
            </Card>
            <Card className="p-4 sm:p-6 text-center bg-white border-slate-200 shadow-lg hover:shadow-xl transition-shadow sm:col-span-2 lg:col-span-1">
              <div className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-3 sm:mb-4 bg-indigo-100 rounded-full overflow-hidden">
                <img src="/placeholder.svg?height=64&width=64" alt="Workshops" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-semibold mb-2 text-slate-900">Workshops</h3>
              <p className="text-sm text-slate-500">Sculpture techniques</p>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              asChild
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg shadow-lg"
            >
              <a href="tel:+919876543210" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Call Me
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg bg-transparent"
            >
              <a href="mailto:rajnish@example.com" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Me
              </a>
            </Button>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => openSocialMedia("instagram")}
              className="hover:bg-pink-50 hover:border-pink-300"
            >
              <Instagram className="h-5 w-5 text-pink-600" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => openSocialMedia("facebook")}
              className="hover:bg-blue-50 hover:border-blue-300"
            >
              <Facebook className="h-5 w-5 text-blue-600" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => openSocialMedia("twitter")}
              className="hover:bg-sky-50 hover:border-sky-300"
            >
              <Twitter className="h-5 w-5 text-sky-600" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => openSocialMedia("linkedin")}
              className="hover:bg-indigo-50 hover:border-indigo-300"
            >
              <Linkedin className="h-5 w-5 text-indigo-600" />
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 py-8 sm:py-12 px-4 sm:px-6 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-36 sm:w-20 h-16 sm:h-20 bg-indigo-100 rounded-full overflow-hidden">
                <img
                  src="/dp.jpg?height=100&width=90"
                  alt="Rajnish Verma"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-slate-900">Rajnish Verma</h3>
                <p className="text-slate-600 text-sm sm:text-base">Sculptor & Fine Artist</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-xs sm:text-sm text-slate-500 mb-1 sm:mb-2">M.F.A in Sculpture, Jamia Millia Islamia</p>
              <p className="text-xs sm:text-sm text-slate-400">© 2024 Rajnish Verma. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
