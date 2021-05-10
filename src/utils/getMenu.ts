type TGetMenu = (isLoggedIn: boolean) => Array<TMenuItem>

type TMenuItem = {
  name: string
  link: string
  activeTab: number
}

const sharedOptions: Array<TMenuItem> = [
  { name: 'Home', link: '/', activeTab: 0 },
  { name: 'Contact Us', link: '/contact-us', activeTab: 1 },
]

export const visitorOptions: Array<TMenuItem> = [
  ...sharedOptions,
  // other options depending on the role
]

export const userOptions: Array<TMenuItem> = [
  ...sharedOptions,
  // other options depending on the role
]

export const getMenu: TGetMenu = (isLoggedIn) =>
  isLoggedIn ? userOptions : visitorOptions
