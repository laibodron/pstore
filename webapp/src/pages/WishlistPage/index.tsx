import PageWithTitle from '../../components/PageWithTitle'
import ProductCard from '../../components/ProductCard'
import { withPageWrapper } from '../../lib/pageWrapper'
import { trpc } from '../../lib/trpc'

const WishlistPage = withPageWrapper({
  useQuery: () => {
    return trpc.getFavorites.useQuery()
  },
  setProps: ({ queryResult, ctx, checkExists }) => ({
    products: checkExists(queryResult.data.favorites, 'Products By Id not found'),
    count: checkExists(queryResult.data.count, 'Counts not found'),
    me: ctx.me,
  }),
  title: 'Wishlist',
  showLoaderOnFetching: false,
})(({ products, count, me }) => {
  return (
    <PageWithTitle title="Wishlist" subtitle={`${count} product`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </PageWithTitle>
  )
})

export default WishlistPage
