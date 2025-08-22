import ProjectCard from './ProjectCard'

type Card = {
  title: string,
  description: string,
  link: string,
  github: string,
  src: string,
  technologies: string[],
  comingSoon?: boolean
}


const Projects = () => {
  const projects : Card[] = [
    {
      title: 'Sentiment Analysis Trader',
      src: "/assets/dashboard.png",
      description: "I built an AI-driven sentiment trading system that ingests market headlines and social chatter, scores sentiment, and turns it into buy/sell signals with risk controls (position sizing, stops, cooldowns). It executes in a paper-trading account, logs every trade, and supports backtesting. I also shipped a responsive React dashboard that streams the bot's live portfolio—holdings, P&L, equity curve, and trade history—so you can monitor performance in real time.",
      technologies: ["NewsAPI", 'Polygon.io', 'IBKR', 'Twitter API', 'TimescaleDB', 'PostGres', 'PyTorch', 'FinBert', 'React', 'Socket.io'],
      github: '',
      link: '',
      comingSoon: true
    },{

      title: 'Yojna',
      src: "/assets/yojna.png",
      description: "I developed Yojna, my first React Native application, designed to showcase and increase awareness of government schemes and yojnas in India that often go underused. The app provides users with an accessible, mobile-first way to explore programs, featuring a clean UI and smooth animations built with React Native, Reanimated, and Expo. This project marked my entry into cross-platform development, where I focused on building a responsive interface, efficient navigation, and a seamless user experience.",
      technologies: ["React-Native", 'Expo', 'Typescript', 'Reanimated'],
      github: 'https://github.com/Utkarsh-M13/https://github.com/Utkarsh-M13/Yojna-App',
      link: '',
      comingSoon: true
    },
    {
      title: 'Tetreon',
      src: "/assets/tetreon.png",
      description: "I built Tetreon, a Tetris Chrome extension, end-to-end: configured Manifest V3 (service worker, permissions) for secure, modern packaging; implemented the game loop, rendering, collision/rotation, and scoring with PhaserJS; and added saved scores/game state with tuned input and frame timing for smooth, responsive play in Chrome.",
      technologies: ["ManifestV3", 'JavaScript', 'Phaser.io', 'LocalStorage'],
      github: 'https://github.com/Utkarsh-M13/Tetreon',
      link: 'https://chromewebstore.google.com/detail/tetreon/bcnopnfocacmgafmoglmhplpbclcnfkc'
    },
    {
      title: 'Portfolio Website',
      src: "/assets/portfolio.png",
      description: "My portfolio where you can browse my projects and experiences, learn a bit about me, and even see the last song I played. You're on it right now :)",
      technologies: ["ReactJS", 'Tailwind', 'SpotifyAPI', 'Figma'],
      github: '',
      link: ''
    }
  ]
  return (
    <div id='Projects' className='w-full h-fit mt-12 lg:mt-24 text-left grid gap-4'>
      <div className='font-medium text-lg text-secondary mb-4'>Projects</div>
      {projects.map((c) => <ProjectCard key={c.title} description={c.description} title={c.title} technologies={c.technologies} link={c.link} github={c.github} src={c.src} comingSoon={c.comingSoon}></ProjectCard>)}
    </div>
  )
}

export default Projects