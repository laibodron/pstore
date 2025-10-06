import { Button, Carousel, Col, Row } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'

import { Icon } from '../../components/Icon'
import PageWithTitle from '../../components/PageWithTitle'

const ViewItemPage = () => {
  return (
    <PageWithTitle title="Motorola Z">
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
          <div className="me-4 fs-3 h-auto">1234$</div>
          <div>
            <Icon name="heart" size={24} className="me-4" />
            <Button variant="primary">Купить</Button>
          </div>
        </Col>
      </Row>
      <Row className="fs-6 mt-4">
        <h1 className="fs-4 mb-3">Description</h1>
        Description Description Description Description Description Description Description Description Description
        Description Description Description Description Description Description Description Description Description
        Description Description Description Description Description Description Description Description Description
        Description Description Description Description
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
