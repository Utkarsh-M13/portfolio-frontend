import TechCard from './TechCard'

type data = {
  name: string,
  height: number,
  width: number,
  src: string,
  link: string,
}
const Tech = () => {
  const technologies : data[]= [{
    name: 'React',
    width:48,
    height: 43,
    src: '/assets/react.png',
    link: 'https://react.dev/'
  },
  {
    name: 'Next',
    width:48,
    height:48,
    src: '/assets/next.png',
    link: 'https://nextjs.org/'
  },
  {
    name: 'Tailwind',
    width:48,
    height:29,
    src: '/assets/tailwind.png',
    link: 'https://tailwindcss.com/'
  },
  {
    name: 'NodeJS',
    width:56,
    height:56,
    src: '/assets/node.svg',
    link: 'https://nodejs.org/en'
  }, 
  {
    name: 'Vite.js',
    width:48,
    height:48,
    src: '/assets/vite.svg',
    link: 'https://vite.dev/'
  }, 
  {
    name: 'Typescript',
    width:48,
    height:48,
    src: '/assets/typescript.png',
    link: 'https://www.typescriptlang.org/'
  }, 
  {
    name: 'MongoDB',
    width:48,
    height:48,
    src: '/assets/mongo.svg',
    link: 'https://www.mongodb.com/'
  }, ]
  return (
    <div className='w-full h-fit mt-12 lg:mt-24 text-left'>
      <div className='font-medium text-lg text-secondary mb-4'>My Technologies</div>
      <div className='grid gap-4 w-full grid-cols-3 sm:grid-cols-4 lg:grid-cols-7'>
        {
        technologies.map((t) => {
          return <TechCard key={t.src} name={t.name} height={t.height} width={t.width} src={t.src} link={t.link}></TechCard>
        })
      }
      </div>
    </div>
  )
}

export default Tech