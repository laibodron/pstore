import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

import useCityState from '../../lib/store/useCity'

const CityModal = ({ open, close }: { open: boolean; close: () => void }) => {
  const { city, changeCity } = useCityState()
  const [cityVal, setCityVal] = useState(city)
  return (
    <Modal show={open} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>City</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Phone number or email</Form.Label>
            <Form.Control type="text" name="city" value={cityVal} onChange={(e) => setCityVal(e.target.value)} />
          </Form.Group>
          <Button
            onClick={() => {
              changeCity(cityVal)
              close()
            }}
            variant="success"
            className="w-100"
          >
            Выбрать
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default CityModal
