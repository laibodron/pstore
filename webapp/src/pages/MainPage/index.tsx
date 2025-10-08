import { Button, Card } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom'

import { withPageWrapper } from '../../lib/pageWrapper'
import { getViewItemRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

const MainPage = withPageWrapper({
  useQuery: () => trpc.getNRandomProducts.useQuery({ n: 5 }),
  setProps: ({ queryResult, ctx }) => ({
    products: queryResult.data.products,
    me: ctx.me,
  }),
  title: '',
})(({ products, me }) => {
  return (
    <div className="d-flex flex-column gap-5">
      <Image
        src="https://img1.akspic.ru/attachments/originals/9/5/8/9/39859-pustynya-propoved-dikaya_mestnost-kompania-gornyj_relef-7500x2344.jpg"
        fluid
      />
      <div className="d-flex justify-content-around mt-4">
        {products.map((product) => (
          <Card as={Link} to={getViewItemRoute({ itemId: product.id })} key={product.id} style={{ width: '18rem' }}>
            <Card.Img
              variant="top"
              src="https://vkplay.ru/hotbox/content_files/UgcStories/2025/04/28/b308f6f54026482a87807c7708d06eaf.png"
            />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text className="d-flex justify-content-between align-items-center fs-5 mt-4">
                {product.price}$
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  )
})

export default MainPage
