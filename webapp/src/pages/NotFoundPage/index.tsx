import Image from 'react-bootstrap/Image'

import { ErrorPageComponent } from '../../components/ErrorPageComponent'

const NotFoundPage = ({
  title = 'Not Found',
  message = 'This page does not exist',
}: {
  title?: string
  message?: string
}) => {
  return (
    <ErrorPageComponent title={title} message={message}>
      <Image fluid src="https://semantica.in/wp-content/uploads/2016/08/242424.png" />
    </ErrorPageComponent>
  )
}

export default NotFoundPage
