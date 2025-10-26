import { zCreateOrderInput } from '@pstore/backend/src/router/createOrder/input'
import omit from '@pstore/shared/src/omit'
import { useEffect, useMemo, useState } from 'react'
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap'

import CartItem from '../../components/CartItem'
import PageWithTitle from '../../components/PageWithTitle'
import { useProductCart } from '../../hooks/useProductCart'
import { useProductFavorite } from '../../hooks/useProductFavorite'
import { useMe } from '../../lib/ctx'
import { useForm } from '../../lib/form'
import { withPageWrapper } from '../../lib/pageWrapper'
import { getViewItemRoute } from '../../lib/routes'
import useCartStore from '../../lib/store/useCart'
import { trpc } from '../../lib/trpc'

const CartPage = withPageWrapper({
  useQuery: () => {
    const me = useMe()
    if (me) {
      return trpc.getCartList.useQuery()
    }
    return undefined
  },
  setProps: ({ queryResult, ctx }) => {
    return {
      products: ctx.me ? (queryResult?.data.cartList ?? []) : [],
      me: ctx.me,
    }
  },
  title: 'Cart',
  showLoaderOnFetching: false,
})(({ products: serverProducts, me }) => {
  const itemsMap = useCartStore((state) => state.items)
  const items = useMemo(() => Array.from(itemsMap, ([id, quantity]) => ({ id, quantity })), [itemsMap])

  const { data: localProductsData } = trpc.getProductsById.useQuery({ ids: items.map((el) => el.id) }, { enabled: !me })

  const products = useMemo(() => {
    return me
      ? serverProducts
      : (localProductsData?.productsById ?? []).map((el) => ({
          ...omit(el, ['isInCart']),
          countInCart: itemsMap.get(el.id) ?? 0,
        }))
  }, [me, serverProducts, itemsMap, localProductsData])

  const { updateCart } = useProductCart({ me })
  const { toggleFavorite } = useProductFavorite({ me })
  const createOrder = trpc.createOrder.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      phoneNumber: me?.phoneNumber || '',
      email: me?.email || '',
      cartItems: products,
    },
    validationSchema: zCreateOrderInput,
    onSubmit: async (values) => {
      const result = await createOrder.mutateAsync({
        cartItems: values.cartItems,
        phoneNumber: values.phoneNumber,
        email: values.email,
      })
      if (result.url) {
        window.open(result.url, '_blank')
      }
    },
    successMessage: 'Продукт успешно создан',
    showValidationAlert: true,
  })

  useEffect(() => {
    formik.setFieldValue('cartItems', products)
  }, [products])

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

  const [showForm, setShowForm] = useState(true)

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
              <Col className="fw-bold d-flex justify-content-between align-items-center mb-4">
                <div>{products.reduce((prevVal, el) => prevVal + el.countInCart, 0)} товар</div>
                <div>{products.reduce((prevVal, el) => prevVal + el.countInCart * el.price, 0) + ' '}₽</div>
              </Col>
            </Row>
            <Row>
              <Col>
                {/* <Button onClick={() => setShowForm(!showForm)} className="w-100" variant="success">
                  Оформить заказ
                </Button> */}
              </Col>
            </Row>
          </Card>
          <Button onClick={() => callbacks.onClear()} variant="danger" className="mb-3">
            Clear
          </Button>
          <Card className={`mb-3 p-3 fs-6${products.length ? '' : ' d-none'}`}>
            <Row>
              <Col>
                <Form noValidate onSubmit={formik.handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Номер телефона</Form.Label>
                    <Form.Control
                      type="text"
                      name="phoneNumber"
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.phoneNumber && !!formik.errors.phoneNumber}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.phoneNumber}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email (Необязательно)</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.email && !!formik.errors.email}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
                  </Form.Group>
                  <Alert {...alertProps} className="mt-3" />
                  <Button {...buttonProps} variant="primary">
                    Купить
                  </Button>
                </Form>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </PageWithTitle>
  )
})

export default CartPage
