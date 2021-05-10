import { createContext } from 'react'

export type TAuthContext = {
  isLoggedIn: boolean
  login: () => void
  logout: () => void
}

const defaultContext = {
  isLoggedIn: false,
  login: () => {},
  logout: () => {}
}

const AuthContext = createContext<TAuthContext>(defaultContext)

export default AuthContext
