import React from "react"

export function EducationSection() {
  // Sample education data
  const education = [
    {
      degree: "Bachelor in Computer science and engineering",
      institution: "Babu Banarasi Das Engineering College (AKTU)",
      details: [
        "Relevant Coursework: Data Structures, Algorithms, Web Development, Databases",
      ]
    },
  ]

  return (
    <section id="education" className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Education
        </h2>
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {education.map((edu, idx) => (
            <div key={idx} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-white/20 dark:border-gray-700/50 rounded-lg shadow-lg p-8 transition-all duration-300 hover:scale-105">
              <h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-200">{edu.degree}</h3>
              <div className="text-lg text-blue-700 dark:text-blue-300 mb-1">{edu.institution}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">{edu.year}</div>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                {edu.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 