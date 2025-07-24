import api from './api';
import { Code, Database, Globe, Smartphone, Server, Palette } from 'lucide-react';

// Description: Get personal information for the about section
// Endpoint: GET /api/portfolio/personal-info
// Request: {}
//https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face
// Response: { profileImage: string, title: string, bio: string[], keySkills: string[] }
export const getPersonalInfo = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        profileImage: "/shivangi-gupta.jpeg",
        title: "Passionate Software Developer",
        bio: [
          "I'm a backend-focused software developer with over 3 years of experience building scalable, secure, and high-performance web applications and APIs. I specialize in technologies like Node.js, Express, PostgreSQL and MongoDB.I have worked on projects including a POS system using Clover, an e-commerce platform, an admin panel, a Pandit and user enrollment system for an app. I developed APIs for authentication and authorization, covering sign-up, login, password reset, and forgot password flows. I also implemented features to send invitations via email and SMS, and integrated payment systems using Cashfree and Clover. Additionally, I handled Google Maps integration, backend geolocation, nearest location detection, product catalog management, and role-based access control. , ",
        
          "My journey in tech began with a curiosity about how systems work, which grew into a passion for solving real-world problems through clean and efficient backend architectures. I focus on creating robust, maintainable systems that perform well under scale.",
        
          "When I'm not coding, you'll find me exploring new technologies, enjoying a good coffee while reading up on software architecture. I believe in continuous learning and love collaborating with teams to bring impactful ideas to life."
        ],
        keySkills: [
          "Node.js", "Express",
          "TypeScript", "JavaScript",
          "PostgreSQL", "MongoDB",
           "Git",,
         
        ]        
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/portfolio/personal-info');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
};

// Description: Get skills and technologies data
// Endpoint: GET /api/portfolio/skills
// Request: {}
// Response: { categories: Array<{ name: string, icon: any, skills: Array<{ name: string, level: number }> }>, technologies: Array<{ name: string, icon: any }> }
export const getSkills = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        categories: [
          {
            name: "Frontend",
            icon: Globe,
            skills: [
              { name: "React", level: 50 },
              { name: "JavaScript", level: 90 },
              { name: "Tailwind CSS", level: 20 }
            ]
          },
          {
            name: "Backend",
            icon: Server,
            skills: [
              { name: "Node.js", level: 95 },
              { name: "Express.js", level: 95 },
            ]
          },
          {
            name: "Database",
            icon: Database,
            skills: [
              { name: "Redis", level: 95 },
              { name: "PostgreSQL", level: 90 },
              { name: "MongoDB", level: 85 }
            ]
          }
        ],
        technologies: [
          { name: "Node.js", icon: Server },
          { name: "Express", icon: Server },
          { name: "TypeScript", icon: Code },
          { name: "JavaScript", icon: Code },
          { name: "PostgreSQL", icon: Database },
          { name: "MongoDB", icon: Database },
          { name: "Git", icon: Code },
          { name: "API Security", icon: Globe },
        ]        
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/portfolio/skills');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
};

// Description: Get projects data
// Endpoint: GET /api/portfolio/projects
// Request: {}
// Response: { projects: Array<{ id: string, title: string, description: string, fullDescription: string, image: string, category: string, technologies: string[], liveUrl: string, githubUrl: string, features: string[] }>, categories: string[] }
export const getProjects = async () => {
  const response = await fetch('/projects.json')
  if (!response.ok) throw new Error('Failed to fetch projects data')
  return await response.json()
}

// Description: Submit contact form
// Endpoint: POST /api/portfolio/contact
// Request: { name: string, email: string, subject: string, message: string }
// Response: { success: boolean, message: string }
export const submitContactForm = (data: { name: string; email: string; subject: string; message: string }) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Message sent successfully! I will get back to you soon.'
      });
    }, 1000);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/portfolio/contact', data);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
};