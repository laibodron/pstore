import type { TrpcRouterOutput } from '@pstore/backend/src/router'
import { Button, Card, Col, FormControl, InputGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { Icon } from '../Icon'

type productType = TrpcRouterOutput['getCartList']['cartList']
type productItemType = productType[number]

const CartItem = ({
  product,
  link,
  onIncrement = () => {},
  onDecrement = () => {},
  onRemove = () => {},
  onAddToWishlist = () => {},
}: {
  product: productItemType
  link?: string
  onIncrement?: () => Promise<void> | void
  onDecrement?: () => Promise<void> | void
  onRemove?: () => Promise<void> | void
  onAddToWishlist?: () => Promise<void> | void
}) => {
  return (
    <Card className="mb-3">
      <Row className="g-0 align-items-center">
        {/* Фото слева */}
        <Col as={Link} to={link} md={3}>
          <Card.Img src={product.images[0]} alt="product" className="img-fluid rounded-start d-flex" />
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
              <div className="fw-bold">{product.price + ' '}₽</div>
            </Card.Title>
            <div className="d-flex justify-content-between h-100">
              <div className="d-flex flex-column justify-content-between gap-4">
                <InputGroup style={{ maxWidth: '140px' }}>
                  <Button variant="outline-secondary" onClick={onDecrement}>
                    –
                  </Button>
                  <FormControl value={product.countInCart} readOnly className="text-center" />
                  <Button variant="outline-secondary" onClick={onIncrement}>
                    +
                  </Button>
                </InputGroup>
              </div>
              <div>
                <Icon
                  name={product.isFavoriteByMe ? 'dashedHeart' : 'heart'}
                  size={24}
                  className="me-3"
                  style={{ cursor: 'pointer' }}
                  onClick={onAddToWishlist}
                />
                <Icon onClick={onRemove} name="trash" size={24} style={{ cursor: 'pointer' }} />
              </div>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  )
}

export default CartItem
