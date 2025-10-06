import { createElement } from 'react'
import { type IconBaseProps } from 'react-icons'
import { AiOutlineInbox } from 'react-icons/ai'
import { FaRegHeart, FaRegTrashCan, FaRegUser, FaTelegram } from 'react-icons/fa6'
import { FiShoppingCart } from 'react-icons/fi'
import { MdAdminPanelSettings,MdOutlineLocationOn } from 'react-icons/md'

const icons = {
  userProfile: FaRegUser,
  heart: FaRegHeart,
  cart: FiShoppingCart,
  telegram: FaTelegram,
  location: MdOutlineLocationOn,
  trash: FaRegTrashCan,
  box: AiOutlineInbox,
  admin: MdAdminPanelSettings,
}

export const Icon = ({ name, ...restProps }: { name: keyof typeof icons } & IconBaseProps) => {
  return createElement(icons[name], restProps)
}
