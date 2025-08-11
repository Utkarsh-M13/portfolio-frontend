import React from 'react'

type Props = {
  src: string;
  name: string;
  width: number;
  height: number;
  link: string;
}
const TechCard = ({src, name, width , height, link}: Props) => {
  return (
    <a href={link}>
      <div className='w-24 h-24 border-1 border-[#4C4C4C] flex flex-col items-center rounded-lg justify-center bg-primary cursor-pointer'>
      <div className='w-fit min-h-14 flex justify-center'>
        <img className='object-contain' width={width}  height={height} src={src} alt="" />
      </div>
      <div className='font-light text-secondary'>{name}</div>
    </div>
    </a>
  )
}

export default TechCard