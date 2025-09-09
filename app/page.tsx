"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Menu, X, MapPin } from "lucide-react"

export default function Portfolio() {
  const heroRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const isMenuOpen = useRef(false)

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in")
        }
      })
    }, observerOptions)

    document.querySelectorAll("section").forEach((section) => {
      observer.observe(section)
    })

    // Floating particles only on md+ screens
    if (window.innerWidth >= 768) {
      const createFloatingParticle = () => {
        const particle = document.createElement("div")
        particle.className = "floating-particle"
        particle.style.cssText = `
          position: absolute;
          width: ${Math.random() * 6 + 2}px;
          height: ${Math.random() * 6 + 2}px;
          background: rgba(59, 130, 246, ${Math.random() * 0.3 + 0.1});
          border-radius: 50%;
          pointer-events: none;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          animation: float ${Math.random() * 20 + 15}s infinite linear;
          z-index: 1;
        `

        const heroSection = document.getElementById("hero")
        if (heroSection) heroSection.appendChild(particle)

        setTimeout(() => {
          if (particle.parentNode) particle.parentNode.removeChild(particle)
        }, 35000)
      }

      for (let i = 0; i < 15; i++) setTimeout(createFloatingParticle, i * 1000)
      const particleInterval = setInterval(createFloatingParticle, 2000)

      return () => clearInterval(particleInterval)
    }

    return () => observer.disconnect()
  }, [])

  const toggleMenu = () => {
    const menu = menuRef.current
    if (!menu) return

    isMenuOpen.current = !isMenuOpen.current
    menu.classList.toggle("translate-x-full")
    menu.classList.toggle("translate-x-0")
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      toggleMenu()
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* Navigation Menu */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-blue/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-4 flex justify-between items-center">
          <h1 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-slate-900 hover:bg-blue-50">
            Artist & Co-Founder of Beyond Boundaries Art Studio
          </h1>
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="z-50 hover:bg-blend-color-burn-100">
            <Menu className="h-6 w-6 text-slate-700" />
          </Button>
        </div>
      </nav>

      {/* Off-canvas Menu */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 h-full w-full md:w-96 bg-blue-100 border-l border-slate-200 z-40 transform translate-x-full transition-transform duration-500 ease-in-out shadow-2xl"
      >
        <div className="p-8 pt-20 relative h-full">
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="absolute top-4 right-4 hover:bg-slate-100">
            <X className="h-6 w-6 text-slate-700" />
          </Button>

          <nav className="space-y-6 mt-12">
            {["hero", "about", "awards", "exhibitions", "gallery", "contact"].map((id) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="block text-xl sm:text-2xl font-light hover:text-blue-300 transition-colors duration-300 text-left w-full text-slate-800"
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section
        id="hero"
        ref={heroRef}
        className="h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-black-100 via-gray to-slate-100"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black-50 via-gray to-black-300"></div>

        {/* Hero Image */}
        <div className="absolute right-0 top-0 w-full md:w-1/2 h-full opacity-35">
          <img src="/dp.jpg" alt="Artist silhouette" className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 md:mb-8 text-balance leading-tight">
            Rajnish <span className="block text-slate-600">Verma</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 mb-6 sm:mb-8">
            Sculptor & Fine Artist
          </p>
          <p className="text-sm sm:text-base md:text-lg text-slate-700 mb-8 sm:mb-12 max-w-2xl mx-auto">
            M.F.A in Sculpture from Jamia Millia Islamia, New Delhi. Award-winning artist with exhibitions across India.
          </p>
          <Button
            size="lg"
            onClick={() => scrollToSection("about")}
            className="bg-gray-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg md:text-xl shadow-lg"
          >
            Explore My Work
          </Button>
        </div>

        {/* Marquee Text */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-slate-200 bg-white/80">
          <div className="animate-marquee whitespace-nowrap py-2 sm:py-4 text-xs sm:text-sm md:text-base text-slate-500">
            SCULPTOR • FINE ARTIST • AWARD WINNER • EXHIBITIONS • JAMIA MILLIA ISLAMIA • ALLAHABAD UNIVERSITY •
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-black/40">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-balance text-slate-900">
                About the Artist
              </h2>
              <div className="space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg text-slate-100">
                <p>
                  Rajnish Verma is an accomplished sculptor with a Master of Fine Arts degree from Jamia Millia Islamia, New Delhi, and a Bachelor of Fine Arts from Allahabad University.
                </p>
                <p>
                  His artistic journey spans over a decade, marked by numerous awards and exhibitions across India. His work explores the intersection of traditional sculptural techniques with contemporary artistic expression.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 sm:pt-6">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Education</h3>
                    <p className="text-sm">M.F.A in Sculpture</p>
                    <p className="text-sm text-slate-100">Jamia Millia Islamia</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Specialization</h3>
                    <p className="text-sm">Contemporary Sculpture</p>
                    <p className="text-sm text-slate-100">Mixed Media</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex justify-center md:justify-end">
              <div className="bg-indigo-200 rounded-lg overflow-hidden shadow-xl inline-block w-full max-w-md sm:max-w-lg md:max-w-full">
                <img src="/rajnishpic2.jpg" alt="Rajnish Verma in his studio" className="w-full h-auto object-contain" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-40 h-24 bg-white rounded-lg shadow-lg overflow-hidden border border-slate-200 hidden sm:block">
                <img src="/india.jpg" alt="Sculpture tools" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

{/* International Awards Section */}
<section id="international-awards" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-gradient-to-r from-olive-400 via-red to-indigo-200 overflow-hidden">
  <div className="container mx-auto max-w-6xl">
    <div className="text-center mb-12 sm:mb-16">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
        International Awards
      </h2>
      <p className="mt-2 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-800">
        Prestigious recognitions from around the globe celebrating creativity and excellence in snow and ice sculpting.
      </p>
    </div>

    <div className="space-y-8 sm:space-y-12">
      {[
        {
          year: "2025",
          title: "Commemorative Award",
          location: "36th Harbin International Ice Sculpture Competition, China",
          image: "36thaward.jpg",
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
      ].map((award, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 bg-white rounded-2xl shadow-lg p-6 sm:p-8 transform transition-transform duration-500 hover:scale-105`}
        >
          <div className="w-full md:w-40 h-40 flex-shrink-0 bg-slate-100 rounded-xl overflow-hidden shadow-inner">
            <img src={award.image} alt={award.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block px-4 py-1 text-sm font-medium bg-indigo-100 text-indigo-800 rounded-full mb-2">
              {award.year}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">{award.title}</h3>
            <p className="text-sm sm:text-base text-slate-600 mb-1">{award.description}</p>
            <p className="text-sm text-slate-500 flex items-center justify-center md:justify-start gap-1">
              <MapPin className="h-4 w-4" /> {award.location}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* Awards Section */}
<section id="awards" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-indigo-950 via-blue-250 to-indigo-130 relative overflow-hidden">
  <div className="container mx-auto max-w-6xl relative z-10">
    <div className="text-center mb-12 sm:mb-16">
      <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
        <img src="/awardpic1.png" alt="Awards" className="w-full h-full object-cover rounded-full" />
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">Awards & Recognition</h2>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {[
        { year: "2018", title: "PrafullaDhanukar Art Foundation Delhi City Merit Certificate Award", location: "Delhi", image: "/awards/award1.jpg" },
        { year: "2017", title: "PrafullaDhanukar Art Foundation Delhi City Award", location: "Delhi", image: "/awards/award2.jpg" },
        { year: "2017", title: "Young Artist Scholarship Award", organization: "Ministry of Culture, Government of India", location: "Delhi", image: "/awards/award3.jpg" },
      ].map((award, index) => (
        <Card key={index} className="p-4 sm:p-6 bg-white rounded-xl shadow-lg transform transition-transform duration-500 hover:scale-105">
          <div className="w-full h-36 mb-4 rounded-lg overflow-hidden">
            <img src={award.image} alt={award.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200 shadow-sm">{award.year}</Badge>
            <h3 className="font-semibold text-slate-900">{award.title}</h3>
            {award.organization && <p className="text-sm text-slate-600">{award.organization}</p>}
            <p className="text-sm text-slate-500 flex items-center gap-1">
              <MapPin className="h-3 w-3 text-blue-500" /> {award.location}
            </p>
          </div>
        </Card>
      ))}
    </div>
  </div>
</section>

{/* Gallery Section */}
<section id="gallery" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-slate-200 relative overflow-hidden">
  <div className="container mx-auto max-w-6xl">
    <div className="text-center mb-12 sm:mb-16">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">Sculptural Works</h2>
      <p className="mt-2 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-600">A curated selection of my sculptures, blending traditional and contemporary forms.</p>
    </div>

    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {[
        { src: "/gallery/ram1.jpg", alt: "Mixed Media Installation" },
        { src: "/gallery/buddha.png", alt: "Abstract Modern Sculpture" },
        { src: "/gallery/ganeshtemp.jpeg", alt: "Organic Clay Form" },
      ].map((item, index) => (
        <div key={index} className="relative group overflow-hidden rounded-xl shadow-lg border border-slate-200 break-inside-avoid">
          <img src={item.src} alt={item.alt} className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-500">
            <p className="text-white text-sm sm:text-base md:text-lg font-semibold px-2 text-center">{item.alt}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* Contact Section */}
<section id="contact" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 bg-white">
  <div className="container mx-auto max-w-4xl text-center">
    <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 sm:mb-8 bg-blue-100 rounded-full overflow-hidden">
      <img src="/artist-studio-workspace-sculpture-tools-contact.jpg" alt="Contact" className="w-full h-full object-cover" />
    </div>
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-8 text-slate-900">Get In Touch</h2>
    <p className="text-sm sm:text-base md:text-lg text-slate-600 mb-8 sm:mb-12">Interested in commissioning a piece or learning more about my work? I'd love to hear from you.</p>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
      {[
        { title: "Commissions", img: "/custom-sculpture-commission-artwork.jpg", desc: "Custom sculptural works" },
        { title: "Exhibitions", img: "/art-gallery-exhibition-collaboration.jpg", desc: "Gallery collaborations" },
        { title: "Workshops", img: "/sculpture-workshop-teaching-art-techniques.jpg", desc: "Sculpture techniques" },
      ].map((item, index) => (
        <Card key={index} className="p-4 sm:p-6 text-center bg-white border-slate-200 shadow-lg">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 sm:mb-4 bg-blue-100 rounded-full overflow-hidden">
            <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
          </div>
          <h3 className="font-semibold mb-1 text-slate-900">{item.title}</h3>
          <p className="text-sm text-slate-500">{item.desc}</p>
        </Card>
      ))}
    </div>

    <Button
      size="lg"
      className="bg-blue-700 hover:bg-blue-800 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg md:text-xl shadow-lg"
      onClick={() => (window.location.href = "mailto:artist@example.com")}
    >
      Contact Me
    </Button>
  </div>
</section>

{/* Footer */}
<footer className="bg-slate-900 py-12 px-4 sm:px-6 md:px-8 text-center text-white">
  <p className="text-sm sm:text-base md:text-lg">&copy; {new Date().getFullYear()} Rajnish Verma. All rights reserved.</p>
</footer>
</div>
  )
} 