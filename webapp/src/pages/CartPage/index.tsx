import { useCallback } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'

import CartItem from '../../components/CartItem'
import PageWithTitle from '../../components/PageWithTitle'
import { withPageWrapper } from '../../lib/pageWrapper'
import { getViewItemRoute } from '../../lib/routes'
import useCart from '../../lib/store/useCart'
import { trpc } from '../../lib/trpc'

const CartPage = withPageWrapper({
  useQuery: () => {
    const items = useCart((state) => state.items)
    return trpc.getProductsById.useQuery({
      ids: items.map((i) => i.id),
    })
  },
  setProps: ({ queryResult, ctx, checkExists }) => ({
    products: checkExists(queryResult.data.productsById, 'Products By Id not found'),
    count: checkExists(queryResult.data.count, 'Counts not found'),
    me: ctx.me,
  }),
  title: 'Cart',
})(({ products, count, me }) => {
  const cart = useCart()
  const productsWithInCart = products.map((product) => ({
    ...product,
    quantity: cart.items.find((i) => i.id === product.id)?.quantity || 1,
  }))

  const callbacks = {
    onAdd: useCallback(
      (id: string, count: number) => {
        cart.addItem(id, count)
      },
      [cart]
    ),
    onRemove: useCallback(
      (id: string) => {
        cart.removeItem(id)
      },
      [cart]
    ),
    onClear: useCallback(() => {
      cart.clearCart()
    }, [cart]),
  }

  return (
    <PageWithTitle title="Cart" subtitle={`${count} товара`}>
      <Row>
        <Col md={8}>
          {productsWithInCart.map((product) => (
            <CartItem
              onAdd={(count: number) => callbacks.onAdd(product.id, count)}
              onRemove={() => callbacks.onRemove(product.id)}
              link={getViewItemRoute({ itemId: product.id })}
              key={product.id}
              product={product}
            />
          ))}
        </Col>
        <Col md={4}>
          <Card className="mb-3 p-3 fs-6">
            <Row>
              <Col className="pb-3">Total</Col>
            </Row>
            <Row>
              <Col className="fw-bold d-flex justify-content-between align-items-center">
                <div>{productsWithInCart.reduce((prevVal, el) => prevVal + el.quantity, 0)} товар</div>
                <div>{productsWithInCart.reduce((prevVal, el) => prevVal + el.quantity * el.price, 0)}$</div>
              </Col>
            </Row>
          </Card>
          <Button onClick={callbacks.onClear} variant="danger" className="mb-3">Clear</Button>
        </Col>
      </Row>
    </PageWithTitle>
  )
})

export default CartPage
