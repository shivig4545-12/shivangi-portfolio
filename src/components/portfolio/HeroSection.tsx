import { useEffect, useState } from "react"
import { ChevronDown, Github, Linkedin, Twitter, Mail } from "lucide-react"
import { Button } from "../ui/button"

// Move fullText outside component to prevent re-creation on every render
const FULL_TEXT = "Software Developer"

export function HeroSection() {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    console.log("HeroSection component mounted")

    if (currentIndex < FULL_TEXT.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + FULL_TEXT[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex]) // Remove fullText.length from dependencies

  const scrollToProjects = () => {
    console.log("Scrolling to projects section")
    const element = document.getElementById("projects")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const socialLinks = [
    // { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/shivangi-gupta-32a874222/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:shivig4545@gmail.com", label: "Email" },
  ]

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
  <span className="text-5xl md:text-7xl  font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-fade-in">
             Shivangi Gupta
            </span>

          {/* <h1 className="text-5xl md:text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-fade-in">
            Shivangi Gupta
          </h1> */}
          <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 mt-8 h-12 leading-relaxed">
            <span className="border-r-2 border-blue-600 animate-pulse pr-1">
              {displayText}
            </span>
          </div>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Passionate about building scalable, efficient, and reliable backend systems. 
            I enjoy turning complex business logic into clean, maintainable, and high-performance code.
          </p>

          <div className="flex justify-center space-x-6 mb-12">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300 hover:scale-110"
                aria-label={social.label}
              >
                <social.icon size={24} className="text-gray-700 dark:text-gray-300" />
              </a>
            ))}
          </div>

          <Button
            onClick={scrollToProjects}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            View My Work
          </Button>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-gray-400 dark:text-gray-500" />
        </div>
      </div>
    </section>
  )
}