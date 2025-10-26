import { Button } from 'react-bootstrap'

import PageWithTitle from '../../components/PageWithTitle'
import ProductCard from '../../components/ProductCard'
import { useProductFavorite } from '../../hooks/useProductFavorite'
import { useMe } from '../../lib/ctx'
import { withPageWrapper } from '../../lib/pageWrapper'
import useLocalWishlistState from '../../lib/store/useWishlist'
import { trpc } from '../../lib/trpc'

const WishlistPage = withPageWrapper({
  useQuery: () => {
    const me = useMe()
    if (me) {
      return trpc.getFavorites.useQuery()
    }
    return undefined
  },
  setProps: ({ queryResult, ctx }) => {
    if (ctx.me) {
      return {
        products: queryResult?.data.favorites,
        count: queryResult?.data.count,
        me: ctx.me,
      }
    } else {
      const ids = useLocalWishlistState((state) => state.items)
      const data = trpc.getProductsById.useQuery({ ids: ids.map((el) => el.id) })
      const products = data.data?.productsById
      const count = data.data?.count
      return {
        products,
        count,
        me: ctx.me,
      }
    }
  },
  title: 'Wishlist',
  showLoaderOnFetching: false,
})(({ products, count, me }) => {
  const { toggleFavorite } = useProductFavorite({ me })

  return (
    <PageWithTitle title="Wishlist" subtitle={`${count} product`}>
      <>
        <Button
          onClick={async () =>
            await Promise.all(products?.map((el) => toggleFavorite({ productId: el.id, isFavoriteByMe: false })) ?? [])
          }
          variant="danger"
        >
          Clear
        </Button>
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </>
    </PageWithTitle>
  )
})

export default WishlistPage
