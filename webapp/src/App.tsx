import './styles/global.scss'

import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from './components/Layout'
import ModalRoot from './components/ModalRoot'
import { NotAuthRouteTracker } from './components/NotAuthRouteTracker'
import ProfileLayout from './components/ProfileLayout'
import { AppContextProvider } from './lib/ctx'
import * as routes from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import AdminPanel from './pages/AdminPanel'
import CartPage from './pages/CartPage'
import CatalogPage from './pages/CatalogPage'
import MainPage from './pages/MainPage'
import NotFoundPage from './pages/NotFoundPage'
import ProfileOrdersPage from './pages/ProfileOrdersPage'
import ProfileSettingsPage from './pages/ProfileSettingsPage'
import { SignOutPage } from './pages/SignOutPage'
import ViewItemPage from './pages/ViewItemPage'
import WishlistPage from './pages/WishlistPage'

function App() {
  return (
    <HelmetProvider>
      <TrpcProvider>
        <AppContextProvider>
          <BrowserRouter>
            <ModalRoot />
            <NotAuthRouteTracker />
            <Routes>
              <Route path={routes.getSignOutRoute.definition} element={<SignOutPage />} />
              <Route element={<Layout />}>
                <Route path={routes.getMainRoute.definition} element={<MainPage />} />
                <Route path={routes.getCatalogRoute.definition} element={<CatalogPage />} />
                <Route path={routes.getViewItemRoute.definition} element={<ViewItemPage />} />
                <Route path={routes.getWishlistRoute.definition} element={<WishlistPage />} />
                <Route path={routes.getCartRoute.definition} element={<CartPage />} />
                <Route element={<ProfileLayout />}>
                  <Route path={routes.getProfileOrdersRoute.definition} element={<ProfileOrdersPage />} />
                  <Route path={routes.getProfileSettingsRoute.definition} element={<ProfileSettingsPage />} />
                  <Route path={routes.getAdminPanelRoute.definition} element={<AdminPanel />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AppContextProvider>
      </TrpcProvider>
    </HelmetProvider>
  )
}

export default App
