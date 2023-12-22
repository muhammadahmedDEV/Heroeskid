// MAIN MODULES
import React from 'react'
import InputBase from '@material-ui/core/InputBase'

// STYLES
import './styles.scss'

interface ComponentProps {
  placeholder?: string
  onChange: (e: string) => void | undefined
  styles?: string
  name?: string
  type?: string
  input?: any
  multiline?: boolean
  rows?: string
}

// TODO ADD TYPES FOR INPUT
const CustomInput = ({ onChange, styles, placeholder, name, type = 'text', input, multiline = false, rows = '1' }: ComponentProps) => {
  const trigger = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    if (input) {
      input.onChange(e.target.value)
    }
    onChange(e.target.value)
  }
  return <InputBase
    name={name}
    className={styles}
    onChange={trigger}
    inputProps={{ 'aria-label': 'naked' }}
    rows={rows}
    multiline={multiline}
    placeholder={placeholder}
    type={type} />

}

export default CustomInput
