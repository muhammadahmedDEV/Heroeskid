import { createMuiTheme } from '@material-ui/core/styles'
import { colors } from '@material-ui/core'

export const sideMenuWidthInUnits = 32

export function createTheme () {
  return createMuiTheme({
    palette: {
      primary: colors.blue,
      secondary: colors.amber
    }
  })
}
