import { Button, Col, Form, Row } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'

import { withPageWrapper } from '../../lib/pageWrapper'

const ProfileSettingsPage = withPageWrapper({
  title: 'Profile Settings',
})(() => {
  return (
    <>
      <Row className="mb-4">
        <Col md={3} className="d-flex gap-3">
          <Image
            fluid
            src="https://yt3.googleusercontent.com/3e9LhcEPG7dqlM5fdBrfin8NvN0CRR0-TXZ4IvOPGBulkBKn9d2fQCPWxMjD-phkzMx8P2AK6A=s900-c-k-c0x00ffffff-no-rj"
            roundedCircle
          />
        </Col>
        <Col className="d-flex flex-column justify-content-center gap-3">
          <h4 className="fs-4">John Doe</h4>
          <p className="">Registration date: 01.01.2020</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <Row>
              <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Surname</Form.Label>
                <Form.Control type="email" placeholder="aboba" />
              </Form.Group>
              <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control type="email" placeholder="aboba" />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Phone number</Form.Label>
                <Form.Control type="email" placeholder="123" />
              </Form.Group>
              <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="aboba@example.com" />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Nickname</Form.Label>
                <Form.Control type="email" placeholder="aboba" />
              </Form.Group>
              <Form.Group
                as={Col}
                className="mb-3 d-flex h-100 align-self-end justify-content-center"
                controlId="exampleForm.ControlInput1"
              >
                <Button>Change password</Button>
              </Form.Group>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  )
})

export default ProfileSettingsPage
