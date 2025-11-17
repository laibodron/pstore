import { zCreateCategoryInput } from '@pstore/backend/src/router/createCategory/input'
import { Alert, Button, Form } from 'react-bootstrap'

import { useForm } from '../../lib/form'
import { trpc } from '../../lib/trpc'

const CreateCategory = () => {
  const createCategory = trpc.createCategory.useMutation()

  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      name: '',
    },
    validationSchema: zCreateCategoryInput,
    onSubmit: async (values) => {
      await createCategory.mutateAsync(values)
    },
    successMessage: 'Категория успешно создана',
    showValidationAlert: true,
  })

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.name && !!formik.errors.name}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
      </Form.Group>
      <Alert {...alertProps} className="mt-3" />
      <Button {...buttonProps} variant="primary">
        Отправить
      </Button>
    </Form>
  )
}

export default CreateCategory
