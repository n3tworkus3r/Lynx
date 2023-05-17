import React, { useState, useEffect, useRef, useContext } from "react"
import AudioControls from "./player_controls"
//import Backdrop from "./Backdrop"
import "./player.scss"
import { tracksContext } from '../../../context/tracks.context'

export const Player = ({ tracks }) => {

  ///////////////////////////////////
  //////////// VARIABLES ////////////
  ///////////////////////////////////




  const [playableTrackIndex, setPlayableTrackIndex] = useState(0)
  const [trackList, setTrackList] = useState(tracks)
  const [active, setActive ] = useState(false)

  console.log("[PLAYER] TRACKS FROM MODAL", tracks)

  const [trackProgress, setTrackProgress] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)

  const audioRef = useRef(new Audio())
  const intervalRef = useRef()
  const isReady = useRef(false)

  const { duration } = audioRef.current

  const currentPercentage = duration ? `${(trackProgress / duration) * 100}%`: "0%"
  const trackStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, black), color-stop(${currentPercentage}, black))`


  ///////////////////////////////////
  //////////// FUNCTIONS ////////////
  ///////////////////////////////////

  //////////// CHANGE TRACK NUMBER HANDLERS
  const toPrevTrack = () => {
    if (playableTrackIndex - 1 < 0) {
      setPlayableTrackIndex(trackList.length - 1)
    } else {
      setPlayableTrackIndex(playableTrackIndex - 1)
    }
  }

  const toNextTrack = () => {
    if (playableTrackIndex < trackList.length - 1) {
      console.log(trackList.length)
      setPlayableTrackIndex(playableTrackIndex + 1)
    } else {
      setPlayableTrackIndex(0)
    }
  }
  ////////////

  //////////// CHANGE TRACK DURATION HANDLERS
  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack()
      } else {
        setTrackProgress(audioRef.current.currentTime)
      }
    }, [1000])
  }

  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current)
    audioRef.current.currentTime = value
    setTrackProgress(audioRef.current.currentTime)
  }

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true)
    }
    startTimer()
  }
  ////////////


  /*






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
    audioRef.current = new Audio(tracks[playableTrackIndex]['src']) // //"http://127.0.0.1:8080/KLOUD - QUESTION.mp3"
    setTrackProgress(audioRef.current.currentTime)

    if (isReady.current) {
      audioRef.current.play()
      setIsPlaying(true)
      startTimer()
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [playableTrackIndex]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause()
      clearInterval(intervalRef.current)
    };
  }, []);*/

  return (
  <div className="player_container active"> {/*{active ? "player_container active" : "player_container"}>*/}
    <div className="player">
      <div className="track_info">

        <a id="close_player_btn"  onClick={() => setActive(false)}>&#10006;</a>

        <AudioControls isPlaying={isPlaying} onPrevClick={toPrevTrack} onNextClick={toNextTrack} onPlayPauseClick={setIsPlaying}/>
        
        <div className="time_line_container">
          <div className="time_line">
            <input type="range" value={trackProgress} step="1" min="0" 
            max={duration ? duration : `${duration}`} className="progress_bar" 
            list="custom-list"
            onChange={(e) => onScrub(e.target.value)} onMouseUp={onScrubEnd} onKeyUp={onScrubEnd} />
          </div>
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
