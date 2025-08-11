import Name from './Name'
import Description from './Description'
import Tech from './Tech'
import Experience from './Experience'
import Projects from './Projects'
import Footer from './Footer'

const Cards = () => {
  return (
    <div className=' w-[600px] lg:w-[800px] h-fit mt-4 lg:mt-40 z-10 overflow-auto'>
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