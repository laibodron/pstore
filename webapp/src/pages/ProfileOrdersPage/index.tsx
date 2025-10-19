import { Col, Row, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion'

import HorizontalCard from '../../components/HorizontalCard'
import OrderItem from '../../components/OrderItem'
import { withPageWrapper } from '../../lib/pageWrapper'
import { trpc } from '../../lib/trpc'

const ProfileOrdersPage = withPageWrapper({
  useQuery: () => trpc.getMyOrders.useQuery(),
  setProps: ({ queryResult, ctx }) => ({
    me: ctx.me,
    orders: queryResult.data.myOrders,
  }),
  title: 'My Orders',
})(({ orders, me }) => {
  return (
    <>
      <Row className="mb-4">
        <Col>
          <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
            <ToggleButton variant="outline-primary" id="tbg-radio-1" value={1}>
              All
            </ToggleButton>
            <ToggleButton variant="outline-primary" id="tbg-radio-2" value={2}>
              Opened
            </ToggleButton>
            <ToggleButton variant="outline-primary" id="tbg-radio-3" value={3}>
              Redeemed
            </ToggleButton>
            <ToggleButton variant="outline-primary" id="tbg-radio-4" value={4}>
              Cancelled
            </ToggleButton>
          </ToggleButtonGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* Orders will be displayed here */}
          {orders.length ? (
            orders.map((el) => (
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <div className="w-100 d-flex justify-content-between me-3">
                      <div>{`Заказ №${el.serialNumber} от ${el.createdAt.toLocaleDateString()}`}</div>
                      <div>{`${el.totalPrice} ₽`}</div>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div>Статус: {el.status}</div>
                    <div>Телефон: {el.phoneNumber}</div>
                    {el.email && <div>Email: {el.email}</div>}
                    <div>
                      Ссылка для оплаты:{' '}
                      <a href={`https://yoomoney.ru/api-pages/v2/payment-confirm/epl?orderId=${el.paymentId}`}>Тык</a>
                    </div>
                  </Accordion.Body>
                  <Accordion.Body>
                    {el.products.map((product) => (
                      <OrderItem product={product} />
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))
          ) : (
            <p>No orders to display.</p>
          )}
        </Col>
      </Row>
    </>
  )
})

export default ProfileOrdersPage
