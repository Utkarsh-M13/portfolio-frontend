import ExperienceCard from './ExperienceCard'
type Card = {
  date: string;
  description: string;
  title: string;
  technologies: string[];
  link: string
}

const Experience = () => {
  const cards : Card[] = [{
    date:'May - August 2025',
    title: 'Full Stack Intern • KPMG',
    description: 'I built an invite-only community platform for KPMG with real-time chat, feed-based posts, link-based invites, role-based authentication, and a full admin dashboard. The platform featured a modern React (TypeScript) front end, a secure Express/MongoDB backend, and integrations like Google OAuth, Cloudinary uploads, and SendGrid emails for invites and password resets. I also implemented a custom role-based access control system, allowing granular permissions for different user roles. The platform was designed to scale with KPMG’s growing community needs, ensuring high availability and performance.',
    technologies:['ReactJS', 'NextJS', 'JavaScript', 'TypeScript', 'ExpressJS', 'NodeJS', 'Tailwind', 'MongoDB'],
    link:'https://kpmg.com/xx/en.html'
    },
    {
    date:'May - August 2024',
    title: 'Front End Intern • Jio',
    description: 'As an SWE Intern on Jio’s Internal Tools team, I designed and developed front-end prototypes for internal apps using React/Next.js, Tailwind CSS, and MUI. I led the Jio IP Search UI migration from .NET to Next.js, optimizing rendering and data-fetch patterns to cut load times by ~50%. I also implemented and integrated REST APIs to a Spring Boot backend, defining JSON contracts, pagination/filter params, and robust error handling.',
    technologies:['ReactJS', 'NextJS', 'JavaScript', 'TypeScript', 'Tailwind'],
    link:'https://www.jio.com/'
    },
    {
    date:'June - July 2022',
    title: 'Cybersecurity Intern • RAKBANK',
    description: 'As a Cybersecurity Intern at RAKBANK, I ran vulnerability assessments on target devices—using Nmap and Burp Suite to map ports, surface exploitable scripts, and prioritize risks—then delivered a detailed remediation report. In a controlled test environment, I researched and implemented defenses against common web attacks (XSS, CSRF), validated the fixes, and documented clear steps to harden services for the security team.',
    technologies:['Linux', 'Nmap', 'Burpsuite', 'Postman', 'DOM'],
    link:'https://www.rakbank.ae/'
    }
  ]

  return (
    <div id='Experience' className='w-full h-fit mt-12 lg:mt-24 text-left grid lg:gap-4'>
      <div className='font-medium text-lg text-secondary mb-4'>My Experience</div>
      {cards.map((c) => <ExperienceCard link={c.link} date={c.date} title={c.title} description={c.description} technologies={c.technologies} key={c.title}></ExperienceCard>)}
    </div>
  )
}

export default Experience