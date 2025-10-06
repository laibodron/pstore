import { pgr } from '../utils/pumpGetRoute'

export const getMainPageRoute = pgr(() => '/')

export const getCatalogPageRoute = pgr(() => '/catalog')

export const getViewItemPageRoute = pgr({itemId: true}, ({ itemId }) => `/product/${itemId}`)

export const getWishlistPageRoute = pgr(() => '/wishlist')

export const getCartPageRoute = pgr(() => '/cart')

export const getProfileOrdersPageRoute = pgr(() => '/profile/orders')

export const getProfileSettingsPageRoute = pgr(() => '/profile/profile')