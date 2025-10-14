import type { TrpcRouterOutput } from '@pstore/backend/src/router'

import { useProductFavorite } from '../../lib/useProductFavorite'
import HorizontalCard from '../HorizontalCard'

const ProductCard = ({ product }: { product: TrpcRouterOutput['getProduct']['product'] }) => {
  const { toggleFavorite, isPending } = useProductFavorite({ productId: product.id })

  return (
    <HorizontalCard
      key={product.id}
      product={product}
      onAddToWishlist={() => toggleFavorite(!product.isFavoriteByMe)}
      onBuy={() => {}}
      heartLoading={isPending}
    />
  )
}

export default ProductCard
