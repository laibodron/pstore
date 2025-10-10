import type { TrpcRouterOutput } from '@pstore/backend/src/router'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { getViewItemRoute } from '../../lib/routes'
import { Icon } from '../Icon'

type productType = Pick<TrpcRouterOutput['getProduct']['product'], 'id' | 'title' | 'price'> & {
  description?: string | null
  countInCart?: number
  isInWishlist?: boolean
  images?: string[]
}

const HorizontalCard = ({
  product,
  link = getViewItemRoute({ itemId: product.id }),
  onBuy = () => ({}),
  onAddToWishlist = () => ({}),
}: {
  product: productType
  link?: string
  onBuy?: () => void
  onAddToWishlist: () => void
}) => {
  return (
    <Card className="mb-3">
      <Row className="g-0 align-items-center">
        {/* Фото слева */}
        <Col as={Link} to={link} md={3}>
          <Card.Img
            src={product.images && product.images[0]}
            alt="product"
            className="img-fluid rounded-start d-flex"
            // onClick={() => console.info('click')}
          />
        </Col>

        {/* Контент справа */}
        <Col>
          <Card.Body className="h-100">
            <Card.Title as={Link} to={link} className="d-flex justify-content-between align-items-center mb-3 fs-5">
              <div className="w-75">{product.title}</div>
              <div className="fw-bold">{product.price}$</div>
            </Card.Title>
            <div className="d-flex justify-content-between h-100">
              <div className="d-flex flex-column justify-content-between gap-4">
                <Card.Text className="flex-grow-1">Краткое описание товара, пара строк.</Card.Text>
                <Card.Text className="">В наличии</Card.Text>
              </div>
              {/* className="d-flex h-100 align-items-center align-items-end" */}
              <div>
                <Icon
                  onClick={onAddToWishlist}
                  name={product.isInWishlist ? 'dashedHeart' : 'heart'}
                  size={24}
                  className="me-4"
                  style={{ cursor: 'pointer' }}
                />

                <Button onClick={onBuy} variant={product.countInCart ? 'outline-primary' : 'primary'}>
                  {!product.countInCart ? 'Buy' : <Icon name="check" size={18} />}
                </Button>
              </div>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  )
}

export default HorizontalCard
