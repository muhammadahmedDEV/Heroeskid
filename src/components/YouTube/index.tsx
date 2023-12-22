// MAIN MODULES
import React from 'react'
import ReactPlayer from 'react-player'

interface ComponentsProps {
  width: number
  height: number
  url?: string
}

const YouTube = ({ width, height, url }: ComponentsProps) => {
  const view: any = url ? <ReactPlayer width={`${width}%`} height={`${height}px`} url={url} /> : null
  return view
}
export default YouTube
