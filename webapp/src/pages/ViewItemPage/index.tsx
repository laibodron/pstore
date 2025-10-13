import type { TrpcRouterOutput } from '@pstore/backend/src/router'
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

const FavoriteButton = ({
  product,
  isFetching,
}: {
  product: NonNullable<TrpcRouterOutput['getProduct']['product']>
  isFetching: boolean
}) => {
  const trpcUtils = trpc.useUtils()
  const setProductFavorite = trpc.setItemFavorite.useMutation({
    onMutate: ({ isFavoriteByMe }) => {
      const oldGetProductData = trpcUtils.getProduct.getData({ productId: product.id })
      if (oldGetProductData?.product) {
        const newGetProductData = {
          ...oldGetProductData,
          product: {
            ...oldGetProductData.product,
            isFavoriteByMe,
          },
        }
        trpcUtils.getProduct.setData({ productId: product.id }, newGetProductData)
      }
    },
    onSuccess: () => {
      void trpcUtils.getProduct.invalidate({ productId: product.id })
    },
  })
  return (
    <>
      {setProductFavorite.isPending ? (
        <Spinner animation="border" className="me-4" />
      ) : (
        <Icon
          onClick={() => {
            setProductFavorite
              .mutateAsync({ productId: product.id, isFavoriteByMe: !product.isFavoriteByMe })
              .then(({ product: { isFavoriteByMe } }) => {
                if (isFavoriteByMe) {
                  //log it to mixpanel
                  console.log('z')
                }
              })
          }}
          name={product.isFavoriteByMe ? 'dashedHeart' : 'heart'}
          size={24}
          className="me-4"
          style={{ cursor: 'pointer' }}
        />
      )}
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
    isFetching: queryResult.isFetching,
  }),
  showLoaderOnFetching: false,
  title: ({ product }) => product.title,
})(({ product, isFetching, me }) => {
  const navigate = useNavigate()
  const addToCart = useCartStore((state) => state.addItem)
  const cartList = useCartStore((state) => state.items)
  const addToWishlist = useWishlistState((state) => state.addItem)
  // const wishlist: { id: string }[] = useWishlistState((state) => state.items)

  const isInWishlist = 1 //!!wishlist.find((el) => el.id === product.id)
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
            <FavoriteButton isFetching={isFetching} product={product} />
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
