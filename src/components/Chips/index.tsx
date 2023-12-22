// MAIN MODULES
import React from 'react'

// STYLES
import './styles.scss'

// ICON
import close from '../../assets/icons/icn_close.png'

interface ComponentProps {
  filterName: string
  onClick: (name: string) => void | undefined
}

const bc: string = 'chips'

const Chips = ({ filterName, onClick }: ComponentProps) => {
  const triggerAct = (): void => {
    onClick(filterName)
  }
  return (
    <div className={bc}>
      <span>{filterName}</span>
      <img onClick={triggerAct} src={close} alt='' />
    </div>
  )

}

export default Chips
