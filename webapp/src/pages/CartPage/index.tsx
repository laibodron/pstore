import { Card, Col, Row } from 'react-bootstrap'

import CartItem from '../../components/CartItem'
import PageWithTitle from '../../components/PageWithTitle'

const CartPage = () => {
  // const isCartEmpty = false
  return (
    <PageWithTitle title="Cart" subtitle="42 товара">
      <Row>
        <Col md={8}>
          <CartItem />
          <CartItem />
          <CartItem />
        </Col>
        <Col md={4}>
          <Card className="mb-3 p-3 fs-6">
            <Row>
              <Col className="pb-3">Total</Col>
            </Row>
            <Row>
              <Col className="fw-bold d-flex justify-content-between align-items-center">
                <div>1 товар</div>
                <div>1 999$</div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </PageWithTitle>
  )
}

export default CartPage
