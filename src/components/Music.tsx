import { useEffect, useState } from "react"
import { getLastPlayed } from "../services/spotify"

type Props  = {
  forwardRef: React.RefObject<HTMLDivElement | null>
}

const Music = ({forwardRef} : Props) => {
  const [artists, setArtists] = useState("")
  const [song, setSong] = useState("")
  const [src, setSrc] = useState("")

  useEffect(() => {
    const handleFetch = async () => {
      const lastPlayedSong = await getLastPlayed()
      console.log('lastPlayedSong', lastPlayedSong)
      setArtists(lastPlayedSong.artists)
      setSong(lastPlayedSong.name)
      setSrc(lastPlayedSong.cover)
    }
    handleFetch()
  }, [])
  return (
    <div ref={forwardRef} className='h-[84px] w-[260px] bg-primary border-[#2C2C2C] border-1 flex absolute rounded-lg top-12 left-[-20px] gap-8 cursor-pointer pl-4 items-center z-0'>
      <div className='h-14'>
        <img className='h-full rounded-xl object-contains' src={src} alt="" />

      </div>
      <div className='flex flex-col gap-[-4px] font-light text-left'>
        <span className='text-secondary text-md '>{song}</span>
        <span className='text-[#A6A6A6] text-xs'>{artists}</span>

      </div>
    </div>
  )
}

export default Music