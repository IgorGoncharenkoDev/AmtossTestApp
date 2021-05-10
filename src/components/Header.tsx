import React, { useEffect, useMemo, FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Container, AppBar, Tabs, Tab } from '@material-ui/core'

type TProps = {
  activeMenuTab: number
  handleChangeMenuTab: (value: number) => void
}

type TMenuRoute = {
  name: string
  link: string
  activeTab: number
}

const Header: FunctionComponent<TProps> = (props) => {
  const { activeMenuTab, handleChangeMenuTab } = props

  const menuRoutes: Array<TMenuRoute> = useMemo(() => ([
    { name: 'Home', link: '/', activeTab: 0 },
    { name: 'Contact Us', link: '/contact-us', activeTab: 1 },
  ]), [])

  useEffect(() => {
    [ ...menuRoutes ].forEach((route: TMenuRoute) => {
      switch (window.location.pathname) {
        case route.link:
          // checking if the current 'value' has already been set correctly
          // by checking the 'activeMenuTab' property on the current route
          if (route.activeTab !== activeMenuTab) {
            handleChangeMenuTab(route.activeTab)
          }
          break

        default:
          break
      }
    })
  }, [ activeMenuTab, menuRoutes ])

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Tabs value={ activeMenuTab } onChange={ (event: React.ChangeEvent<{}>, value: number) => handleChangeMenuTab(value) }>
          {
            menuRoutes.map(({ name, link }: TMenuRoute, index: number) => (
              <Tab
                key={ `tab-${ index }-${ name }`}
                label={ name }
                to={ link }
                component={ Link }
              />
            ))
          }
        </Tabs>
      </Container>
    </AppBar>
  )
}

export default Header
