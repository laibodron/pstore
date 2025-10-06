import { Accordion, Button, Col, Form, Pagination, Row } from 'react-bootstrap'

import HorizontalCard from '../../components/HorizontalCard'
import PageWithTitle from '../../components/PageWithTitle'

const CatalogPage = () => {
  return (
    <PageWithTitle title="Catalog" subtitle="1234 products">
      <Row>
        <Col>
          <Accordion defaultActiveKey="0" alwaysOpen>
            {/* Simple checkboxes */}
            <Accordion.Item eventKey="0">
              <Accordion.Header>Filter #1</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Check type="checkbox" id="checkbox-1" label="Simple checkbox 1" />
                  <Form.Check type="checkbox" id="checkbox-2" label="Simple checkbox 2" />
                  <Form.Check type="checkbox" id="checkbox-3" label="Simple checkbox 3" />
                </Form>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="0">
              <Accordion.Header>Filter #2</Accordion.Header>
              <Accordion.Body>
                <Form className="d-flex gap-2">
                  <Form.Control aria-label="Dollar" />
                  <Form.Control aria-label="Dollar" />
                </Form>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="0">
              <Accordion.Header>Filter #3</Accordion.Header>
              <Accordion.Body>
                <Form>
                  <Form.Control aria-label="Dollar" className="mb-4" />
                  <Form.Check type="checkbox" id="checkbox-1" label="Simple checkbox 1" />
                  <Form.Check type="checkbox" id="checkbox-2" label="Simple checkbox 2" />
                  <Form.Check type="checkbox" id="checkbox-3" label="Simple checkbox 3" />
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <div className="mt-4 d-flex justify-content-center">
            <Button variant="warning">Reset filter</Button>
          </div>
        </Col>
        <Col md={9}>
          <Row>
            <Col>
              <Form.Select name="sort" aria-label="Default select example" className="mb-4 w-auto">
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
              <HorizontalCard />
              <HorizontalCard />
              <HorizontalCard />
              <HorizontalCard />

              <div className="mt-3 d-flex justify-content-center">
                <Button variant="primary">More</Button>
              </div>
              <div className="mt-5 d-flex justify-content-center">
                <Pagination>
                  <Pagination.First />
                  <Pagination.Prev />
                  <Pagination.Item>{1}</Pagination.Item>
                  <Pagination.Ellipsis />

                  <Pagination.Item>{10}</Pagination.Item>
                  <Pagination.Item>{11}</Pagination.Item>
                  <Pagination.Item active>{12}</Pagination.Item>
                  <Pagination.Item>{13}</Pagination.Item>
                  <Pagination.Item disabled>{14}</Pagination.Item>

                  <Pagination.Ellipsis />
                  <Pagination.Item>{20}</Pagination.Item>
                  <Pagination.Next />
                  <Pagination.Last />
                </Pagination>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </PageWithTitle>
  )
}

export default CatalogPage
