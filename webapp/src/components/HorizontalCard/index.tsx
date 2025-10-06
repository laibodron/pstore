import { Button, Card, Col, Row } from 'react-bootstrap'

import { Icon } from '../Icon'

const HorizontalCard = () => {
  return (
    <Card className="mb-3">
      <Row className="g-0 align-items-center">
        {/* Фото слева */}
        <Col md={3}>
          <Card.Img
            src="https://vkplay.ru/hotbox/content_files/UgcStories/2025/04/28/b308f6f54026482a87807c7708d06eaf.png"
            alt="product"
            className="img-fluid rounded-start d-flex"
          />
        </Col>

        {/* Контент справа */}
        <Col>
          <Card.Body className="h-100">
            <Card.Title className="d-flex justify-content-between align-items-center mb-3">
              <div>Iphone 17</div>
              <div className="fw-bold">1234$</div>
            </Card.Title>
            <div className="d-flex justify-content-between h-100">
              <div className="d-flex flex-column justify-content-between gap-4">
                <Card.Text className="flex-grow-1">Краткое описание товара, пара строк.</Card.Text>
                <Card.Text className="">В наличии</Card.Text>
              </div>
              {/* className="d-flex h-100 align-items-center align-items-end" */}
              <div>
                <Icon name="heart" size={24} className="me-4" />
                <Button variant="primary">Купить</Button>
              </div>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  )
}

export default HorizontalCard
