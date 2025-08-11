import Name from './Name'
import Description from './Description'
import Tech from './Tech'
import Experience from './Experience'
import Projects from './Projects'
import Footer from './Footer'
import { useEffect } from 'react'
import { useScroll } from '../context/ScrollContext'
import { useTheme } from '../context/ThemeContext'

const sectionIDs = ['About', 'Experience', 'Projects']

const Cards = () => {
  const {setScroll} = useScroll()
  useEffect(() => {
    const targets = sectionIDs
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = sectionIDs.indexOf((entry.target as HTMLElement).id)
          if (idx !== -1) {
            setScroll(idx);
            console.log('idx', idx)
          }
        }
      })
    },
    {
      root: null,      
      threshold: 0.5,
    })
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [setScroll])

  const theme = useTheme()
  const style = theme ? ' w-[600px] lg:w-[800px] h-fit mt-4 lg:mt-40 z-10 overflow-auto' : 
  ' w-[600px] lg:w-[800px] h-fit mt-4 lg:mt-40 z-10 overflow-auto bg-[#DDDDDD]/20'
  
  return (
    <div className={style}>
      <Name></Name>
      <Description></Description>
      <Tech></Tech>
      <Experience></Experience>
      <Projects></Projects>
      <Footer></Footer>
    </div>
  )
}

export default Cards