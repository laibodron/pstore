import { Button, Card, Col, Row } from 'react-bootstrap'

import CartItem from '../../components/CartItem'
import PageWithTitle from '../../components/PageWithTitle'
import { useProductCart } from '../../hooks/useProductCart'
import { useProductFavorite } from '../../hooks/useProductFavorite'
import { withPageWrapper } from '../../lib/pageWrapper'
import { getViewItemRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

const CartPage = withPageWrapper({
  useQuery: () => {
    return trpc.getCartList.useQuery()
  },
  setProps: ({ queryResult, ctx }) => ({
    products: queryResult.data.cartList,
    me: ctx.me,
  }),
  title: 'Cart',
  showLoaderOnFetching: false,
})(({ products }) => {
  const { updateCart } = useProductCart()
  const { toggleFavorite } = useProductFavorite()

  const callbacks = {
    onClear: async () => {
      await Promise.all(
        products.map((product) =>
          updateCart({
            productId: product.id,
            count: 0,
          })
        )
      )
    },
    onSetCount: async (product: (typeof products)[number], callback: (c: number) => number) => {
      await updateCart({
        productId: product.id,
        count: callback(product.countInCart),
      })
    },
  }

  return (
    <PageWithTitle title="Cart" subtitle={`${products.reduce((prevVal, el) => prevVal + el.countInCart, 0)} товара`}>
      <Row>
        <Col md={8}>
          {products.map((product) => (
            <CartItem
              onAddToWishlist={() => toggleFavorite({ productId: product.id, isFavoriteByMe: !product.isFavoriteByMe })}
              onIncrement={() => callbacks.onSetCount(product, (c) => c + 1)}
              onDecrement={() => callbacks.onSetCount(product, (c) => c - 1)}
              onRemove={() => callbacks.onSetCount(product, () => 0)}
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
                <div>{products.reduce((prevVal, el) => prevVal + el.countInCart, 0)} товар</div>
                <div>{products.reduce((prevVal, el) => prevVal + el.countInCart * el.price, 0)}$</div>
              </Col>
            </Row>
          </Card>
          <Button onClick={() => callbacks.onClear()} variant="danger" className="mb-3">
            Clear
          </Button>
        </Col>
      </Row>
    </PageWithTitle>
  )
})

export default CartPage
