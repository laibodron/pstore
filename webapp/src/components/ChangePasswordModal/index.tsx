import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

const ChangePasswordModal = () => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Old password</Form.Label>
            <Form.Control type="password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>New password</Form.Label>
            <Form.Control type="password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>New password again</Form.Label>
            <Form.Control type="password" />
          </Form.Group>
          <Button variant="danger" onClick={handleClose} className="w-100">
            Confirm
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ChangePasswordModal
