import React from 'react'

type Props  = {
  forwardRef: React.RefObject<HTMLDivElement | null>
}

const Music = ({forwardRef} : Props) => {
  return (
    <div ref={forwardRef} className='h-[84px] w-[260px] bg-primary border-[#2C2C2C] border-1 flex absolute rounded-lg top-12 left-[-20px] gap-8 cursor-pointer pl-4 items-center'>
      <div className='h-14'>
        <img className='h-full rounded-xl object-contains' src="/assets/avicii.webp" alt="" />

      </div>
      <div className='flex flex-col gap-[-4px] font-light text-left'>
        <span className='text-secondary text-md '>The Nights</span>
        <span className='text-[#A6A6A6] text-xs'>Avicii</span>

      </div>
    </div>
  )
}

export default Music