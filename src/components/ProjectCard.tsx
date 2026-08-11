import { useTheme } from "../context/ThemeContext"

type Props = {
  title: string,
  description: string,
  src: string,
  technologies: string[],
  comingSoon?: boolean,
  onClick?: () => void,
}

const ProjectCard = ({title, description, src, technologies, comingSoon, onClick} : Props) => {
  const {theme} = useTheme()
  const style = theme ? 'w-[300px] shrink-0 rounded-xl flex flex-col gap-3 hover:bg-[#F5F5F5]/12.5 p-4 text-secondary text-left transition-colors cursor-pointer select-none' : 'w-[300px] shrink-0 rounded-xl flex flex-col gap-3 hover:bg-[#707070]/25 p-4 text-secondary text-left transition-colors cursor-pointer select-none'

  const techStyle = theme ? 'w-fit px-2 py-1 bg-[#656161]/50 text-[10px] text-secondary font-light rounded-xl' : 'w-fit px-2 py-1 bg-[#656161]/20 text-[10px] text-secondary font-light rounded-xl'

  return (
    <button type="button" onClick={onClick} className={style}>
      <div className='relative w-full'>
        <img className='rounded-lg w-full h-[150px] object-cover object-top bg-black/20 pointer-events-none' src={src} alt={`${title} screenshot`} draggable={false} />
        {comingSoon && <span className='absolute top-2 left-2 px-2 py-0.5 text-[10px] rounded-md bg-black/60 text-white'>Coming soon</span>}
      </div>

      <div className='font-medium text-md flex items-center gap-1'>
        <span className='truncate'>{title}</span>
        <svg className='ml-auto shrink-0 opacity-60' width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
        </svg>
      </div>

      <div className='font-light text-sm line-clamp-3'>
        {description}
      </div>

      <div className='flex flex-wrap gap-1.5 mt-auto'>
        {technologies.slice(0, 6).map((t) => <span className={techStyle} key={t}>{t}</span>)}
        {technologies.length > 6 && <span className={techStyle}>+{technologies.length - 6}</span>}
      </div>
    </button>
  )
}

export default ProjectCard
