import { useTheme } from "../context/ThemeContext";

type Props = {
  date: string;
  description: string;
  title: string;
  technologies: string[];
  link:string;
}

const ExperienceCard = ({date, description, title, technologies, link} : Props) => {
    const {theme} = useTheme()
    const style = theme ? 'w-fit sm:w-120 lg:w-[720px] min-h-[200px] rounded-xl flex flex-col-reverse lg:flex-row gap-8 hover:bg-[#F5F5F5]/12.5 px-6 py-3 relative text-secondary' : 'w-fit sm:w-120 lg:w-[720px] min-h-[200px] rounded-xl flex flex-col-reverse lg:flex-row gap-8 hover:bg-[#707070]/25 px-6 py-3 relative text-secondary'

    const techStyle = theme ? 'w-fit px-2 py-1 bg-[#656161]/50 text-[10px] text-secondary font-light rounded-xl' : 'w-fit px-2 py-1 bg-[#656161]/20 text-[10px] text-secondary font-light rounded-xl'
  return (
    <div className={style}>
      <div className='font-light text-sm'>{date}</div>
      <div className='flex flex-col w-fit lg:w-120'>
        <div className='font-medium text-md align-text-top flex items-end gap-1 hover:underline decoration-1 cursor-pointer'><a href={link}>{title}</a>
          <svg className='mb-1' width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M2.91715 9.08278C2.76093 8.92654 2.76093 8.67326 2.91715 8.5171L8.23431 3.1999H4.79999C4.57908 3.1999 4.39999 3.02081 4.39999 2.7999C4.39999 2.57899 4.57908 2.3999 4.79999 2.3999H9.19999C9.30607 2.3999 9.40783 2.44205 9.48287 2.51706C9.55783 2.59208 9.59999 2.69381 9.59999 2.7999V7.19991C9.59999 7.42082 9.42087 7.59991 9.19999 7.59991C8.97911 7.59991 8.79999 7.42082 8.79999 7.19991V3.76559L3.48283 9.08278C3.32662 9.23894 3.07336 9.23894 2.91715 9.08278Z" fill="currentColor"/>
          </svg>
        </div>
        <div className='font-light text-sm min-h-[140px] mt-2'>
         {description}
        </div>
        <div className='flex flex-wrap gap-2 w-full h-fit mt-4'>
          {
            technologies.map((t) => <span className={techStyle} key={t}>{t}</span>)
          }
        </div>
      </div>
    </div>
  )
}

export default ExperienceCard