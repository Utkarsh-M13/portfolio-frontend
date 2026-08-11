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
    name: 'Typescript',
    width:48,
    height:48,
    src: '/assets/typescript.png',
    link: 'https://www.typescriptlang.org/'
  },
  {
    name: 'Next',
    width:48,
    height:48,
    src: '/assets/next.png',
    link: 'https://nextjs.org/'
  },
  {
    name: 'NodeJS',
    width:56,
    height:56,
    src: '/assets/node.svg',
    link: 'https://nodejs.org/en'
  },
  {
    name: 'Python',
    width:48,
    height:48,
    src: '/assets/python.svg',
    link: 'https://www.python.org/'
  },
  {
    name: 'PostgreSQL',
    width:48,
    height:48,
    src: '/assets/postgresql.svg',
    link: 'https://www.postgresql.org/'
  },
  {
    name: 'Docker',
    width:48,
    height:48,
    src: '/assets/docker.svg',
    link: 'https://www.docker.com/'
  },
  {
    name: 'AWS',
    width:48,
    height:48,
    src: '/assets/aws.svg',
    link: 'https://aws.amazon.com/'
  },
  {
    name: 'GCP',
    width:48,
    height:48,
    src: '/assets/googlecloud.svg',
    link: 'https://cloud.google.com/'
  },
  {
    name: 'PyTorch',
    width:48,
    height:48,
    src: '/assets/pytorch.svg',
    link: 'https://pytorch.org/'
  },
  {
    name: 'Tailwind',
    width:48,
    height:29,
    src: '/assets/tailwind.png',
    link: 'https://tailwindcss.com/'
  },
  {
    name: 'C++',
    width:48,
    height:48,
    src: '/assets/cplusplus.svg',
    link: 'https://isocpp.org/'
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