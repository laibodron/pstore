import { Container, Nav } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'

import Header from '../Header'

const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <Container className="flex-grow-1 py-4">
        <Outlet />
      </Container>

      <footer className="bg-secondary text-white text-center py-3 mt-auto">
        <Nav.Link className="py-2" as={Link} to="/">
          About
        </Nav.Link>
        <Nav.Link className="py-2" as={Link} to="/">
          Rules
        </Nav.Link>
        <Nav.Link className="py-2" as={Link} to="/">
          support@pstore.com
        </Nav.Link>
        <div className="pt-4">&copy; {new Date().getFullYear()} Pstore. Все права защищены.</div>
      </footer>
    </div>
  )
}

export default Layout
