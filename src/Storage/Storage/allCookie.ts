import cookie from 'cookie'

export const allCookie = () => {
  const cookies = cookie.parse(document.cookie)

  return cookies
}