import AmorphousBackdrop from "../components/AmorphousBackdrop"
import Topbar from "../components/Topbar"
import { ScrollProvider } from "../context/ScrollContext"
import { ThemeProvider } from "../context/ThemeContext"
import { Link } from "react-router-dom"

const ComingSoonPage = () => {
  return (
    <ScrollProvider>
      <ThemeProvider>
        <div className={`flex justify-center min-h-screen w-full items-center`}>
            <Topbar></Topbar>
            <AmorphousBackdrop></AmorphousBackdrop>
            <div className="flex flex-col gap-2">
              <div className="text-[40px] text-secondary">Project Coming Soon</div>
              <Link to="/">
                <div className="text-[20px] text-secondary font-light hover:underline cursor-pointer flex gap-2 items-center justify-center">Return to home page
                  <svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 13.887l5-5V8.18l-5-5-.707.707 4.146 4.147H2v1h10.44L8.292 13.18l.707.707z"/></svg>
                </div>
              </Link>
             
            </div>

        </div>
      </ThemeProvider>
    </ScrollProvider>
  )
}

export default ComingSoonPage