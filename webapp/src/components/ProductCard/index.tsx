import type { TrpcRouterOutput } from '@pstore/backend/src/router'
import { useNavigate } from 'react-router-dom'

import { useProductCart } from '../../hooks/useProductCart'
import { useProductFavorite } from '../../hooks/useProductFavorite'
import { getCartRoute } from '../../lib/routes'
import HorizontalCard from '../HorizontalCard'

const ProductCard = ({ product }: { product: TrpcRouterOutput['getProduct']['product'] }) => {
  const { toggleFavorite, isPending: favoriteIsPending } = useProductFavorite()
  const { updateCart, isPending: cartIsPending } = useProductCart()
  const navigate = useNavigate()
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
