import './styles/global.scss'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import * as routes from './lib/routes'
import MainPage from './pages/MainPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.getMainPageRoute.definition} element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
