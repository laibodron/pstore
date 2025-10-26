import { zGetProductsInput } from '@pstore/backend/src/router/getProducts/input'
import { Accordion, Button, Col, Form, Row } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'

import PageWithTitle from '../../components/PageWithTitle'
import PaginationC from '../../components/PaginationC'
import ProductCard from '../../components/ProductCard'
import { useForm } from '../../lib/form'
import { withPageWrapper } from '../../lib/pageWrapper'
import { trpc } from '../../lib/trpc'

const CatalogPage = withPageWrapper({
  useQuery: () => undefined,
  setProps: ({ ctx }) => ({
    me: ctx.me,
  }),

  title: 'Catalog',
  showLoaderOnFetching: true,
})(({ me }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get('page') || 1)

  const { formik } = useForm({
    initialValues: {
      sort: 'price-asc',
      limit: 10,
    },
    validationSchema: zGetProductsInput.pick({ sort: true, limit: true }),
  })

  const { data, isFetching, isPlaceholderData } = trpc.getProducts.useQuery(
    { page, limit: formik.values.limit, sort: formik.values.sort },
    { placeholderData: (previousData) => previousData }
  )

  const products = data?.products ?? []
  const count = data?.count ?? 0
  const totalCountPages = data?.totalCountPages ?? 0

  const goToPage = (p: number, withScroll: boolean = true) => {
    if (p >= 1 && p <= totalCountPages) {
      setSearchParams({ page: String(p) })
      if (withScroll) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }
    }
  }

  return (
    <PageWithTitle title="Catalog" subtitle={`${count} products`}>
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
                  <Form.Check type="checkbox" id="checkbox-11" label="Simple checkbox 1" />
                  <Form.Check type="checkbox" id="checkbox-22" label="Simple checkbox 2" />
                  <Form.Check type="checkbox" id="checkbox-33" label="Simple checkbox 3" />
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
            <Col className={`${isFetching && isPlaceholderData ? 'opacity-50' : ''}`}>
              <Form.Select
                value={formik.values.sort}
                onChange={(e) => {
                  goToPage(1, false)
                  formik.handleChange(e)
                }}
                onBlur={formik.handleBlur}
                name="sort"
                aria-label="price-desc"
                className="mb-4 w-auto"
              >
                <option value="price-asc">Сначала недорогие</option>
                <option value="price-desc">Сначала дорогие</option>
                <option value="name-asc">По названию (возр)</option>
                <option value="name-desc">По названию (убыв)</option>
                <option value="time-desc">Сначала новые</option>
              </Form.Select>
              <div>
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* <div className="mt-3 d-flex justify-content-center">
                <Button variant="primary">More</Button>
              </div> */}
              <div className="mt-5 d-flex justify-content-between align-items-center">
                {!!totalCountPages && (
                  <>
                    <PaginationC
                      disabled={isFetching}
                      totalCountPages={totalCountPages}
                      currentPage={page}
                      setCurrentPage={goToPage}
                    />
                    <Form.Select
                      value={formik.values.limit}
                      onChange={(e) => {
                        goToPage(1, false)
                        formik.handleChange(e)
                      }}
                      onBlur={formik.handleBlur}
                      name="limit"
                      aria-label="price-desc"
                      className="w-auto"
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </Form.Select>
                  </>
                )}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </PageWithTitle>
  )
})

export default CatalogPage
