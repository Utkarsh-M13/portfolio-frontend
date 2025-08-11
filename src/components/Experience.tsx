import React from 'react'
import ExperienceCard from './ExperienceCard'
type Card = {
  date: string;
  description: string;
  title: string;
  technologies: string[];
}

const Experience = () => {
  const cards : Card[] = [{
    date:'May - August 2025',
    title: 'Full Stack Intern • KPMG',
    description: 'I engineered an invite-only community platform for KPMG, delivering real-time chat “spaces,” feed-based spaces for posts/comments/likes, role-based admin controls, and robust auth. I designed the MongoDB schema , built REST APIs in Express, implemented JWT + Google OAuth, added file uploads to Cloudinary via Multer, and shipped a polished React (TypeScript) front end with Tailwind/MUI, protected routes, dark mode, and global 401 handling. Deployed as a SPA.',
    technologies:['ReactJS', 'NextJS', 'JavaScript', 'TypeScript', 'ExpressJS', 'NodeJS', 'Tailwind', 'MongoDB']
    },
    {
    date:'May - August 2024',
    title: 'Front End Intern • Jio',
    description: 'As an SWE Intern on Jio’s Internal Tools team, I designed and developed front-end prototypes for internal apps using React/Next.js, Tailwind CSS, and MUI. I led the Jio IP Search UI migration from .NET to Next.js, optimizing rendering and data-fetch patterns to cut load times by ~50%. I also implemented and integrated REST APIs to a Spring Boot backend, defining JSON contracts, pagination/filter params, and robust error handling.',
    technologies:['ReactJS', 'NextJS', 'JavaScript', 'TypeScript', 'Tailwind']
    },
    {
    date:'June - July 2022',
    title: 'Cybersecurity Intern • RAKBANK',
    description: 'As a Cybersecurity Intern at RAKBANK, I ran vulnerability assessments on target devices—using Nmap and Burp Suite to map ports, surface exploitable scripts, and prioritize risks—then delivered a detailed remediation report. In a controlled test environment, I researched and implemented defenses against common web attacks (XSS, CSRF), validated the fixes, and documented clear steps to harden services for the security team.',
    technologies:['Linux', 'Nmap', 'Burpsuite', 'Postman', 'DOM']
    }
  ]

  return (
    <div id='Experience' className='w-full h-fit mt-12 lg:mt-24 text-left grid gap-4'>
      <div className='font-medium text-lg text-secondary mb-4'>My Experience</div>
      {cards.map((c) => <ExperienceCard date={c.date} title={c.title} description={c.description} technologies={c.technologies} key={c.title}></ExperienceCard>)}
    </div>
  )
}

export default Experience