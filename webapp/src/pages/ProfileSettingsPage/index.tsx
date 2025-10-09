import { zUpdateProfileTrpcInput } from '@pstore/backend/src/router/updateProfile/input'
import { Alert, Button, Col, Form, Row } from 'react-bootstrap'

import { UploadToCloudinary } from '../../components/UploadToCloudinary'
import { useForm } from '../../lib/form'
import { withPageWrapper } from '../../lib/pageWrapper'
import { useModalStore } from '../../lib/store/useModal'
import { trpc } from '../../lib/trpc'

const ProfileSettingsPage = withPageWrapper({
  setProps: ({ ctx }) => ({
    me: ctx.me,
  }),
  title: 'Profile Settings',
  authorizedOnly: true,
})(({ me }) => {
  const openChangePassword = useModalStore((state) => state.openChangePassword)
  const trpcUtils = trpc.useUtils()
  const updateProfile = trpc.updateProfile.useMutation()

  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      email: me?.email || '',
      phoneNumber: me?.phoneNumber || '',
      username: me?.username || '',
      name: me?.name || '',
      surname: me?.surname || '',
      avatarUrl: me?.avatarUrl || '',
    },
    validationSchema: zUpdateProfileTrpcInput,
    onSubmit: async (values) => {
      await updateProfile.mutateAsync(values)
      void trpcUtils.invalidate()
    },
    successMessage: 'Данные успешно обновлены',
    showValidationAlert: true,
  })

  return (
    <>
      <Row className="mb-4">
        <Col md={3} className="d-flex gap-3">
          {/* <Image
            fluid
            src="https://yt3.googleusercontent.com/3e9LhcEPG7dqlM5fdBrfin8NvN0CRR0-TXZ4IvOPGBulkBKn9d2fQCPWxMjD-phkzMx8P2AK6A=s900-c-k-c0x00ffffff-no-rj"
            roundedCircle
          /> */}
          <UploadToCloudinary label="" name="avatarUrl" type="avatar" preset="big" formik={formik} />
        </Col>
        <Col className="d-flex flex-column justify-content-center gap-3">
          <h4 className="fs-4">{`${me?.name} ${me?.surname}`}</h4>
          <p className="">Registration date: {me?.createdAt ? new Date(me.createdAt).toLocaleDateString() : ''}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Row>
              <Form.Group as={Col} className="mb-3" controlId="surname">
                <Form.Label>Surname</Form.Label>
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
              <Form.Group as={Col} className="mb-3" controlId="name">
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
            </Row>
            <Row>
              <Form.Group as={Col} className="mb-3" controlId="phoneNumber">
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
              <Form.Group as={Col} className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.email && !!formik.errors.email}
                />
                <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} className="mb-3" controlId="username">
                <Form.Label>Nickname</Form.Label>
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
              <Form.Group
                as={Col}
                className="mb-3 d-flex h-100 align-self-end justify-content-center"
                controlId="exampleForm.ControlInput1"
              >
                <Button {...buttonProps} variant="success">
                  Apply changes
                </Button>
              </Form.Group>
            </Row>
            <Row>
              <Alert {...alertProps} className="mt-3" />
            </Row>
            <Row>
              <Col className="d-flex justify-content-center">
                <Button onClick={openChangePassword}>Change password</Button>
              </Col>
              <Col></Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  )
})

export default ProfileSettingsPage
