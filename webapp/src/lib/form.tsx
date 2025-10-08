import { TRPCClientError } from '@trpc/client'
import { type FormikHelpers, useFormik } from 'formik'
import { useMemo, useState } from 'react'
import { type AlertProps } from 'react-bootstrap/Alert'
import { type ButtonProps } from 'react-bootstrap/Button'
import { type z } from 'zod'
import { toFormikValidate } from 'zod-formik-adapter'
// import { sentryCaptureException } from './sentry'

export const useForm = <TZodSchema extends z.ZodObject<any>>({
  successMessage = false,
  resetOnSuccess = true,
  showValidationAlert = false,
  initialValues,
  validationSchema,
  onSubmit,
}: {
  successMessage?: string | false
  resetOnSuccess?: boolean
  showValidationAlert?: boolean
  initialValues: z.infer<TZodSchema>
  validationSchema?: TZodSchema
  onSubmit?: (values: z.infer<TZodSchema>, actions: FormikHelpers<z.infer<TZodSchema>>) => Promise<unknown> | unknown
}) => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false)
  const [submittingError, setSubmittingError] = useState<Error | null>(null)

  const formik = useFormik<z.infer<TZodSchema>>({
    initialValues,
    ...(validationSchema && { validate: toFormikValidate(validationSchema) }),
    onSubmit: async (values, formikHelpers) => {
      if (!onSubmit) {
        return
      }
      try {
        setSubmittingError(null)
        await onSubmit(values, formikHelpers)
        if (resetOnSuccess) {
          formik.resetForm()
        }
        setSuccessMessageVisible(true)
        setTimeout(() => {
          setSuccessMessageVisible(false)
        }, 3000)
      } catch (error: any) {
        if (!(error instanceof TRPCClientError)) {
          // sentryCaptureException(error)
          console.error('Вместо sentry ', error)
        }
        setSubmittingError(error)
      }
    },
  })

  const alertProps = useMemo<AlertProps>(() => {
    if (submittingError) {
      return {
        show: true,
        children: submittingError.message,
        variant: 'danger',
      }
    }
    if (showValidationAlert && !formik.isValid && !!formik.submitCount) {
      return {
        show: true,
        children: 'Some fields are invalid',
        variant: 'danger',
      }
    }
    if (successMessageVisible && successMessage) {
      return {
        show: true,
        children: successMessage,
        variant: 'success',
      }
    }
    return {
      variant: 'danger',
      show: false,
    }
  }, [submittingError, formik.isValid, formik.submitCount, successMessageVisible, successMessage, showValidationAlert])

  const buttonProps = useMemo<Omit<ButtonProps, 'children'>>(() => {
    return {
      type: 'submit',
      disabled: formik.isSubmitting,
    }
  }, [formik.isSubmitting])

  return {
    formik,
    alertProps,
    buttonProps,
  }
}
