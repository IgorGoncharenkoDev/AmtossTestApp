import { createMuiTheme } from '@material-ui/core/styles'
import { primaryMain } from './styles/colors/app-colors'

const theme = createMuiTheme({
  overrides: {

  },
  palette: {
    primary: {
      main: primaryMain,
      light: '',
      dark: '',
      contrastText: ''
    }
  },
})

export default theme
