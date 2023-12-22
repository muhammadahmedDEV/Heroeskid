// MAIN MODULES
import React from 'react'

// STYLES
import './styles.scss'

// ICON
import mask from '../../assets/icons/badgemask.svg'

interface ComponentProps {
  url: string
}
const bc: string = 'user-icon'

const Icon = ({ url }: ComponentProps) => {
  return (
    <div className={bc}>
      <img className={`${bc}__logo`} src={url} alt='' loading='lazy' />
      <img className={`${bc}__mask`} src={mask} alt='' loading='lazy' />
    </div>
  )
}

export default Icon
