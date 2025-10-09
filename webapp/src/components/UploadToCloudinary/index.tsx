import {
  type CloudinaryUploadPresetName,
  type CloudinaryUploadTypeName,
  getCloudinaryUploadUrl,
} from '@pstore/shared/src/cloudinary'
import { type FormikProps } from 'formik'
import memoize from 'lodash/memoize'
import { useCallback, useRef, useState } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'

import { trpc } from '../../lib/trpc'
// import Button from '../Button'
// import Buttons from '../Buttons'
// import css from './index.module.scss'

export const useUploadToCloudinary = (type: CloudinaryUploadTypeName) => {
  const prepareCloudinaryUpload = trpc.prepareCloudinaryUpload.useMutation()

  const getPreparedData = useCallback(
    memoize(
      async () => {
        const { preparedData } = await prepareCloudinaryUpload.mutateAsync({ type })
        return preparedData
      },
      () => JSON.stringify({ type, minutes: new Date().getMinutes() })
    ),
    [type]
  )

  const uploadToCloudinary = async (file: File) => {
    const preparedData = await getPreparedData()

    const formData = new FormData()
    formData.append('file', file)
    formData.append('timestamp', preparedData.timestamp)
    formData.append('folder', preparedData.folder)
    formData.append('transformation', preparedData.transformation)
    formData.append('eager', preparedData.eager)
    formData.append('signature', preparedData.signature)
    formData.append('api_key', preparedData.apiKey)

    return await fetch(preparedData.url, {
      method: 'POST',
      body: formData,
    })
      .then(async (rawRes) => {
        return await rawRes.json()
      })
      .then((res) => {
        if (res.error) {
          throw new Error(res.error.message)
        }
        return {
          publicId: res.public_id as string,
          res,
        }
      })
  }

  return { uploadToCloudinary }
}

export const UploadToCloudinary = <TTypeName extends CloudinaryUploadTypeName>({
  label,
  name,
  formik,
  type,
  preset,
}: {
  label: string
  name: string
  formik: FormikProps<any>
  type: TTypeName
  preset: CloudinaryUploadPresetName<TTypeName>
}) => {
  const value = formik.values[name]
  const error = formik.errors[name] as string | undefined
  const touched = formik.touched[name] as boolean
  const invalid = touched && !!error
  const disabled = formik.isSubmitting

  const inputEl = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)

  const { uploadToCloudinary } = useUploadToCloudinary(type)

  return (
    <div
    // className={cn({ [css.field]: true, [css.disabled]: disabled })}
    >
      <input
        // className={css.fileInput}
        className="d-none"
        type="file"
        disabled={loading || disabled}
        accept="image/*"
        ref={inputEl}
        onChange={({ target: { files } }) => {
          void (async () => {
            setLoading(true)
            try {
              if (files?.length) {
                const file = files[0]
                const { publicId } = await uploadToCloudinary(file)
                void formik.setFieldValue(name, publicId)
              }
            } catch (err: any) {
              console.error(err)
              formik.setFieldError(name, err.message)
            } finally {
              void formik.setFieldTouched(name, true, false)
              setLoading(false)
              if (inputEl.current) {
                inputEl.current.value = ''
              }
            }
          })()
        }}
      />
      <label
        // className={css.label}
        htmlFor={name}
      >
        {label}
      </label>
      {!!value && !loading && (
        <div
        // className={css.previewPlace}
        >
          <Image
            fluid
            src={getCloudinaryUploadUrl(value, type, preset)}
            roundedCircle
            width={156}
            // height={54}
          />
        </div>
      )}
      <div
      // className={css.buttons}
      >
        <ButtonGroup>
          <Button
            type="button"
            onClick={() => inputEl.current?.click()}
            // loading={loading}
            disabled={loading || disabled}
            color="green"
          >
            {value ? 'Upload another' : 'Upload'}
          </Button>
          {!!value && !loading && (
            <Button
              type="button"
              color="red"
              onClick={() => {
                void formik.setFieldValue(name, null)
                formik.setFieldError(name, undefined)
                void formik.setFieldTouched(name)
              }}
              disabled={disabled}
            >
              Remove
            </Button>
          )}
        </ButtonGroup>
      </div>
      {invalid && (
        <div
        // className={css.error}
        >
          {error}
        </div>
      )}
    </div>
  )
}
