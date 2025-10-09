import { Alert, Card } from 'react-bootstrap'

export const ErrorPageComponent = ({
  title = 'Oops, error',
  message = 'Something went wrong',
  children,
}: {
  title?: string
  message?: string
  children?: React.ReactNode
}) => {
  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Body>
          <Alert variant="danger">{message}</Alert>
          {children}
        </Card.Body>
      </Card.Body>
    </Card>
  )
}
