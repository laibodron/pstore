import { pgr } from '../utils/pumpGetRoute'

export const getMainRoute = pgr(() => '/')

export const getCatalogRoute = pgr(() => '/catalog')

export const getViewItemRoute = pgr({itemId: true}, ({ itemId }) => `/product/${itemId}`)

export const getWishlistRoute = pgr(() => '/wishlist')

export const getCartRoute = pgr(() => '/cart')

export const getProfileOrdersRoute = pgr(() => '/profile/orders')

export const getProfileSettingsRoute = pgr(() => '/profile/settings')

export const getAdminPanelRoute = pgr(() => '/profile/admin')

export const getSignOutRoute = pgr(() => '/signout')