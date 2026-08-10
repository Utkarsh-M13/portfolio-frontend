import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

type Props = {
  date: string;
  description: string;
  title: string;
  technologies: string[];
  link: string;
  defaultOpen?: boolean;
}

const ExperienceCard = ({date, description, title, technologies, link, defaultOpen} : Props) => {
    const {theme} = useTheme()
    const [expanded, setExpanded] = useState<boolean>(defaultOpen ?? false)
    const toggle = () => setExpanded((e) => !e)

    const style = theme ? 'w-fit sm:w-120 lg:w-[720px] rounded-xl hover:bg-[#F5F5F5]/12.5 px-6 py-4 relative text-secondary transition-colors' : 'w-fit sm:w-120 lg:w-[720px] rounded-xl hover:bg-[#707070]/25 px-6 py-4 relative text-secondary transition-colors'

    const techStyle = theme ? 'w-fit px-2 py-1 bg-[#656161]/50 text-[10px] text-secondary font-light rounded-xl' : 'w-fit px-2 py-1 bg-[#656161]/20 text-[10px] text-secondary font-light rounded-xl'
  return (
    <div className={style}>
      <a href={link} onClick={(e) => e.stopPropagation()} aria-label={`${title} website`} className='absolute right-5 top-4 cursor-pointer'>
        <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M2.91715 9.08278C2.76093 8.92654 2.76093 8.67326 2.91715 8.5171L8.23431 3.1999H4.79999C4.57908 3.1999 4.39999 3.02081 4.39999 2.7999C4.39999 2.57899 4.57908 2.3999 4.79999 2.3999H9.19999C9.30607 2.3999 9.40783 2.44205 9.48287 2.51706C9.55783 2.59208 9.59999 2.69381 9.59999 2.7999V7.19991C9.59999 7.42082 9.42087 7.59991 9.19999 7.59991C8.97911 7.59991 8.79999 7.42082 8.79999 7.19991V3.76559L3.48283 9.08278C3.32662 9.23894 3.07336 9.23894 2.91715 9.08278Z" fill="currentColor"/>
        </svg>
      </a>

      <button
        type="button"
        onClick={toggle}
        aria-expanded={expanded}
        className='w-full flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-8 text-left cursor-pointer pr-8'
      >
        <span className='font-light text-sm lg:w-32 lg:shrink-0'>{date}</span>
        <span className='font-medium text-md flex items-center gap-2 flex-1'>
          {title}
          <svg
            className={`shrink-0 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#E036F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </span>
      </button>

      <div className={`grid transition-all duration-300 ease-out ${expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className='overflow-hidden'>
          <div className='font-light text-sm pt-4 lg:pl-40'>
            {description}
          </div>
          <div className='flex flex-wrap gap-2 w-full h-fit pt-4 lg:pl-40'>
            {
              technologies.map((t) => <span className={techStyle} key={t}>{t}</span>)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExperienceCard
