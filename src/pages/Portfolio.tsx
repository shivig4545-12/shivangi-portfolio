import { useEffect, useState } from "react"
import { Navigation } from "../components/portfolio/Navigation"
import { HeroSection } from "../components/portfolio/HeroSection"
import { AboutSection } from "../components/portfolio/AboutSection"
import { SkillsSection } from "../components/portfolio/SkillsSection"
import { ProjectsSection } from "../components/portfolio/ProjectsSection"
import { EducationSection } from "../components/portfolio/EducationSection"
import { ContactSection } from "../components/portfolio/ContactSection"
import { BackgroundElements } from "../components/portfolio/BackgroundElements"

export function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    console.log("Portfolio component mounted")
    
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "education", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <BackgroundElements />
      <Navigation activeSection={activeSection} />
      
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
      </main>
    </div>
  )
}