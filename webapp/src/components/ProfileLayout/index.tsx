import { Card, Col, Container, Nav, Row } from 'react-bootstrap'
import { NavLink, Outlet } from 'react-router-dom'

import { getAdminPanelRoute, getProfileOrdersRoute, getProfileSettingsRoute } from '../../lib/routes'
import { Icon } from '../Icon'

const ProfileLayout = () => {
  return (
    <Container className="mt-4">
      <Row>
        {/* Левое меню */}
        <Col md={3}>
          <Card>
            <Card.Body>
              <Nav className="flex-column nav-pills">
                <Nav.Link as={NavLink} to={getProfileOrdersRoute()}>
                  <Icon size={28} name="box" /> Заказы
                </Nav.Link>
                <Nav.Link as={NavLink} to={getProfileSettingsRoute()}>
                  <Icon size={26} name="userProfile" /> Настройки профиля
                </Nav.Link>
                <Nav.Link as={NavLink} to={getAdminPanelRoute()}>
                  <Icon size={26} name="admin" /> Admin panel
                </Nav.Link>
              </Nav>
            </Card.Body>
          </Card>
        </Col>

        {/* Правый контент */}
        <Col md={9}>
          <Card>
            <Card.Body>
              <Outlet />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ProfileLayout
