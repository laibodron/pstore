import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

const LogInModal = () => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Phone number or email</Form.Label>
            <Form.Control type="email" />
          </Form.Group>
          <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" />
          </Form.Group>
          <Button variant="link" className="mb-4 p-0">
            Forgot your password?
          </Button>
          <Button variant="success" onClick={handleClose} className="w-100">
            Log In
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default LogInModal
