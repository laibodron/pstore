import type { TrpcRouterOutput } from '@pstore/backend/src/router'
import { Button, Card, Col, Row, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { getViewItemRoute } from '../../lib/routes'
import { Icon } from '../Icon'

const HorizontalCard = ({
  product,
  link = getViewItemRoute({ itemId: product.id }),
  onBuy = () => ({}),
  onAddToWishlist = () => {},
  heartLoading = false,
  cartLoading = false,
}: {
  product: Omit<TrpcRouterOutput['getProduct']['product'], 'categoryId'>
  link?: string
  onBuy?: () => void
  onAddToWishlist?: () => Promise<void> | void
  heartLoading?: boolean
  cartLoading?: boolean
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
              <div className="fw-bold">{product.price + ' '}₽</div>
            </Card.Title>
            <div className="d-flex justify-content-between h-100">
              <div className="d-flex flex-column justify-content-between gap-4">
                <Card.Text className="flex-grow-1">Краткое описание товара, пара строк.</Card.Text>
                <Card.Text className="">В наличии</Card.Text>
              </div>
              {/* className="d-flex h-100 align-items-center align-items-end" */}
              <div>
                <Icon
                  onClick={() => (heartLoading ? '' : onAddToWishlist())}
                  name={product.isFavoriteByMe ? 'dashedHeart' : 'heart'}
                  size={24}
                  className={`${heartLoading ? 'disabled ' : ''}me-4`}
                  style={{ cursor: 'pointer', opacity: heartLoading ? 0.5 : 1 }}
                />

                <Button
                  disabled={cartLoading}
                  onClick={onBuy}
                  variant={product.isInCart ? 'outline-primary' : 'primary'}
                >
                  {cartLoading ? (
                    <Spinner role="status" size="sm" />
                  ) : !product.isInCart ? (
                    'Buy'
                  ) : (
                    <Icon name="check" size={18} />
                  )}
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
