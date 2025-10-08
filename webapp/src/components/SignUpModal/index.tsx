import { zSignUpTrpcInput } from '@pstore/backend/src/router/signUp/input'
import { zPasswordsMustBeTheSame, zStringRequired } from '@pstore/shared/src/zod'
import Cookies from 'js-cookie'
import { Alert, Button, Form, Modal } from 'react-bootstrap'

import { useForm } from '../../lib/form'
import { useModalStore } from '../../lib/store/useModal'
import { trpc } from '../../lib/trpc'

const SignUpModal = ({ open, close }: { open: boolean; close: () => void }) => {
  const { closeModal } = useModalStore()
  const trpcUtils = trpc.useUtils()
  const signUp = trpc.signUp.useMutation()

  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      phoneNumber: '',
      username: '',
      email: '',
      name: '',
      surname: '',
      password: '',
      passwordAgain: '',
    },
    validationSchema: zSignUpTrpcInput
      .extend({
        passwordAgain: zStringRequired,
      })
      .superRefine(zPasswordsMustBeTheSame('password', 'passwordAgain')),
    onSubmit: async (values) => {
      const { token, userId } = await signUp.mutateAsync(values)
      Cookies.set('token', token, { expires: 99999 })
      void trpcUtils.invalidate()
      closeModal()
    },
    resetOnSuccess: false,
    showValidationAlert: true,
    successMessage: 'Успешная регистрация',
  })

  return (
    <Modal show={open} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="phoneNumber">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              type="tel"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.phoneNumber && !!formik.errors.phoneNumber}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.phoneNumber}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.username && !!formik.errors.username}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.email && !!formik.errors.email}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Firstname</Form.Label>
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
          <Form.Group className="mb-3" controlId="surname">
            <Form.Label>Lastname</Form.Label>
            <Form.Control
              type="text"
              name="surname"
              value={formik.values.surname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.surname && !!formik.errors.surname}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.surname}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
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
          <Form.Group className="mb-3" controlId="passwordAgain">
            <Form.Label>Password again</Form.Label>
            <Form.Control
              type="password"
              name="passwordAgain"
              value={formik.values.passwordAgain}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.passwordAgain && !!formik.errors.passwordAgain}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.passwordAgain}</Form.Control.Feedback>
          </Form.Group>
          <Alert {...alertProps} className="mt-3" />
          <Button {...buttonProps} variant="success" onClick={() => ({})} className="w-100">
            Sign In
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default SignUpModal
