import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

// CONSTANTS
import { color } from '../../constants/color'

// TODO PALLET FOR  BUTTONS

const buttonStyles = createStyles({
  root: {
    color: color.AQUA_BLUE,
    fontWeight: 'normal',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'transparent'
    }

  }
})
export const getStyles = makeStyles((theme: Theme) =>
  buttonStyles
)

export const getButtonBlue = (h: string, w: string, c: string = 'white', t: boolean = true) => (makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: c,
      height: h,
      width: w,
      fontSize: '13px',
      color: 'black',
      fontWeight: 'normal',
      textTransform: t ? 'none' : 'uppercase',
      margin: '10px 25px',
      letterSpacing: 'initial',
      borderColor: color.AQUA_BLUE,
      padding: '0px',
      textAlign: 'left',
      '&:hover': {
        backgroundColor: c
      }
    }
  })
))()

export const getButtonRed = (h: string, w: string, c: string = color.BUTTTON_RED, f?: string) => (makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: c,
      height: h,
      width: w,
      fontSize: f ? f : '17px',
      color: 'white',
      fontWeight: 'normal',
      textTransform: 'none',
      margin: '10px 25px',
      letterSpacing: 'initial',
      padding: '0px',
      '&:hover': {
        backgroundColor: c
      }
    }
  })
))()

export const getTextArea = (h: string, w: string, c: string = color.BUTTTON_RED) => (makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: c,
      height: h,
      width: w,
      fontSize: '17px',
      color: 'white',
      fontWeight: 'normal',
      textTransform: 'none',
      margin: '10px 25px',
      letterSpacing: 'initial',
      padding: '0px',
      borderBottom: 'none',
      '&:hover': {
        backgroundColor: c,
        borderBottom: 'white'
      },
      '&:before': {
        borderBottom: 'white'
      },
      '&:focus': {
        borderBottom: 'white'
      }
    }
  })
))()
