import { useEffect, useState } from "react"
import { Progress } from "../ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { getSkills } from "../../api/portfolio"

export function SkillsSection() {
  const [skills, setSkills] = useState<any>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [animatedSkills, setAnimatedSkills] = useState<{[key: string]: number}>({})

  useEffect(() => {
    console.log("SkillsSection component mounted")
    
    const fetchSkills = async () => {
      try {
        const data = await getSkills()
        setSkills(data)
        console.log("Skills loaded:", data)
      } catch (error) {
        console.error("Error loading skills:", error)
      }
    }

    fetchSkills()

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    const element = document.getElementById("skills")
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible && skills) {
      // Animate skill bars
      skills.categories.forEach((category: any) => {
        category.skills.forEach((skill: any) => {
          setTimeout(() => {
            setAnimatedSkills(prev => ({
              ...prev,
              [skill.name]: skill.level
            }))
          }, Math.random() * 1000)
        })
      })
    }
  }, [isVisible, skills])

  if (!skills) {
    return (
      <section id="skills" className="py-20">
        <div className="container mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-48 mx-auto mb-12"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Skills & Technologies
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.categories.map((category: any, categoryIndex: number) => (
            <Card 
              key={categoryIndex}
              className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-white/20 dark:border-gray-700/50 hover:shadow-lg transition-all duration-500 hover:scale-105 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${categoryIndex * 200}ms` }}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                    <category.icon size={24} className="text-white" />
                  </div>
                  <span className="text-gray-800 dark:text-gray-200">{category.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.skills.map((skill: any, skillIndex: number) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <Progress 
                      value={animatedSkills[skill.name] || 0} 
                      className="h-2"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-8 text-gray-800 dark:text-gray-200">
            Technologies I Work With
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.technologies.map((tech: any, index: number) => (
              <div
                key={index}
                className={`group p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg border border-white/20 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 hover:scale-110 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <tech.icon size={32} className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
                <div className="mt-2 text-xs font-medium text-gray-600 dark:text-gray-400">
                  {tech.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}