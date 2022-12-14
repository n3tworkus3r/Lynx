import React, { useState, useEffect, useRef, useContext } from "react"
import AudioControls from "./player_controls"
//import Backdrop from "./Backdrop"
import "./player.scss"
import { tracksContext } from '../../../context/tracks_context'

export const Player = ({active, set_active, track_finded }) => {
  // State

  const tracks_context = useContext(tracksContext)
  
  const [trackIndex, setTrackIndex] = useState(0)
  const [trackProgress, setTrackProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  // Destructure for conciseness
  // const { title, artist, color, image, audioSrc } = tracks[trackIndex]

  //const audioSrc = tracks[trackIndex].src
  //const audioSrc { title, audioSrc } = tracks[trackIndex]

  const tracks = tracks_context.track_list

  const audioRef = useRef(new Audio())
  const intervalRef = useRef()
  const isReady = useRef(false)


  const { duration } = audioRef.current

  const currentPercentage = duration ? `${(trackProgress / duration) * 100}%`: "0%"
  const trackStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, black), color-stop(${currentPercentage}, black))`

  
  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack()
      } else {
        setTrackProgress(audioRef.current.currentTime)
      }
    }, [1000]);
  };

  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current)
    audioRef.current.currentTime = value
    setTrackProgress(audioRef.current.currentTime)
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true)
    }
    startTimer()
  };

  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1)
    } else {
      setTrackIndex(trackIndex - 1)
    }
  };

  const toNextTrack = () => {
    if (trackIndex < tracks.length - 1) {
      console.log(tracks.length)
      setTrackIndex(trackIndex + 1)
    } else {
      setTrackIndex(0)
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play()
      startTimer()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  useEffect(() => {

    audioRef.current.pause();
    audioRef.current = new Audio(tracks[trackIndex]['src']) // //"http://127.0.0.1:8080/KLOUD - QUESTION.mp3"
    setTrackProgress(audioRef.current.currentTime)

    if (isReady.current) {
      audioRef.current.play()
      setIsPlaying(true)
      startTimer()
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [trackIndex]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause()
      clearInterval(intervalRef.current)
    };
  }, []);

  return (
  <div className={active ? "player_container active" : "player_container"}>
    <div className="player">
      <div className="track_info">

        <a id="close_player_btn"  onClick={() => set_active(false)}>&#10006;</a>

        <AudioControls isPlaying={isPlaying} onPrevClick={toPrevTrack} onNextClick={toNextTrack} onPlayPauseClick={setIsPlaying}/>
        
        <div className="range">
          <input type="range" value={trackProgress} step="1" min="0" 
          max={duration ? duration : `${duration}`} className="progress_bar" 
          list="custom-list"
          onChange={(e) => onScrub(e.target.value)} onMouseUp={onScrubEnd} onKeyUp={onScrubEnd} />
        </div>
        
      </div>
      {/*<Backdrop
        trackIndex={trackIndex}
        activeColor={color}
        isPlaying={isPlaying}
      />*/}
    </div>
  </div>
  )
}

//export default AudioPlayer;
