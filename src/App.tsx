import './App.css'

import { ScrollProvider } from './context/ScrollContext'
import Main from './components/Main'
import { ThemeProvider } from './context/ThemeContext'

function App() {

  

  return (

    <ScrollProvider>
      <ThemeProvider>
        <Main></Main>
      </ThemeProvider>
    </ScrollProvider>
    
  )
}

export default App
