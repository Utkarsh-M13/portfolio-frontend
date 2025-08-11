import { useTheme } from "../context/ThemeContext"

const Status = () => {
  const {theme} = useTheme()
  const style = theme ? 'hidden w-36 h-fit font-bold condensed bg-[#707070]/20 rounded-sm lg:flex text-xs items-center py-1.5' :
  'hidden w-36 h-fit font-bold condensed bg-[#707070]/40 rounded-sm lg:flex text-xs items-center py-1.5'
  return (
    <div className={style}>
      <span className='ml-[16px] text-secondary' >Looking for work</span>
      <div className='w-[10px] h-[10px] rounded-full bg-[#28C700] ml-7'></div>
    </div>
  )
}

export default Status