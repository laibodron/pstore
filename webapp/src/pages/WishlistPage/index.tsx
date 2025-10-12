import { useNavigate } from 'react-router-dom'

import HorizontalCard from '../../components/HorizontalCard'
import PageWithTitle from '../../components/PageWithTitle'
import { withPageWrapper } from '../../lib/pageWrapper'
import { getCartRoute } from '../../lib/routes'
import useCartStore from '../../lib/store/useCart'
import useWishlistState from '../../lib/store/useWishlist'
import { trpc } from '../../lib/trpc'

const WishlistPage = withPageWrapper({
  useQuery: () => {
    const items: { id: string }[] = useWishlistState((state) => state.items)
    return trpc.getProductsById.useQuery({
      ids: items.map((i) => i.id),
    })
  },
  setProps: ({ queryResult, ctx, checkExists }) => ({
    products: checkExists(queryResult.data.productsById, 'Products By Id not found'),
    count: checkExists(queryResult.data.count, 'Counts not found'),
    me: ctx.me,
  }),
  title: 'Wishlist',
})(({ products, count, me }) => {
  const navigate = useNavigate()
  const addToCart = useCartStore((state) => state.addItem)
  const cartList = useCartStore((state) => state.items)
  const addToWishlist = useWishlistState((state) => state.addItem)
  const wishlist: { id: string }[] = useWishlistState((state) => state.items)
  const productsWithCartAndWishlist = products.map((product) => ({
    ...product,
    countInCart: cartList.find((i) => i.id === product.id)?.quantity || 0,
    isInWishlist: !!wishlist.find((el) => product.id === el.id),
  }))
  const callbacks = {
    onBuy: (id: string) => {
      if (productsWithCartAndWishlist.find((p) => p.id === id)?.countInCart) {
        navigate(getCartRoute())
      } else {
        addToCart(id)
      }
    },
    onAddToWishlist: (id: string) => {
      addToWishlist(id)
    },
  }
  return (
    <PageWithTitle title="Wishlist" subtitle={`${count} product`}>
      {productsWithCartAndWishlist.map((product) => (
        <HorizontalCard
          onAddToWishlist={() => callbacks.onAddToWishlist(product.id)}
          onBuy={() => callbacks.onBuy(product.id)}
          key={product.id}
          product={product}
        />
      ))}
    </PageWithTitle>
  )
})

export default WishlistPage
