import { Container, Dropdown, DropdownButton, Form, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import * as routes from '../../lib/routes'
import { Icon } from '../Icon'

const Header = () => {
  return (
    <>
      <Navbar bg="secondary" variant="dark" expand="lg" className="py-2 text-light">
        <Container className="d-flex justify-content-between align-items-center">
          <Nav.Link as={Link} to="/">
            <Icon size={24} name="location" />
            City
          </Nav.Link>
          <div className="d-flex gap-4">
            <Nav.Link as={Link} to="/">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              Delivery
            </Nav.Link>
          </div>
          <div>
            <Nav.Link className="d-flex align-items-center gap-3" as={Link} to="/">
              +7-999-999-99-99
              <Icon size={24} name="telegram" />
            </Nav.Link>
          </div>
        </Container>
      </Navbar>
      <Navbar bg="secondary" variant="dark" expand="lg" className="py-3">
        <Container className="d-flex justify-content-between align-items-center">
          {/* ЛЕВАЯ ЧАСТЬ */}
          <div className="d-flex align-items-center gap-3">
            {/* ЛОГО */}
            <Navbar.Brand as={Link} to="/" className="fs-3">
              Pstore
            </Navbar.Brand>

            {/* ДРОПДАУН */}
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Каталог
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={routes.getViewItemRoute({ itemId: '42' })}>
                  Item
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/catalog">
                  Catalog
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {/* ПОИСК ПО ЦЕНТРУ */}
          <div className="flex-grow-1 px-5">
            <Form className="d-flex">
              <Form.Control type="search" placeholder="Поиск..." className="me-2" aria-label="Search" />
            </Form>
          </div>

          {/* ПРАВАЯ ЧАСТЬ */}
          <div className="d-flex align-items-center gap-3 text-white ">
            <Nav.Link className="px-2" as={Link} to={routes.getWishlistRoute()}>
              <Icon size={28} name="heart" />
            </Nav.Link>
            <Nav.Link as={Link} to={routes.getCartRoute()}>
              <Icon size={28} name="cart" />
            </Nav.Link>
            <DropdownButton
              variant="secondary"
              id="dropdown-basic-button"
              title={<Icon size={28} name="userProfile" />}
              align="end"
            >
              <Dropdown.Item as={Link} to={routes.getProfileOrdersRoute()}>
                Orders
              </Dropdown.Item>
              <Dropdown.Item as={Link} to={routes.getProfileSettingsRoute()}>
                Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as={Link} to={routes.getSignOutRoute()}>
                Log Out
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
