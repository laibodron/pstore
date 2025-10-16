import type { TrpcRouterOutput } from '@pstore/backend/src/router'
import { Button, Carousel, Col, Row, Spinner } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import { useNavigate } from 'react-router-dom'

import { Icon } from '../../components/Icon'
import PageWithTitle from '../../components/PageWithTitle'
import { useProductCart } from '../../hooks/useProductCart'
import { useProductFavorite } from '../../hooks/useProductFavorite'
import { withPageWrapper } from '../../lib/pageWrapper'
import { getCartRoute, getViewItemRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

const FavoriteButton = ({ product }: { product: NonNullable<TrpcRouterOutput['getProduct']['product']> }) => {
  const { toggleFavorite, isPending } = useProductFavorite()
  return (
    <>
      <Icon
        onClick={() => {
          toggleFavorite({ productId: product.id, isFavoriteByMe: !product.isFavoriteByMe }).then(() => {
            if (!product.isFavoriteByMe) {
              // log it to mixpanel
            }
          })
        }}
        name={product.isFavoriteByMe ? 'dashedHeart' : 'heart'}
        size={24}
        className="me-4 "
        style={{ cursor: 'pointer', opacity: isPending ? 0.5 : 1 }}
      />
    </>
  )
}

const ViewItemPage = withPageWrapper({
  useQuery: () => {
    const { itemId } = getViewItemRoute.useParams()
    return trpc.getProduct.useQuery({ productId: itemId })
  },
  setProps: ({ queryResult, ctx, checkExists }) => ({
    product: checkExists(queryResult.data.product, 'Product not found'),
    me: ctx.me,
  }),
  showLoaderOnFetching: false,
  title: ({ product }) => product.title,
})(({ product, me }) => {
  const navigate = useNavigate()
  const { updateCart, isPending: isPendingCart } = useProductCart()

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
            <FavoriteButton product={product} />
            <Button
              onClick={async () => {
                if (product.isInCart) {
                  navigate(getCartRoute())
                } else {
                  await updateCart({ productId: product.id, count: 1 })
                }
              }}
              variant={`${product.isInCart ? 'outline-' : ''}primary`}
            >
              {isPendingCart ? (
                <Spinner role="status" size="sm" />
              ) : product.isInCart ? (
                <Icon name="check" size={18} />
              ) : (
                'Buy'
              )}
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
