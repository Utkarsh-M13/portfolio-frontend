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
    date:'May - August 2026',
    title: 'Software Engineer Intern • Virtusa',
    description: "Virtusa was where I got to build something genuinely hard and take it end to end. I created DataFixer-Athena, a data-cleaning engine that takes messy CSV, XLSX, and BigQuery datasets and figures out what's actually wrong with them. Under the hood it runs a harness of 15+ LLM agents on Gemini alongside classic rule-based checks, catching 14 kinds of errors and routing each one by how confident it is in the fix. Something I really cared about was keeping the design clean as it grew, so I put all the Google Cloud pieces behind clear interfaces and let the local and cloud versions evolve on their own without breaking anything that relied on them. I was just as careful about trust: every change gets logged before it's written, versioned, and made reversible, with a review step before anything risky is applied. And to make it something people would actually want to use, I wrapped it in a FastAPI backend and a Next.js dashboard where you can see each proposed fix as a live diff and accept, edit, or reject it, all held together by a suite of 680+ passing tests.",
    technologies:['Python', 'pandas', 'FastAPI', 'NextJS', 'ReactJS', 'TypeScript', 'Gemini', 'BigQuery', 'Vertex AI', 'Google Cloud', 'scikit-learn', 'GitHub Actions'],
    link:'https://www.virtusa.com/'
    },
    {
    date:'May - September 2025',
    title: 'Full Stack Intern • KPMG',
    description: 'I built an invite-only community platform for KPMG with real-time chat, feed-based posts, link-based invites, role-based authentication, and a full admin dashboard. The platform featured a modern React (TypeScript) front end, a secure Express/MongoDB backend, and integrations like Google OAuth, Cloudinary uploads, and SendGrid emails for invites and password resets. I also implemented a custom role-based access control system, allowing granular permissions for different user roles. The platform was designed to scale with KPMG’s growing community needs, ensuring high availability and performance.',
    technologies:['ReactJS', 'TypeScript', 'NodeJS', 'ExpressJS', 'MongoDB', 'Tailwind', 'MUI', 'Cloudinary', 'Docker', 'AWS', 'Figma'],
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
    <div id='Experience' className='w-full h-fit mt-12 lg:mt-24 text-left grid gap-1'>
      <div className='font-medium text-lg text-secondary mb-4'>My Experience</div>
      {cards.map((c, i) => <ExperienceCard link={c.link} date={c.date} title={c.title} description={c.description} technologies={c.technologies} defaultOpen={i === 0} key={c.title}></ExperienceCard>)}
    </div>
  )
}

export default Experience