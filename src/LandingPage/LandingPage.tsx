import { ScrollProvider } from '../context/ScrollContext'
import Main from '../components/Main'
import { ThemeProvider } from '../context/ThemeContext'

const LandingPage = () => {
  return (
    <ScrollProvider>
      <ThemeProvider>
        <Main></Main>
      </ThemeProvider>
    </ScrollProvider>
  )
}

export default LandingPage