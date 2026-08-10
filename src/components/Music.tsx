import { useEffect, useState } from "react"
import { getLastPlayed } from "../services/spotify"

type Props  = {
  forwardRef: React.RefObject<HTMLDivElement | null>
}

const MAX = 16;
const clamp = (s?: string, n = MAX) => {
  const v = s ?? "";
  return v.length > n ? v.slice(0, n - 1) + "…" : v;
};

type State = "loading" | "loaded" | "error";

const Music = ({ forwardRef }: Props) => {
  const [artists, setArtists] = useState("");
  const [song, setSong] = useState("");
  const [src, setSrc] = useState("");
  const [state, setState] = useState<State>("loading");

  useEffect(() => {
    let active = true;
    const handleFetch = async () => {
      try {
        const last = await getLastPlayed();
        if (!active) return;
        if (!last) {
          setState("error");
          return;
        }
        setArtists(clamp(last.artists));
        setSong(clamp(last.name));
        setSrc(last.cover || "");
        setState("loaded");
      } catch {
        if (active) setState("error");
      }
    };
    handleFetch();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div
      ref={forwardRef}
      className="h-[84px] w-[260px] bg-primary border-[#2C2C2C] border-1 flex absolute rounded-lg top-12 left-[-20px] gap-8 cursor-pointer pl-4 items-center z-0"
    >
      {state === "loading" && (
        <span className="text-[#A6A6A6] text-xs px-2">Loading…</span>
      )}
      {state === "error" && (
        <span className="text-[#A6A6A6] text-xs px-2">Nothing playing right now</span>
      )}
      {state === "loaded" && (
        <>
          <div className="h-14">
            {src && (
              <img
                className="h-full rounded-xl object-contain"
                src={src}
                alt={`${song} album cover`}
              />
            )}
          </div>
          <div className="flex flex-col font-light text-left">
            <span className="text-secondary text-md">{song}</span>
            <span className="text-[#A6A6A6] text-xs">{artists}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Music;
