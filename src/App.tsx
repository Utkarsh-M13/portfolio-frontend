import { Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './App.css'
import LandingPage from './LandingPage/LandingPage'
import ComingSoonPage from './ComingSoonPage.tsx/ComingSoonPage'
import NotFound from './components/NotFound'

function App() {



  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/coming-soon" element={<ComingSoonPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Analytics />
      <SpeedInsights />
    </Router>
  )
}

export default App
