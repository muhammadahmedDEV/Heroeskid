// MAIN MODULES
import React from 'react'

// STYLES
import './styles.scss'

interface ComponentProps {
  title?: string
  onClick: (x: string, y: string) => void | undefined
  styles?: string
  icon?: string
  variant?: 'text' | 'outlined' | 'contained' | undefined
  color?: 'inherit' | 'primary' | 'secondary' | 'default' | undefined
  disabled?: boolean
  checked?: boolean
  item?: string
  group?: string
}

const bc: string = 'checkbox'

const Select = ({ title, onClick, styles, icon, variant, color, disabled, checked, item = '', group = '' }: ComponentProps) => {
  const triggerAct = (): void => {
    onClick(item, group)
  }
  return (
    <label className={`${bc}__container`}>
      <span className={`${bc}__title`}>{title}</span>
      <input type='checkbox' onChange={triggerAct} checked={checked} />
      <span className={`${bc}__checkmark`} />
    </label>
  )
}

export default Select
