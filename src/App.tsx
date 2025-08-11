import { useEffect, useState } from 'react'
import './App.css'
import AmorphousBackdrop from './components/AmorphousBackdrop'
import Cards from './components/Cards'
import Contact from './components/Contact'
import Topbar from './components/Topbar'
import { ScrollProvider } from './context/ScrollContext'

function App() {

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <ScrollProvider>
      <div className='flex justify-center h-full w-full'>
        <Topbar scrolled={scrolled}></Topbar>
        <AmorphousBackdrop></AmorphousBackdrop>
        <Contact></Contact>
        <Cards></Cards>
      </div>
    </ScrollProvider>
    
  )
}

export default App
