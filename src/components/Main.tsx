import { useEffect, useState } from 'react'
import AmorphousBackdrop from './AmorphousBackdrop'
import Cards from './Cards'
import Topbar from './Topbar'

const Main = () => {
  const [scrolled, setScrolled] = useState(true);
  
    useEffect(() => {
      const prefersDark = typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-color-scheme: dark)').matches;
      console.log('prefersDark', prefersDark)

      if (!prefersDark) {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
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
            <Cards></Cards>
    </div>
  )
}

export default Main