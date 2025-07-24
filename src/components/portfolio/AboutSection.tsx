import { useEffect, useState } from "react"
import { Download, Award, Coffee, Code } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { getPersonalInfo } from "../../api/portfolio"

export function AboutSection() {
  const [personalInfo, setPersonalInfo] = useState<any>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    console.log("AboutSection component mounted")
    
    const fetchPersonalInfo = async () => {
      try {
        const data = await getPersonalInfo()
        setPersonalInfo(data)
        console.log("Personal info loaded:", data)
      } catch (error) {
        console.error("Error loading personal info:", error)
      }
    }

    fetchPersonalInfo()

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    const element = document.getElementById("about")
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  const handleDownloadResume = () => {
    console.log("Downloading resume")
    // In a real app, this would download the actual resume file
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'John_Doe_Resume.pdf'
    link.click()
  }

  const stats = [
    { icon: Code, label: "Projects Completed", value: "10+" },
    { icon: Award, label: "Years Experience", value: "3" },
    // { icon: Coffee, label: "Cups of Coffee", value: "200+" },
  ]

  if (!personalInfo) {
    return (
      <section id="about" className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-48 mx-auto mb-12"></div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="h-96 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="about" className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative">
              <div className="w-80 h-80 mx-auto rounded-full overflow-hidden shadow-2xl border-4 border-white/20 dark:border-gray-700/50">
                <img
                  src={personalInfo.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <Code size={32} className="text-white" />
              </div>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
              {personalInfo.title}
            </h3>
            
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              {personalInfo.bio.map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              {personalInfo.keySkills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* <Button
              onClick={handleDownloadResume}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Download size={20} className="mr-2" />
              Download Resume
            </Button> */}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-white/20 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <stat.icon size={48} className="mx-auto mb-4 text-blue-600 dark:text-blue-400" />
                <div className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}