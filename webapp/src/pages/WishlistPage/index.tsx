import HorizontalCard from '../../components/HorizontalCard'
import PageWithTitle from '../../components/PageWithTitle'
import { withPageWrapper } from '../../lib/pageWrapper'

const WishlistPage = withPageWrapper({
  title: 'Wishlist',
})(() => {
  return (
    <PageWithTitle title="Wishlist">
      {/* <HorizontalCard />
      <HorizontalCard />
      <HorizontalCard />
      <HorizontalCard /> */}
    </PageWithTitle>
  )
})

export default WishlistPage
