import { useState } from 'react'
import { Button, Card, Col, FormControl, InputGroup, Row } from 'react-bootstrap'

import { Icon } from '../Icon'

const CartItem = () => {
  const [count, setCount] = useState(1)

  const increment = () => {
    setCount((c) => c + 1)
  }
  const decrement = () => {
    setCount((c) => (c > 1 ? c - 1 : 1))
  }

  return (
    <Card className="mb-3">
      <Row className="g-0 align-items-center">
        {/* Фото слева */}
        <Col md={3}>
          <Card.Img
            src="https://vkplay.ru/hotbox/content_files/UgcStories/2025/04/28/b308f6f54026482a87807c7708d06eaf.png"
            alt="product"
            className="img-fluid rounded-start d-flex"
          />
        </Col>

        {/* Контент справа */}
        <Col>
          <Card.Body className="h-100">
            <Card.Title className="d-flex justify-content-between align-items-center mb-3">
              <div>Iphone 17</div>
              <div className="fw-bold">1234$</div>
            </Card.Title>
            <div className="d-flex justify-content-between h-100">
              <div className="d-flex flex-column justify-content-between gap-4">
                <InputGroup style={{ maxWidth: '140px' }}>
                  <Button variant="outline-secondary" onClick={decrement}>
                    –
                  </Button>
                  <FormControl value={count} readOnly className="text-center" />
                  <Button variant="outline-secondary" onClick={increment}>
                    +
                  </Button>
                </InputGroup>
              </div>
              <div>
                <Icon name="heart" size={24} className="me-3" />
                <Icon name="trash" size={24} className="" />
              </div>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  )
}

export default CartItem
