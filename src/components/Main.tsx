import { useEffect, useState } from 'react'
import AmorphousBackdrop from './AmorphousBackdrop'
import Cards from './Cards'
import Contact from './Contact'
import Topbar from './Topbar'

const Main = () => {
  const [scrolled, setScrolled] = useState(true);
  
    useEffect(() => {
      const onScroll = () => {
        setScrolled(window.scrollY > 0);
      };
  
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }, []);

  return (
    <div className={`flex justify-center h-full w-full`}>
            <Topbar scrolled={scrolled}></Topbar>
            <AmorphousBackdrop></AmorphousBackdrop>
            <Contact></Contact>
            <Cards></Cards>
    </div>
  )
}

export default Main