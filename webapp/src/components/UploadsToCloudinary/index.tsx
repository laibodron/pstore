import {
  type CloudinaryUploadPresetName,
  type CloudinaryUploadTypeName,
  getCloudinaryUploadUrl,
} from '@pstore/shared/src/cloudinary'
import { type FormikProps } from 'formik'
import { useRef, useState } from 'react'
import { Button } from 'react-bootstrap'

import { Icon } from '../Icon'
import { useUploadToCloudinary } from '../UploadToCloudinary'

export const UploadsToCloudinary = <TTypeName extends CloudinaryUploadTypeName>({
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
  const value = formik.values[name] as string[]
  const error = formik.errors[name] as string | undefined
  const touched = formik.touched[name] as boolean
  const invalid = touched && !!error
  const disabled = formik.isSubmitting

  const inputEl = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)

  const { uploadToCloudinary } = useUploadToCloudinary(type)

  return (
    <div className="">
      <input
        className="d-none"
        type="file"
        disabled={loading || disabled}
        accept="image/*"
        multiple
        ref={inputEl}
        onChange={({ target: { files } }) => {
          void (async () => {
            setLoading(true)
            try {
              if (files?.length) {
                const newValue = [...value]
                await Promise.all(
                  Array.from(files).map(async (file) => {
                    await uploadToCloudinary(file).then(({ publicId }) => {
                      newValue.push(publicId)
                    })
                  })
                )
                void formik.setFieldValue(name, newValue)
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
      <label className="" htmlFor={name}>
        {label}
      </label>
      {!!value?.length && (
        <div className="">
          {value.map((publicId) => (
            <div key={publicId} className="">
              <button
                type="button"
                className=""
                onClick={() => {
                  void formik.setFieldValue(
                    name,
                    value.filter((deletedPublicId) => deletedPublicId !== publicId)
                  )
                }}
              >
                <Icon className="" name="trash" />
              </button>
              <img className="" alt="" src={getCloudinaryUploadUrl(publicId, type, preset)} />
            </div>
          ))}
        </div>
      )}
      <div className="">
        <Button
          type="button"
          onClick={() => inputEl.current?.click()}
          // loading={loading}
          disabled={loading || disabled}
          color="green"
        >
          {value?.length ? 'Upload more' : 'Upload'}
        </Button>
      </div>
      {invalid && <div className="">{error}</div>}
    </div>
  )
}
