
type Props = {
  title: string,
  description: string,
  link: string,
  github: string,
  src: string,
  technologies: string[]
}

const ProjectCard = ({title, description, link, github, src, technologies} : Props) => {

  return (
    <div className='w-fit sm:w-120 lg:w-[720px] min-h-[200px] rounded-xl flex flex-col-reverse lg:flex-row gap-8 hover:bg-[#F5F5F5]/12.5 px-6 py-3 relative'>
      <div className='font-light text-sm pt-2'><img width={144} src={src} alt="" /></div>
      <div className='flex flex-col w-fit lg:w-120'>
        <div className='font-medium text-md align-text-top flex items-end gap-1 hover:underline decoration-1 cursor-pointer'><a href={link}>{title}</a>
          <svg className='mb-1' width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M2.91715 9.08278C2.76093 8.92654 2.76093 8.67326 2.91715 8.5171L8.23431 3.1999H4.79999C4.57908 3.1999 4.39999 3.02081 4.39999 2.7999C4.39999 2.57899 4.57908 2.3999 4.79999 2.3999H9.19999C9.30607 2.3999 9.40783 2.44205 9.48287 2.51706C9.55783 2.59208 9.59999 2.69381 9.59999 2.7999V7.19991C9.59999 7.42082 9.42087 7.59991 9.19999 7.59991C8.97911 7.59991 8.79999 7.42082 8.79999 7.19991V3.76559L3.48283 9.08278C3.32662 9.23894 3.07336 9.23894 2.91715 9.08278Z" fill="currentColor"/>
          </svg>
        </div>
        <a href={github}>
          <svg className='absolute right-3 top-3 cursor-pointer' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_53_560)">
          <path d="M10 18.3332C14.6024 18.3332 18.3334 14.6022 18.3334 9.99984C18.3334 5.39746 14.6024 1.6665 10 1.6665C5.39764 1.6665 1.66669 5.39746 1.66669 9.99984C1.66669 14.6022 5.39764 18.3332 10 18.3332Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11.9444 15.8333V14.2808C11.9652 14.0229 11.9295 13.7636 11.8394 13.5202C11.7494 13.2767 11.6072 13.0547 11.4222 12.869C13.1667 12.6797 15 12.0359 15 9.08242C14.9998 8.32713 14.7015 7.60084 14.1667 7.05384C14.4199 6.39309 14.402 5.66273 14.1167 5.01449C14.1167 5.01449 13.4611 4.82517 11.9444 5.81509C10.6711 5.47907 9.32891 5.47907 8.05554 5.81509C6.53887 4.82517 5.88331 5.01449 5.88331 5.01449C5.59796 5.66273 5.58006 6.39309 5.83331 7.05384C5.2945 7.6049 4.99583 8.33775 4.99998 9.09858C4.99998 12.0305 6.83331 12.6743 8.57774 12.8852C8.39499 13.0691 8.25401 13.2884 8.16404 13.5289C8.07406 13.7693 8.0371 14.0255 8.05554 14.2808V15.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.05558 14.7515C6.38891 15.2779 5.00002 14.7515 4.16669 13.1287" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
          <defs>
          <clipPath id="clip0_53_560">
          <rect width="20" height="20" fill="currentColor"/>
          </clipPath>
          </defs>
          </svg>
        </a>

        <div className='font-light text-sm min-h-[140px] mt-2'>
         {description}
        </div>
        <div className='flex flex-wrap gap-2 w-full h-fit mt-4'>
          {
            technologies.map((t) => <span className='w-fit px-2 py-1 bg-[#656161]/50 text-[10px] text-secondary font-light rounded-xl' key={t}>{t}</span>)
          }
        </div>
      </div>
    </div>
  )
}

export default ProjectCard