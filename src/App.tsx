import React, { useState, FunctionComponent } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core'
import { appRoutes } from './routes/routes'

import Header from './components/Header'

import theme from './mui-theme'
import { useBaseStyles } from './styles/styles'
import './styles/styles.scss'


const App: FunctionComponent = () => {
  const [ activeMenuTab, setActiveMenuTab ] = useState<number>(0)

  const classes = useBaseStyles()

  return (
    <MuiThemeProvider theme={ theme }>
      <div className={ classes.app }>
        <BrowserRouter>
          <Header
            activeMenuTab={ activeMenuTab }
            handleChangeMenuTab={ setActiveMenuTab }
          />
          <main>
            { appRoutes }
          </main>
        </BrowserRouter>
      </div>
    </MuiThemeProvider>
  )
}

export default App
