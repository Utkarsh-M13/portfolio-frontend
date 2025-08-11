import { useEffect, useRef, useState } from 'react'
import Music from './Music'
import { useScroll } from '../context/ScrollContext';

type Props = {
  scrolled: boolean,
}

const Topbar = ({scrolled} : Props) => {
  const [music, setMusic] = useState<boolean>(false)
  const musicRef = useRef<HTMLDivElement | null>(null);
  const nonHighlight = 'cursor-pointer hover:bg-gradient hover:bg-clip-text hover:text-transparent transition-all duration-200 ease-linear'
  const highlight = 'cursor-pointer bg-gradient bg-clip-text text-transparent transition-all duration-100'
  const scrolledStyle = 'fixed w-full h-[96px] hidden lg:flex bg-[rgba(16,16,16, 0.9)] top-0 left-0 items-center justify-between z-50'
  const nonScrolledStyle = 'fixed w-full h-[96px] hidden lg:flex bg-[rgba(16,16,16,0.5)] top-0 left-0 items-center justify-between z-50'
  const {scroll} = useScroll()

  const handleAboutClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProjectClick = () => {
    const target = document.getElementById("Projects");
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleExperienceClick = () => {
    const target = document.getElementById("Experience");
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {

      const handleClickOutside = (event: MouseEvent) => {
        if (musicRef.current && !musicRef.current.contains(event.target as Node)) {
          setMusic(false)
        }
      }
      
  
      if (music) {
        document.addEventListener('mousedown', handleClickOutside)
      }
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
  
    }, [music])


  return (
    <div className={!scrolled ? scrolledStyle : nonScrolledStyle}>
      <div className='w-[160px] ml-[56px] flex justify-between items-center'>
        <div className='cursor-pointer'>
          <img className='rounded-[12px] w-[64px] h-[64px] border-white border-1' src="/assets/SelfPortrait.svg" alt="" />
        </div>
        <button className={`text-secondary cursor-pointer relative`} disabled={music} onClick={() => {setMusic(true)}}>
          {music && <Music forwardRef={musicRef}></Music>}
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" >
          <path fillRule="evenodd" clipRule="evenodd" d="M35 17.5H32.5V23.7495C31.4555 22.9649 30.157 22.5 28.75 22.5C25.2982 22.5 22.5 25.2983 22.5 28.75C22.5 32.2017 25.2982 35 28.75 35C32.2017 35 35 32.2017 35 28.75V17.5ZM28.75 25C30.821 25 32.5 26.679 32.5 28.75C32.5 30.821 30.821 32.5 28.75 32.5C26.679 32.5 25 30.821 25 28.75C25 26.679 26.679 25 28.75 25Z" fill="white"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M33.672 5.00244L13.672 6.25244L12.5 7.49999V26.2495C11.4554 25.465 10.157 25 8.75 25C5.29822 25 2.5 27.7982 2.5 31.25C2.5 34.7017 5.29822 37.5 8.75 37.5C12.2018 37.5 15 34.7017 15 31.25V16.1743L32.5 15.0806V17.5H35V6.24999L33.672 5.00244ZM32.5 7.58057V12.5757L15 13.6695V8.67432L32.5 7.58057ZM8.75 27.5C10.8211 27.5 12.5 29.179 12.5 31.25C12.5 33.321 10.8211 35 8.75 35C6.67893 35 5 33.321 5 31.25C5 29.179 6.67893 27.5 8.75 27.5Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
      <div className='flex justify-between gap-40 mr-12 items-center'>
        <div className='w-fit text-[20px] text-secondary flex gap-10'>
          <div className={scroll === 0 ? highlight : nonHighlight} onClick={handleAboutClick}>About</div>
          <div className={scroll === 1 ? highlight : nonHighlight} onClick={handleExperienceClick}>Experience</div>
          <div className={scroll === 2 ? highlight : nonHighlight} onClick={handleProjectClick}>Projects</div>
        </div>
        <div className='text-secondary cursor-pointer'>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_47_215)">
              <path d="M12 0.555989C12.1947 0.793462 12.314 1.08373 12.3425 1.38951C12.371 1.69529 12.3075 2.00261 12.16 2.27199C11.0031 4.39469 10.3992 6.77449 10.404 9.19199C10.404 17.234 16.96 23.746 25.04 23.746C26.096 23.7447 27.118 23.638 28.106 23.426C28.4082 23.3613 28.7228 23.3867 29.0108 23.4991C29.2987 23.6114 29.5474 23.8057 29.726 24.058C29.915 24.3205 30.0114 24.6383 30.0002 24.9616C29.989 25.2848 29.8707 25.5952 29.664 25.844C28.0953 27.7708 26.1164 29.3232 23.8716 30.3882C21.6268 31.4531 19.1726 32.0038 16.688 32C7.468 32 0 24.572 0 15.42C0 8.53199 4.228 2.62399 10.248 0.119989C10.5478 -0.00741111 10.8809 -0.0337737 11.1969 0.0448851C11.513 0.123544 11.7949 0.302949 12 0.555989ZM9.716 2.62199C7.40135 3.86382 5.46633 5.70948 4.11655 7.96288C2.76676 10.2163 2.05262 12.7933 2.05 15.42C2.05 23.46 8.608 29.972 16.688 29.972C18.6228 29.9749 20.539 29.5943 22.3258 28.8521C24.1127 28.1099 25.7346 27.0209 27.098 25.648C26.4233 25.732 25.7373 25.774 25.04 25.774C15.82 25.774 8.354 18.346 8.354 9.19399C8.354 6.85999 8.838 4.63799 9.716 2.62199Z" fill="white"/>
              </g>
              <defs>
              <clipPath id="clip0_47_215">
              <rect width="32" height="32" fill="currentColor"/>
              </clipPath>
              </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Topbar