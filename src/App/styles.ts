import { Theme, StyleRules } from '@material-ui/core/styles'

export type classes = 'root'
  | 'mainContainer'
  | 'headerSpacer'
  | 'contentContainer'
  | 'loaderContainer'

export default (theme: Theme): StyleRules<classes> => ({
  root: {
    backgroundColor: theme.palette.background.default,
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    overflow: 'hidden'
  },
  mainContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  headerSpacer: {
    ...theme.mixins.toolbar
  },
  contentContainer: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: theme.spacing() * 3,
    overflow: 'auto'
  },
  loaderContainer: {
    margin: 'auto'
  }
})
