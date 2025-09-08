"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Menu, X, Calendar, MapPin, Palette, ExternalLink } from "lucide-react"

export default function Portfolio() {
  const heroRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const isMenuOpen = useRef(false)

  useEffect(() => {
    // GSAP-like animations using CSS and Intersection Observer
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

    // Observe all sections
    document.querySelectorAll("section").forEach((section) => {
      observer.observe(section)
    })

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
      if (heroSection) {
        heroSection.appendChild(particle)

        // Remove particle after animation
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle)
          }
        }, 35000)
      }
    }

    // Create initial particles
    for (let i = 0; i < 15; i++) {
      setTimeout(() => createFloatingParticle(), i * 1000)
    }

    // Continue creating particles
    const particleInterval = setInterval(createFloatingParticle, 2000)

    return () => {
      observer.disconnect()
      clearInterval(particleInterval)
    }
  }, [])

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
      toggleMenu() // Close menu after navigation
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* Navigation Menu */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-blue/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight text-slate-900 hover:bg-blue-50">Artist & Co-Founder of Beyond Boundaries Art Studio</h1>
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
        <div className="p-8 pt-20">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="absolute top-4 right-4 hover:bg-slate-100"
          >
            <X className="h-6 w-6 text-slate-700" />
          </Button>

          <nav className="space-y-6">
            {[
              { id: "hero", label: "Home" },
              { id: "about", label: "About" },
              { id: "awards", label: "Awards" },
              { id: "exhibitions", label: "Exhibitions" },
              { id: "gallery", label: "Gallery" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block text-2xl font-light hover:text-blue-300 transition-colors duration-300 text-left w-full text-slate-800"
              >
                {item.label}
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
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-35">
          <img src="/dp.jpg" alt="Artist silhouette" className="w-full h-full object-cover" />
        </div>

        <div className="absolute inset-0 z-[2]">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-blue-200 rotate-45 animate-spin-slow"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 border border-slate-200 rotate-12 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/6 w-16 h-16 bg-blue-300 rounded-full animate-bounce-slow"></div>
          <div className="absolute bottom-1/4 left-1/2 w-20 h-20 border-2 border-blue-200 rounded-full animate-ping-slow"></div>

          {/* Floating lines */}
          <div className="absolute top-1/3 right-1/3 w-40 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-slide-right"></div>
          <div className="absolute bottom-1/3 left-1/3 w-32 h-px bg-gradient-to-l from-transparent via-slate-300 to-transparent animate-slide-left"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-balance leading-tight relative">
            <span className="relative inline-block text-slate-900">
              Rajnish
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 via-transparent to-blue-200/30 animate-shimmer"></div>
            </span>
            <span className="block text-slate-600 relative">
              Verma
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300/40 via-transparent to-blue-300/40 animate-shimmer-reverse"></div>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-8 font-light">Sculptor & Fine Artist</p>
          <p className="text-lg text-slate-700 mb-12 max-w-2xl mx-auto text-pretty">
            M.F.A in Sculpture from Jamia Millia Islamia, New Delhi. Award-winning artist with exhibitions across India.
          </p>
          <Button
            size="lg"
            onClick={() => scrollToSection("about")}
            className="bg-gray-600 hover:bg-blue-700 text-white px-8 py-3 text-lg shadow-lg"
          >
            Explore My Work
          </Button>
        </div>

        {/* Marquee Text */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-slate-200 bg-white/80">
          <div className="animate-marquee whitespace-nowrap py-4 text-sm text-slate-500">
            SCULPTOR • FINE ARTIST • AWARD WINNER • EXHIBITIONS • JAMIA MILLIA ISLAMIA • ALLAHABAD UNIVERSITY •
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-black/40">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-balance text-slate-900">About the Artist</h2>
              <div className="space-y-6 text-lg text-slate-100">
                <p>
                  Rajnish Verma is an accomplished sculptor with a Master of Fine Arts degree from the prestigious Jamia
                  Millia Islamia, New Delhi, and a Bachelor of Fine Arts from Allahabad University.
                </p>
                <p>
                  His artistic journey spans over a decade, marked by numerous awards and exhibitions across India. His
                  work explores the intersection of traditional sculptural techniques with contemporary artistic
                  expression.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-6">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Education</h3>
                    <p className="text-sm">M.F.A in Sculpture</p>
                    <p className="text-sm text-slate-100">Jamia Millia Islamia</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Specialization</h3>
                    <p className="text-sm">Contemporary Sculpture</p>
                    <p className="text-sm text-slate-100">Mixed Media</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
        <div className="bg-indigo rounded-lg overflow-hidden shadow-xl inline-block">
  <img
    src="/rajnishpic2.jpg"
    alt="Rajnish Verma in his studio"
    className="w-auto h-auto max-w-full max-h-[695px] object-contain"
  />
</div>




              {/* Studio tools image overlay */}
              <div className="absolute -bottom-6 -right-6 w-50 h-32 bg-white rounded-lg shadow-lg overflow-hidden border border-slate-200">
                <img src="/india.jpg" alt="Sculpture tools" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
<section id="international-awards" className="py-24 px-6 bg-gradient-to-r from-olive-400 via-red to-indigo-200 overflow-hidden">
  <div className="container mx-auto max-w-6xl">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-balance text-slate-900">
        International Awards
      </h2>
      <p className="mt-4 text-slate-800">
        Prestigious recognitions from around the globe celebrating creativity and excellence in snow and ice sculpting.
      </p>
    </div>

    <div className="space-y-12">
      {[
        {
  year: "2025",
  title: "Commemorative Award",
  location: "36th Harbin International Ice Sculpture Competition, China",
  image: "/awards/harbin-ice2025.png",
  description:
    "Awarded for participation and recognition in the 36th Harbin International Ice Sculpture Competition (2nd Jan – 4th Jan).",
},
{
  year: "2025",
  title: "Commemorative Award",
  location: "27th Harbin International Snow Sculpture Competition, China",
  image: "/awards/harbin-snow2025.png",
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
          image: "/awards/harbin-snow.png",
          description:
            "Awarded for artistic mastery in one of the most prestigious snow sculpture competitions globally.",
        },
        {
          year: "2019",
          title: "Excellence Prize",
          location: "34th China Harbin International Ice Sculpture Competition, Harbin, China",
          image: "/34thchina.jpg",
          description:
            "Honored for innovative ice sculpture design and flawless execution.",
        },
        {
          year: "2019",
          title: "First Prize",
          location: "19th International Snow Sculpting Competition Japan Cup, Japan",
          image: "/awards/japan-snow.png",
          description:
            "Achieved the highest recognition at Japan's premier snow sculpting championship.",
        },
        {
          year: "2019",
          title: "Special Prize",
          location: "24th Harbin International Snow Sculpture Competition, Harbin, China",
          image: "/24thchina.jpg",
          description:
            "Awarded for creative originality and artistic impact in snow sculpture.",
        },
        {
          year: "2019",
          title: "Excellence Prize",
          location: "33rd China Harbin International Ice Sculpture Competition, Harbin, China",
          image: "/awards/harbin-ice2.png",
          description:
            "Recognized for exceptional artistry in international ice sculpting.",
        },
        {
          year: "2019",
          title: "Excellence Prize",
          location: "8th China Harbin International Ice-Assemblage Sculpture Championship, Harbin, China",
          image: "/awards/harbin-assemblage.png",
          description:
            "Awarded for excellence in collaborative large-scale ice sculpture.",
        },
      ].map((award, index) => (
        <div
          key={index}
          className={`relative bg-white rounded-2xl shadow-2xl p-8 border border-indigo-700 flex items-center gap-8 transform transition-all duration-700 hover:scale-105 hover:shadow-3xl ${
            index % 2 === 0
              ? "animate-slideInLeft"
              : "animate-slideInRight"
          }`}
        >
          {/* Award Image */}
          <div className="w-40 h-40 flex-shrink-0 bg-slate-100 rounded-xl overflow-hidden shadow-inner">
            <img
              src={award.image}
              alt={award.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Award Content */}
          <div>
            <span className="inline-block px-4 py-1 text-sm font-medium bg-indigo-100 text-indigo-800 rounded-full mb-4">
              {award.year}
            </span>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              {award.title}
            </h3>
            <p className="text-slate-600 mb-4">{award.description}</p>
            <p className="text-sm text-slate-500 flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {award.location}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
{/* Awards Section */}
<section
  id="awards"
  className="py-24 px-6 bg-gradient-to-br from-indigo-950 via-blue-250 to-indigo-130 relative overflow-hidden"
>
  {/* Glow background */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.2),transparent_60%)]"></div>

  <div className="container mx-auto max-w-6xl relative z-10">
    <div className="text-center mb-16">
      <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">
        <img
          src="/awardpic1.png"
          alt="Awards"
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
        Awards & Recognition
      </h2>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
      {[
        {
          year: "2018",
          title: "PrafullaDhanukar Art Foundation Delhi City Merit Certificate Award",
          location: "Delhi",
          image: "/awards/award1.jpg",
        },
        {
          year: "2017",
          title: "PrafullaDhanukar Art Foundation Delhi City Award",
          location: "Delhi",
          image: "/awards/award2.jpg",
        },
        {
          year: "2017",
          title: "Young Artist Scholarship Award",
          organization: "Ministry of Culture, Government of India",
          location: "Delhi",
          image: "/awards/award3.jpg",
        },
        {
          year: "2017",
          title: "83rd All India Exhibition of Arts",
          location: "Amritsar, Punjab",
          image: "/awards/award4.jpg",
        },
        {
          year: "2017",
          title: "27 Art Point, All India 3rd Online Art Competition",
          location: "Jodhpur",
          image: "/awards/27artpoint.jpg",
        },
        {
          year: "2016",
          title: "Appreciating Your Art Award",
          organization: "Allahabad University",
          location: "Allahabad, UP",
          image: "/awards/award6.jpg",
        },
      ].map((award, index) => (
        <Card
          key={index}
          className="p-6 bg- bg-gradient-to-br from-slate-150 via-blue-50 to-indigo-130 relative overflow-hidden rounded-xl 
                     shadow-lg transform transition-transform duration-500 
                     hover:rotate-y-6 hover:-rotate-x-3 hover:scale-105 
                     hover:shadow-2xl hover:shadow-blue-200/40"
        >
          <div className="w-full h-36 mb-4 rounded-lg overflow-hidden transform transition-all duration-500 hover:scale-110">
            <img
              src={award.image}
              alt={award.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-start gap-4">
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-800 border-blue-200 shadow-sm"
            >
              {award.year}
            </Badge>
            <div className="flex-1">
              <h3 className="font-semibold mb-2 leading-tight text-slate-900 hover:text-blue-600 transition-colors">
                {award.title}
              </h3>
              {award.organization && (
                <p className="text-sm text-slate-600 mb-1">{award.organization}</p>
              )}
              <p className="text-sm text-slate-500 flex items-center gap-1">
                <MapPin className="h-3 w-3 text-blue-500" />
                {award.location}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
</section>

{/* Gallery Section */}
<section id="gallery" className="py-24 px-6 bg-slate-200 relative overflow-hidden">
  <div className="container mx-auto max-w-6xl">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
        Sculptural Works
      </h2>
      <p className="mt-4 text-lg text-slate-600">
        A curated selection of my sculptures, blending traditional and contemporary forms.
      </p>
    </div>

    {/* Responsive Masonry Grid */}
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-3">
      {[
                { src: "/gallery/ram1.jpg", alt: "Mixed Media Installation" },

        { src: "/gallery/buddha.png", alt: "Abstract Modern Sculpture" },
        
        
       
        { src: "/gallery/ganeshtemp.jpeg", alt: "Organic Clay Form" },
        { src: "/gallery/horse.jpg", alt: "Stone Sculpture – Human Form" },
        { src: "/gallery/buddha1.jpg", alt: "Architectural Sculpture" },
        { src: "/gallery/ladypot.jpg", alt: "Textured Carved Stone" },
        { src: "/gallery/sardar.jpg", alt: "Dynamic Flowing Sculpture" },
        { src: "/gallery/swamiviveka.jpg", alt: "Conceptual Modern Piece" },
         { src: "/gallery/gardentable.jpeg", alt: "Minimalist Geometric Sculpture" },
      ].map((item, index) => (
        <div
          key={index}
          className="relative group overflow-hidden rounded-xl shadow-lg border border-slate-200 break-inside-avoid"
        >
          <img
            src={item.src}
            alt={item.alt}
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-500">
            <p className="text-white text-lg font-semibold px-4 text-center">{item.alt}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="w-32 h-32 mx-auto mb-8 bg-blue-100 rounded-full overflow-hidden">
            <img src="/artist-studio-workspace-sculpture-tools-contact.jpg" alt="Contact" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-balance text-slate-900">Get In Touch</h2>
          <p className="text-xl text-slate-600 mb-12 text-pretty">
            Interested in commissioning a piece or learning more about my work? I'd love to hear from you.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-6 text-center bg-white border-slate-200 shadow-lg">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full overflow-hidden">
                <img src="/custom-sculpture-commission-artwork.jpg" alt="Commissions" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-semibold mb-2 text-slate-900">Commissions</h3>
              <p className="text-sm text-slate-500">Custom sculptural works</p>
            </Card>
            <Card className="p-6 text-center bg-white border-slate-200 shadow-lg">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full overflow-hidden">
                <img src="/art-gallery-exhibition-collaboration.jpg" alt="Exhibitions" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-semibold mb-2 text-slate-900">Exhibitions</h3>
              <p className="text-sm text-slate-500">Gallery collaborations</p>
            </Card>
            <Card className="p-6 text-center bg-white border-slate-200 shadow-lg">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full overflow-hidden">
                <img src="/sculpture-workshop-teaching-art-techniques.jpg" alt="Workshops" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-semibold mb-2 text-slate-900">Workshops</h3>
              <p className="text-sm text-slate-500">Sculpture techniques</p>
            </Card>
          </div>

           <Button
    asChild
    size="lg"
    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg shadow-lg"
  >
    <a href="tel:+919876543210">Contact Me</a>
  </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 px-6 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-22 h-29 bg-blue-100 rounded-full overflow-hidden">
                <img src="/dp.jpg" alt="Rajnish Verma" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-slate-900">Rajnish Verma</h3>
                <p className="text-slate-600">Sculptor & Fine Artist</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-slate-500 mb-2">M.F.A in Sculpture, Jamia Millia Islamia</p>
              <p className="text-sm text-slate-400">© 2024 Rajnish Verma. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
