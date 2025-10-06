// import { Container } from 'react-bootstrap'

const PageWithTitle = ({
  title = '',
  subtitle = '',
  children = '',
}: {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  children?: React.ReactNode
}) => {
  return (
    // <Container className="px-0">
    <div>
      {(title || subtitle) && (
        <div className="mt-4 display-6 d-flex align-items-center gap-3">
          <h1 className="fs-2">{title}</h1>
          {!!subtitle && <h2 className="fs-4 fw-normal opacity-50">{subtitle}</h2>}
        </div>
      )}
      <div className="mt-4">{children}</div>
    </div>
    // </Container>
  )
}

export default PageWithTitle
