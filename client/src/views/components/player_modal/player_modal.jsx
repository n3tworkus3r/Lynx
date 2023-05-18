import React, { useState, useEffect, useRef, useContext } from "react"
import AudioControls from "../player/player_controls"
import { ReactComponent as Play } from "../player/assets/play.svg";
import { ReactComponent as Pause } from "../player/assets/pause.svg";
import { ReactComponent as Next } from "../player/assets/next.svg";
import { ReactComponent as Prev } from "../player/assets/prev.svg";

//import Backdrop from "./Backdrop"
import "./player_modal.scss"
//import { tracksContext } from '../../../context/tracks.context'

export const PlayerModal = ({ tracks }) => {
  ///////////////////////////////////
  //////////// VARIABLES ////////////
  ///////////////////////////////////

  const [playableTrackIndex, setPlayableTrackIndex] = useState(0)
  const [trackList, setTrackList] = useState(tracks)
  const [active, setActive ] = useState(false)

  const [currentTrack, setCurrentTrack] = useState([])

  //console.log("[PLAYER] TRACKS FROM MODAL", tracks)
  //console.log("[PLAYER] TRACKS FROM CONTEXT", tracksContext.trackList)

  const [trackProgress, setTrackProgress] = useState(false)

  const [isPlaying, setIsPlaying] = useState(false) // FOR CHANGE PLAY-PAUSE SVG

  const audioRef = useRef(new Audio())
  const intervalRef = useRef()
  const isReady = useRef(true)

  const { duration } = audioRef.current

  const currentPercentage = duration ? `${(trackProgress / duration) * 100}%`: "0%"
  //const trackStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, black), color-stop(${currentPercentage}, black))`

  ///////////////////////////////////
  //////////// FUNCTIONS ////////////
  ///////////////////////////////////

  //////////// GET TRACK FROM SOURCE (PREPARING)
  const playTrackHandler = (index) => {
    if(index >= 0) {
      //console.log("[PLAYER] TRACK INDEX: ", index)
      //console.log("[PLAYER] TRACK SRC: ", tracks[index].src)
      audioRef.current.pause()
      audioRef.current = new Audio(tracks[index].src)
    }

    setTrackProgress(audioRef.current.currentTime)

    if (isReady.current) {
      audioRef.current.play()
      setIsPlaying(true)
      startTimer()
    } else {
      isReady.current = true
    }
  }

  //////////// CHANGE TRACK ICON (PLAY-PAUSE)
  const playPauseHandler = (index) => {
    if (isPlaying) {
      setIsPlaying(false)
      isReady.current = false
      console.log("[PLAYER] PAUSE: ")
    } else { console.log("[PLAYER] PLAY: ") }
    playTrackHandler(index)
  }
  ////////////

  //////////// CHANGE TRACK NUMBER (PREV)
  const toPrevTrack = (index) => {
    if (index < 0) {
      setPlayableTrackIndex(tracks.length-1)
      playTrackHandler(tracks.length-1)
    } else {
      setPlayableTrackIndex(index)
      playTrackHandler(index)
    }
  }

  //////////// CHANGE TRACK NUMBER (NEXT)
  const toNextTrack = (index) => {
    //console.log("[PLAYER] TRACKLIST LEN: ", tracks.length)
    if (index == (tracks.length)) {
      //console.log("[PLAYER] LEN LIMIT REACHED")
      setPlayableTrackIndex(0)
      playTrackHandler(0)
    } else {
      setPlayableTrackIndex(index)
      playTrackHandler(index)
    }
  }
  ////////////

  //////////// CHANGE TRACK DURATION HANDLERS
  const startTimer = () => {
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
    clearInterval(intervalRef.current)
    audioRef.current.currentTime = value
    setTrackProgress(audioRef.current.currentTime)
  }

  const onScrubEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true)
    }
    startTimer()
  }

  ///////////////////////////////////
  //////////// RENDERING ////////////
  ///////////////////////////////////

  return (
  <div className="player_container_modal active">
    <div className="player_modal">
        <div className="audio_controls_container">
          <div className="modal_audio_controls">
            <button type="button" className="prev_btn" aria-label="Previous" onClick={() => toPrevTrack(playableTrackIndex-1)}>
              <Prev />
            </button>
            {isPlaying ? (
              <button type="button" className="pause_btn" onClick={() => playPauseHandler(playableTrackIndex)} /*onClick={() =>  onPlayPauseClick(false)} */ aria-label="Pause">
                <Pause />
              </button>
            ) : (
              <button type="button" className="play_btn" onClick={() => playPauseHandler(playableTrackIndex)} /*onClick={() => onPlayPauseClick(true)}*/ aria-label="Play">
                <Play />
              </button>
            )}
            <button type="button" className="next_btn" aria-label="Next" onClick={() => toNextTrack(playableTrackIndex+1)}>
              <Next />
            </button>
          </div>
        </div>
        <div className="time_line_modal_container">
          <div className="time_line">
            <input type="range" value={trackProgress} step="1" min="0" 
            max={duration ? duration : `${duration}`} className="progress_bar" 
            list="custom-list"
            onChange={(e) => onScrub(e.target.value)} onMouseUp={onScrubEnd} onKeyUp={onScrubEnd} />
          </div>
        </div>
      </div>
    </div>
  )
}