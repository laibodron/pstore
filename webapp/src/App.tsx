import './styles/global.scss'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ChangePasswordModal from './components/ChangePasswordModal'
import Layout from './components/Layout'
import LogInModal from './components/LogInModal'
import ProfileLayout from './components/ProfileLayout'
import SignInModal from './components/SignInModal'
import * as routes from './lib/routes'
import CartPage from './pages/CartPage'
import CatalogPage from './pages/CatalogPage'
import MainPage from './pages/MainPage'
import NotFoundPage from './pages/NotFoundPage'
import ProfileOrdersPage from './pages/ProfileOrdersPage'
import ProfileSettingsPage from './pages/ProfileSettingsPage'
import ViewItemPage from './pages/ViewItemPage'
import WishlistPage from './pages/WishlistPage'

function App() {
  return (
    <BrowserRouter>
      <LogInModal />
      <SignInModal />
      <ChangePasswordModal />
      <Routes>
        <Route element={<Layout />}>
          <Route path={routes.getMainPageRoute.definition} element={<MainPage />} />
          <Route path={routes.getCatalogPageRoute.definition} element={<CatalogPage />} />
          <Route path={routes.getViewItemPageRoute.definition} element={<ViewItemPage />} />
          <Route path={routes.getWishlistPageRoute.definition} element={<WishlistPage />} />
          <Route path={routes.getCartPageRoute.definition} element={<CartPage />} />
          <Route element={<ProfileLayout />}>
            <Route path={routes.getProfileOrdersPageRoute.definition} element={<ProfileOrdersPage />} />
            <Route path={routes.getProfileSettingsPageRoute.definition} element={<ProfileSettingsPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
