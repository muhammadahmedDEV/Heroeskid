// MAIN MODULES
import React from 'react'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'

// STYLES
import './styles.scss'

interface ComponentProps {
  title: string
  onClick?: (props: any) => void
  styles?: string
  icon?: string
  variant?: 'text' | 'outlined' | 'contained' | undefined
  color?: 'inherit' | 'primary' | 'secondary' | 'default' | undefined
  disabled?: boolean
  alternativeText?: string
}

const bc: string = 'button'

const CustomButton = ({ title, onClick, styles, icon, variant, color, disabled, alternativeText = 'Coming Soon' }: ComponentProps) => {
  const Child = () => <img className={`${bc}__icon`} src={icon} alt='' />
  return (
    <Button className={styles} onClick={onClick} color={color} variant={variant} disabled={disabled} disableRipple>
      {icon && <Icon component={Child} />}
      {!disabled ? title : alternativeText}

    </Button>
  )
}

export default CustomButton
