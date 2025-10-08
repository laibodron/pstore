import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import { getMainRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

export const SignOutPage = () => {
  const navigate = useNavigate()
  const trpcUtils = trpc.useUtils()
  useEffect(() => {
    Cookies.remove('token')
    void trpcUtils.invalidate().then(() => {
      navigate(getMainRoute())
    })
  }, [])

  return <Spinner animation="border" variant="primary" />
}
