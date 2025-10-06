import { zCreateProductInput } from '@pstore/backend/src/router/createProduct/input'
import { useFormik } from 'formik'
import { Button, Form } from 'react-bootstrap'
import { toFormikValidate } from 'zod-formik-adapter'

import { trpc } from '../../lib/trpc'

const AdminPanel = () => {
  const createProduct = trpc.createProduct.useMutation()
  const formik = useFormik({
    initialValues: {
      article: '',
      title: '',
      price: 0,
      description: '',
    },
    validate: toFormikValidate(zCreateProductInput),
    onSubmit: async (values) => {
      try {
        await createProduct.mutateAsync(values)
        formik.resetForm()
      } catch (e) {
        console.error('Ошибка при создании продукта', e)
      }
    },
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
        <Form.Label>title</Form.Label>
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
        <Form.Label>price</Form.Label>
        <Form.Control
          type="text"
          name="price"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.price && !!formik.errors.price}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.price}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>description</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.description && !!formik.errors.description}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.description}</Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" variant="primary">
        Отправить
      </Button>
    </Form>
  )
}

export default AdminPanel
