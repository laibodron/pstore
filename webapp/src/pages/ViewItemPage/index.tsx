import { getCloudinaryUploadUrl } from '@pstore/shared/src/cloudinary'
import { useEffect } from 'react'
import { Button, Carousel, Col, Row, Spinner } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import { useNavigate } from 'react-router-dom'

import { Icon } from '../../components/Icon'
import PageWithTitle from '../../components/PageWithTitle'
import { withPageWrapper } from '../../lib/pageWrapper'
import { getCartRoute, getViewItemRoute } from '../../lib/routes'
import useCartStore from '../../lib/store/useCart'
import useWishlistState from '../../lib/store/useWishlist'
import { trpc } from '../../lib/trpc'

const ViewItemPage = withPageWrapper({
  useQuery: () => {
    const { itemId } = getViewItemRoute.useParams()
    return trpc.getProduct.useQuery({ productId: itemId })
  },
  setProps: ({ queryResult, ctx, checkExists }) => ({
    product: checkExists(queryResult.data.product, 'Product not found'),
    me: ctx.me,
  }),
  title: ({ product }) => product.title,
})(({ product, me }) => {
  const navigate = useNavigate()
  const addToCart = useCartStore((state) => state.addItem)
  const cartList = useCartStore((state) => state.items)
  const addToWishlist = useWishlistState((state) => state.addItem)
  const wishlist = useWishlistState((state) => state.items)

  const isInWishlist = !!wishlist.find((el) => el.id === product.id)
  const isInCart = cartList.find((el) => el.id === product.id && el.quantity > 0)
  const callbacks = {
    onBuy: (id: string) => {
      if (cartList.find((p) => p.id === id)?.quantity) {
        navigate(getCartRoute())
      } else {
        addToCart(id)
      }
    },
  }

  return (
    <PageWithTitle title={product.title}>
      <Row>
        <Col md={6}>
          <Carousel data-bs-theme="dark" interval={null}>
            {product.images.map((image) => (
              <Carousel.Item key={image}>
                <Image fluid src={image} />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col className="d-flex justify-content-end">
          <div className="me-4 fs-3 h-auto">{product.price}$</div>
          <div>
            <Icon
              onClick={() => addToWishlist(product.id)}
              name={isInWishlist ? 'dashedHeart' : 'heart'}
              size={24}
              className="me-4"
              style={{ cursor: 'pointer' }}
            />
            {/* <Icon name="heart" size={24} className="me-4" /> */}
            <Button onClick={() => callbacks.onBuy(product.id)} variant="primary">
              {isInCart ? <Icon name="check" size={18} /> : 'Buy'}
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="fs-6 mt-4">
        <h1 className="fs-4 mb-3">Description</h1>
        {product.description}
      </Row>
      <Row className="fs-6 mt-4">
        <h1 className="fs-4 mb-3">Specifications</h1>
        <ul>
          <li>Specification 1</li>
          <li>Specification 2</li>
          <li>Specification 3</li>
          <li>Specification 4</li>
          <li>Specification 5</li>
        </ul>
      </Row>
    </PageWithTitle>
  )
})

export default ViewItemPage
