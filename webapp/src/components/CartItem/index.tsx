import type { TrpcRouterOutput } from '@pstore/backend/src/router'
import { useCallback, useState } from 'react'
import { Button, Card, Col, FormControl, InputGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { Icon } from '../Icon'

type productType = Pick<TrpcRouterOutput['getProduct']['product'], 'id' | 'title' | 'price'> & {
  quantity: number
}

const CartItem = ({
  product,
  link,
  onAdd = () => ({}),
  onRemove = () => ({}),
}: {
  product: productType
  link?: string
  onAdd: (arg0: number) => void
  onRemove: () => void
}) => {
  const increment = useCallback(() => {
    // setCount((c) => c + 1)
    onAdd(1)
  }, [onAdd, onRemove, product.quantity])

  const decrement = useCallback(() => {
    // setCount((c) => (c > 1 ? c - 1 : 1))
    if (product.quantity === 1) {
      onRemove()
      return
    } else {
      onAdd(-1)
    }
  }, [onAdd, onRemove, product.quantity])

  return (
    <Card className="mb-3">
      <Row className="g-0 align-items-center">
        {/* Фото слева */}
        <Col as={Link} to={link} md={3}>
          <Card.Img
            src="https://vkplay.ru/hotbox/content_files/UgcStories/2025/04/28/b308f6f54026482a87807c7708d06eaf.png"
            alt="product"
            className="img-fluid rounded-start d-flex"
          />
        </Col>

        {/* Контент справа */}
        <Col>
          <Card.Body className="h-100">
            <Card.Title
              as={Link}
              to={link || '/'}
              className="fs-5 d-flex justify-content-between align-items-center mb-3"
            >
              <div>{product.title}</div>
              <div className="fw-bold">{product.price}$</div>
            </Card.Title>
            <div className="d-flex justify-content-between h-100">
              <div className="d-flex flex-column justify-content-between gap-4">
                <InputGroup style={{ maxWidth: '140px' }}>
                  <Button variant="outline-secondary" onClick={decrement}>
                    –
                  </Button>
                  <FormControl value={product.quantity} readOnly className="text-center" />
                  <Button variant="outline-secondary" onClick={increment}>
                    +
                  </Button>
                </InputGroup>
              </div>
              <div>
                <Icon name="heart" size={24} className="me-3" style={{ cursor: 'pointer' }}/>
                <Icon onClick={onRemove} name="trash" size={24} style={{ cursor: 'pointer' }}/>
              </div>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  )
}

export default CartItem
