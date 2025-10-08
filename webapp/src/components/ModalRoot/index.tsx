import { useModalStore } from '../../lib/store/useModal'
import ChangePasswordModal from '../ChangePasswordModal'
import LogInModal from '../LogInModal'
import SignUpModal from '../SignUpModal'

const ModalRoot = () => {
  const { isOpenLogin, isOpenSignUp, isOpenChangePassword, closeModal } = useModalStore()

  return (
    <>
      <LogInModal open={isOpenLogin} close={closeModal} />
      <SignUpModal open={isOpenSignUp} close={closeModal} />
      <ChangePasswordModal open={isOpenChangePassword} close={closeModal} />
    </>
  )
}

export default ModalRoot
