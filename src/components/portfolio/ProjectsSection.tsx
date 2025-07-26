import { useEffect, useState } from "react"
import { ExternalLink, Github, Filter } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { getProjects } from "../../api/portfolio"

export function ProjectsSection() {
  const [projects, setProjects] = useState<any>(null)
  const [filteredProjects, setFilteredProjects] = useState<any[]>([])
  const [selectedFilter, setSelectedFilter] = useState("Web App")
  const [isVisible, setIsVisible] = useState(false)
  const [hasDefaultFilterApplied, setHasDefaultFilterApplied] = useState(false);

  useEffect(() => {
    console.log("ProjectsSection component mounted")

    const fetchProjects = async () => {
      try {
        const data = await getProjects()
        setProjects(data)
        setFilteredProjects(data.projects)
        console.log("Projects loaded:", data)
      } catch (error) {
        console.error("Error loading projects:", error)
      }
    }

    fetchProjects()

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    const element = document.getElementById("projects")
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

// New useEffect to auto-select 'Web App' after projects are loaded
  useEffect(() => {
    if (projects && projects.categories && !hasDefaultFilterApplied) {
      handleFilterChange('Web App');
      setHasDefaultFilterApplied(true);
    }
  }, [projects, hasDefaultFilterApplied]);

  const handleFilterChange = (filter: string) => {
    console.log(`Filtering projects by: ${filter}`)
    setSelectedFilter(filter)
    if (filter === "All") {
      setFilteredProjects(projects.projects)
    } else {
      setFilteredProjects(projects.projects.filter((project: any) => {
        if (Array.isArray(project.category)) {
          return project.category.includes(filter)
        } else {
          return project.category === filter
        }
      }))
    }
  }

  if (!projects) {
    return (
      <section id="projects" className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-48 mx-auto mb-12"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    // <section id="projects" className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
    //   <div className="container mx-auto px-6">
    //     <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
    //       Featured Projects
    //     </h2>

    //     {/* Filter Buttons */}
    //     <div className="flex flex-wrap justify-center gap-4 mb-12">
    //       {projects.categories.map((category: string, index: number) => (
    //         <Button
    //           key={index}
    //           variant={selectedFilter === category ? "default" : "outline"}
    //           onClick={() => handleFilterChange(category)}
    //           className={`rounded-full ${
    //             selectedFilter === category
    //               ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
    //               : "bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-white/20 dark:border-gray-700/50"
    //           }`}
    //         >
    //           <Filter size={16} className="mr-2" />
    //           {category}
    //         </Button>
    //       ))}
    //     </div>

    //     {/* Projects Grid */}
    //     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    //       {filteredProjects.map((project: any, index: number) => (
    //         <Card
    //           key={project.id}
    //           className={`group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-white/20 dark:border-gray-700/50 hover:shadow-xl transition-all duration-500 hover:scale-105 overflow-hidden ${
    //             isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    //           }`}
    //           style={{ transitionDelay: `${index * 200}ms` }}
    //         >
    //           <div className="relative overflow-hidden">
    //             <img
    //               src={project.image}
    //               alt={project.title}
    //               className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
    //             />
    //             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    //             <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    //               {Array.isArray(project.category) ? (
    //                 project.category.map((cat: string, i: number) => (
    //                   <Badge key={i} className="bg-white/90 text-gray-800 mr-1">
    //                     {cat}
    //                   </Badge>
    //                 ))
    //               ) : (
    //                 <Badge className="bg-white/90 text-gray-800">
    //                   {project.category}
    //                 </Badge>
    //               )}
    //             </div>
    //           </div>

    //           <CardHeader>
    //             <CardTitle className="text-gray-800 dark:text-gray-200">
    //               {project.title}
    //             </CardTitle>
    //           </CardHeader>

    //           <CardContent className="space-y-4">
    //             <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
    //               {project.description}
    //             </p>

    //             <div className="flex flex-wrap gap-2">
    //               {project.technologies.map((tech: string, techIndex: number) => (
    //                 <Badge
    //                   key={techIndex}
    //                   variant="secondary"
    //                   className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-300"
    //                 >
    //                   {tech}
    //                 </Badge>
    //               ))}
    //             </div>

    //             <div className="flex space-x-3 pt-4">
    //               {((Array.isArray(project.category) && !project.category.includes("API") && !project.category.includes("Web-Scraping")) || (!Array.isArray(project.category) && project.category !== "API" && project.category !== "Web-Scraping")) && (
    //                 <Button
    //                   size="sm"
    //                   className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
    //                   onClick={() => window.open(project.liveUrl, '_blank')}
    //                 >
    //                   <ExternalLink size={16} className="mr-2" />
    //                   Live Demo
    //                 </Button>
    //               )}
    //               {project?.personal !== false && (
    //                 <Button
    //                   size="sm"
    //                   variant="outline"
    //                   className="flex-1 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-white/20 dark:border-gray-700/50"
    //                   onClick={() => window.open(project.githubUrl, '_blank')}
    //                 >
    //                   <Github size={16} className="mr-2" />
    //                   Code
    //                 </Button>
    //               )}
    //             </div>

    //             <Dialog>
    //               <DialogTrigger asChild>
    //                 <Button variant="ghost" className="w-full mt-2 text-blue-600 dark:text-blue-400">
    //                   View Details
    //                 </Button>
    //               </DialogTrigger>
    //               <DialogContent className="max-w-2xl bg-white dark:bg-gray-800 max-h-[80vh] overflow-y-auto">
    //                 <DialogHeader>
    //                   <DialogTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200">
    //                     {project.title}
    //                   </DialogTitle>
    //                 </DialogHeader>
    //                 <div className="space-y-4">
    //                   <img
    //                     src={project.image}
    //                     alt={project.title}
    //                     className="w-full h-64 object-cover rounded-lg"
    //                   />
    //                   <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
    //                     {project.fullDescription}
    //                   </p>
    //                   <div className="space-y-2">
    //                     <h4 className="font-semibold text-gray-800 dark:text-gray-200">Key Features:</h4>
    //                     <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
    //                       {project.features.map((feature: string, featureIndex: number) => (
    //                         <li key={featureIndex}>{feature}</li>
    //                       ))}
    //                     </ul>
    //                   </div>
    //                 </div>
    //               </DialogContent>
    //             </Dialog>
    //           </CardContent>
    //         </Card>
    //       ))}
    //     </div>
    //   </div>
    // </section>
    <section
  id="projects"
  className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
>
  <div className="container mx-auto px-6">
    <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in-up">
      Featured Projects
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {
      // [
      //   {
      //     title: "Catalog Product Project",
      //     details: [
      //       "Worked on a Node.js-based web app for user authentication, user management, translation management, and notifications.",
      //       "Contributed to clean code, modular design, testing, and delivery under senior mentorship.",
      //     ],
      //   },
      //    {
      //     title: "Clover POS Integration Project",
      //     details: [
      //       "Integrated Clover APIs for merchant onboarding, order/payment, and menu sync.",
      //       "Built full auth system: login, signup, reset password, logout with JWT.",
      //       "Sent OTPs via Nodemailer and SMS via Twilio with webhook-based payment flow.",
      //     ],
      //   },
      //   {
      //     title: "Tej Project",
      //     details: [
      //       "Built a full-stack React.js + Node.js application with authentication, campaign creation, and location-based services.",
      //       "Developed payment integration and campaign logic under mentorship.",
      //     ],
      //   },
      //   {
      //     title: "HRMS Project",
      //     details: [
      //       "Built an HRMS in React.js, Tailwind CSS, and Material UI for attendance and approval tracking.",
      //       "Implemented department-based filters and contributed to UI/UX.",
      //     ],
      //   },
      //   {
      //     title: "Tradnix Project",
      //     details: [
      //       "Improved e-commerce UX by integrating Twilio API for WhatsApp invoices.",
      //       "Used Nodemailer for dynamic email notifications on orders and promotions.",
      //     ],
      //   },
      //   {
      //     title: "Klimart Project",
      //     details: [
      //       "Created a real-estate inventory system using Node.js and React.js.",
      //       "Streamlined building info, contractor management, and inventory tracking.",
      //     ],
      //   },
      //   {
      //     title: "Rolling Notes Project",
      //     details: [
      //       "Built a modular React app for ads, institutes, notes, footer, and dynamic headers.",
      //       "Integrated PDF viewer with modals and tags for rich reading experience.",
      //     ],
      //   }   
      // ]
      [
  {
    title: "Clover POS Integration Project",
    details: [
      "Built OAuth onboarding flow: connect, callback, and merchant sync.",
      "Fetched and synced merchant items, menus, and restaurant orders.",
      "Implemented order payment system using Clover’s Payments API.",
    ],
  },
  {
    title: "Catalog Product Project",
    details: [
      "Developed Node.js modules for user auth, translation, and notifications.",
      "Contributed to backend user and role management workflows.",
      "Wrote unit-tested code and collaborated with senior devs to meet deadlines.",
    ],
  },
  {
    title: "Tej Project",
    details: [
      "Built React + Node.js platform with user login and location-aware services.",
      "Created campaign module with payments using third-party APIs.",
      "Followed agile practices under guidance to ensure scalable delivery.",
    ],
  },
]

      
      .map((project, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6 transform transition duration-500 hover:scale-105 animate-fade-in-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-purple-400">
            {project.title}
          </h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm space-y-1">
            {project.details.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
</section>

  )
}

// Placeholder for EducationSection import and usage
// import { EducationSection } from "./EducationSection"
// <EducationSection />