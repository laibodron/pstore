import type { TrpcRouterOutput } from '@pstore/backend/src/router'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { getViewItemRoute } from '../../lib/routes'

const OrderItem = ({
  product,
  link = getViewItemRoute({ itemId: product.id }),
}: {
  product: TrpcRouterOutput['getMyOrders']['myOrders'][number]['products'][number]
  link?: string
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
          <Card.Body className="h-100 d-flex justify-content-between">
            <Card.Title as={Link} to={link} className="d-flex justify-content-between align-items-center mb-3 fs-5">
              <div className="w-100">{product.title}</div>
            </Card.Title>
            <Card.Text>
              <div className="">{`${product.count} шт. x ${product.price} ₽ = ${product.count * product.price} ₽`}</div>
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  )
}

export default OrderItem
