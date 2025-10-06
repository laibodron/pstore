import { Card, Col, Container, Nav, Row } from 'react-bootstrap'
import { NavLink, Outlet } from 'react-router-dom'

import { getAdminPanelPageRoute, getProfileOrdersPageRoute, getProfileSettingsPageRoute } from '../../lib/routes'
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
                <Nav.Link as={NavLink} to={getProfileOrdersPageRoute()}>
                  <Icon size={28} name="box" /> Заказы
                </Nav.Link>
                <Nav.Link as={NavLink} to={getProfileSettingsPageRoute()}>
                  <Icon size={26} name="userProfile" /> Настройки профиля
                </Nav.Link>
                <Nav.Link as={NavLink} to={getAdminPanelPageRoute()}>
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
