import { zUpdatePasswordTrpcInput } from '@pstore/backend/src/router/updatePassword/input'
import { zPasswordsMustBeTheSame, zStringRequired } from '@pstore/shared/src/zod'
import { Alert, Button, Form, Modal } from 'react-bootstrap'

import { useForm } from '../../lib/form'
import { trpc } from '../../lib/trpc'

const ChangePasswordModal = ({ open, close }: { open: boolean; close: () => void }) => {
  // const trpcUtils = trpc.useUtils()
  const updatePassword = trpc.updatePassword.useMutation()

  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordAgain: '',
    },
    validationSchema: zUpdatePasswordTrpcInput
      .extend({
        newPasswordAgain: zStringRequired,
      })
      .superRefine(zPasswordsMustBeTheSame('password', 'passwordAgain')),
    onSubmit: async ({ newPassword, oldPassword }) => {
      await updatePassword.mutateAsync({ newPassword, oldPassword })
      // closeModal()
    },
    resetOnSuccess: true,
    showValidationAlert: true,
    successMessage: 'Пароль успешно изменен',
  })

  return (
    <Modal show={open} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Change password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="oldPassword">
            <Form.Label>Old password</Form.Label>
            <Form.Control
              type="password"
              name="oldPassword"
              value={formik.values.oldPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.oldPassword && !!formik.errors.oldPassword}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.oldPassword}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="newPassword">
            <Form.Label>New password</Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.newPassword && !!formik.errors.newPassword}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.newPassword}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="newPasswordAgain">
            <Form.Label>New password again</Form.Label>
            <Form.Control
              type="password"
              name="newPasswordAgain"
              value={formik.values.newPasswordAgain}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.newPasswordAgain && !!formik.errors.newPasswordAgain}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.newPasswordAgain}</Form.Control.Feedback>
          </Form.Group>
          <Alert {...alertProps} className="mt-3" />
          <Button {...buttonProps} variant="danger" className="w-100">
            Confirm
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ChangePasswordModal
