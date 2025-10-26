import { zSignInTrpcInput } from '@pstore/backend/src/router/signIn/input'
import Cookies from 'js-cookie'
import { Alert, Button, Form, Modal } from 'react-bootstrap'

import { useForm } from '../../lib/form'
import { useModalStore } from '../../lib/store/useModal'
import { trpc } from '../../lib/trpc'

const LogInModal = ({ open, close }: { open: boolean; close: () => void }) => {
  const { closeModal } = useModalStore()
  const trpcUtils = trpc.useUtils()
  const signIn = trpc.signIn.useMutation()

  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      emailOrnumber: '',
      password: '',
    },
    validationSchema: zSignInTrpcInput,
    onSubmit: async (values) => {
      const { token, userId } = await signIn.mutateAsync(values)
      Cookies.set('token', token, { expires: 99999 })
      void trpcUtils.invalidate()
      closeModal()
    },
    successMessage: 'Вход успешный',
    showValidationAlert: true,
    resetOnSuccess: false,
  })

  return (
    <Modal show={open} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Phone number or email</Form.Label>
            <Form.Control
              type="text"
              name="emailOrnumber"
              value={formik.values.emailOrnumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.emailOrnumber && !!formik.errors.emailOrnumber}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.emailOrnumber}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.password && !!formik.errors.password}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
          </Form.Group>
          <Alert {...alertProps} className="mt-3" />
          <Button variant="link" className="mb-4 p-0">
            Forgot your password?
          </Button>
          <Button {...buttonProps} variant="success" className="w-100">
            Log In
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default LogInModal
