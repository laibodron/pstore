import { Button, Carousel, Col, Row, Spinner } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'

import { Icon } from '../../components/Icon'
import PageWithTitle from '../../components/PageWithTitle'
import { trpc } from '../../lib/trpc'

const ViewItemPage = () => {
  const { data, error, isLoading } = trpc.getProduct.useQuery({ productId: 'b4904cd5-6ce1-454f-8da8-5dd5727d1ba6' })

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <PageWithTitle title={data?.product.title}>
      <Row>
        <Col md={6}>
          <Carousel data-bs-theme="dark" interval={null}>
            <Carousel.Item>
              <Image
                fluid
                src="https://vkplay.ru/hotbox/content_files/UgcStories/2025/04/28/b308f6f54026482a87807c7708d06eaf.png"
              />
            </Carousel.Item>
            <Carousel.Item>
              <Image fluid src="https://www.liceyszr.minobr63.ru/wp-content/uploads/2020/04/s1200.jpg" />
            </Carousel.Item>
            <Carousel.Item>
              <Image
                fluid
                src="https://static.tildacdn.com/tild6663-3838-4365-a135-626231613431/1614577810_4-p-foto-.png"
              />
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col className="d-flex justify-content-end">
          <div className="me-4 fs-3 h-auto">{data?.product.price}$</div>
          <div>
            <Icon name="heart" size={24} className="me-4" />
            <Button variant="primary">Купить</Button>
          </div>
        </Col>
      </Row>
      <Row className="fs-6 mt-4">
        <h1 className="fs-4 mb-3">Description</h1>
        {data?.product.description}
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
}

export default ViewItemPage
