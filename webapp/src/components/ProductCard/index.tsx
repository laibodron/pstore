import type { TrpcRouterOutput } from '@pstore/backend/src/router'
import { useNavigate } from 'react-router-dom'

import { useProductCart } from '../../hooks/useProductCart'
import { useProductFavorite } from '../../hooks/useProductFavorite'
import { useMe } from '../../lib/ctx'
import { getCartRoute } from '../../lib/routes'
import useCartStore from '../../lib/store/useCart'
import useLocalWishlistState from '../../lib/store/useWishlist'
import HorizontalCard from '../HorizontalCard'

const ProductCard = ({ product }: { product: Omit<TrpcRouterOutput['getProduct']['product'], 'categoryId'> }) => {
  const me = useMe()
  const { toggleFavorite, isPending: favoriteIsPending } = useProductFavorite({ me })
  const { updateCart, isPending: cartIsPending } = useProductCart({ me })
  const navigate = useNavigate()
  const isFavorite = useLocalWishlistState((state) => state.isExist(product.id))
  const isInCart = useCartStore((state) => state.qInCart(product.id) > 0)

  if (!me) {
    product.isFavoriteByMe = isFavorite
    product.isInCart = isInCart
  }

  return (
    <HorizontalCard
      key={product.id}
      product={product}
      onAddToWishlist={() => toggleFavorite({ productId: product.id, isFavoriteByMe: !product.isFavoriteByMe })}
      onBuy={() => {
        if (product.isInCart) {
          navigate(getCartRoute())
        } else {
          updateCart({ productId: product.id, count: 1 })
        }
      }}
      heartLoading={favoriteIsPending}
      cartLoading={cartIsPending}
    />
  )
}

export default ProductCard
