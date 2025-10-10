import { zCreateProductInput } from '@pstore/backend/src/router/createProduct/input'
import { Alert, Button, Form } from 'react-bootstrap'

import { UploadsToCloudinary } from '../../components/UploadsToCloudinary'
import { useForm } from '../../lib/form'
import { withPageWrapper } from '../../lib/pageWrapper'
import { trpc } from '../../lib/trpc'

const AdminPanel = withPageWrapper({
  title: 'Admin Panel',
  authorizedOnly: true,
})(() => {
  const createProduct = trpc.createProduct.useMutation()

  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      article: '',
      title: '',
      price: '',
      description: '',
      images: [],
    },
    validationSchema: zCreateProductInput,
    onSubmit: async (values) => {
      await createProduct.mutateAsync(values)
    },
    successMessage: 'Продукт успешно создан',
    showValidationAlert: true,
  })

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Article</Form.Label>
        <Form.Control
          type="text"
          name="article"
          value={formik.values.article}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.article && !!formik.errors.article}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.article}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.title && !!formik.errors.title}
        />

        <Form.Control.Feedback type="invalid">{formik.errors.title}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="text"
          name="price"
          value={formik.values.price}
          onChange={(e) => {
            let value = e.target.value.replace(',', '.')
            value = value.replace(/[^0-9.]/g, '')
            value = value.replace(/(\..*)\./g, '$1')
            formik.setFieldValue('price', value)
          }}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.price && !!formik.errors.price}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.price}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Images</Form.Label>
        <UploadsToCloudinary label="" name="images" formik={formik} type="image" preset="preview" />
        <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.description && !!formik.errors.description}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.description}</Form.Control.Feedback>
      </Form.Group>
      <Alert {...alertProps} className="mt-3" />
      <Button {...buttonProps} variant="primary">
        Отправить
      </Button>
    </Form>
  )
})

export default AdminPanel
