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
        <Card.Text>
          <Alert variant="danger">{message}</Alert>
          {children}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
