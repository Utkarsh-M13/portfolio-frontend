import React from 'react'
import TechCard from './TechCard'

type data = {
  name: string,
  height: number,
  width: number,
  src: string,
}
const Tech = () => {
  const technologies : data[]= [{
    name: 'React',
    width:48,
    height: 43,
    src: '/assets/react.png'
  },
  {
    name: 'Next',
    width:48,
    height:48,
    src: '/assets/next.png'
  },
  {
    name: 'Tailwind',
    width:48,
    height:29,
    src: '/assets/tailwind.png'
  },
  {
    name: 'NodeJS',
    width:56,
    height:56,
    src: '/assets/node.svg'
  }, 
  {
    name: 'Vite.js',
    width:48,
    height:48,
    src: '/assets/vite.svg'
  }, 
  {
    name: 'Typescript',
    width:48,
    height:48,
    src: '/assets/typescript.png'
  }, 
  {
    name: 'MongoDB',
    width:48,
    height:48,
    src: '/assets/mongo.svg'
  }, ]
  return (
    <div className='w-full h-fit mt-12 lg:mt-24 text-left'>
      <div className='font-medium text-lg text-secondary mb-4'>My Technologies</div>
      <div className='grid gap-4 flex-row w-full grid-cols-3 md:grid-cols-4 lg:grid-cols-7'>
        {
        technologies.map((t) => {
          return <TechCard key={t.src} name={t.name} height={t.height} width={t.width} src={t.src}></TechCard>
        })
      }
      </div>
    </div>
  )
}

export default Tech