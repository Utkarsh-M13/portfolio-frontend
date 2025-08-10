import './App.css'
import AmorphousBackdrop from './components/AmorphousBackdrop'
import Cards from './components/Cards'
import Contact from './components/Contact'
import Topbar from './components/Topbar'

function App() {

  return (
    <div className='flex justify-center h-full w-full'>
      <Topbar></Topbar>
      <AmorphousBackdrop></AmorphousBackdrop>
      <Contact></Contact>
      <Cards></Cards>
    </div>
  )
}

export default App
