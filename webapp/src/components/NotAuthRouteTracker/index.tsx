// import { atom } from 'nanostores'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { getMainRoute, getSignOutRoute } from '../../lib/routes'
import useLastVisitedNotAuthRouteState from '../../lib/store/useLastVisistedNotAuthRoute'
// export const lastVisistedNotAuthRouteStore = atom(getAllListingRoute())

export const NotAuthRouteTracker = () => {
  const { pathname } = useLocation()
  const changeLast = useLastVisitedNotAuthRouteState((s) => s.change)
  useEffect(() => {
    const authRoutes = [getSignOutRoute()]
    const isAuthRoute = authRoutes.includes(pathname)
    if (!isAuthRoute) {
      changeLast(pathname || getMainRoute())
    }
  }, [pathname])

  return null
}
