import Image from 'react-bootstrap/Image'

import { withPageWrapper } from '../../lib/pageWrapper'

const MainPage = withPageWrapper({
  title: ''
})(() => {
  return (
    <div className="d-flex flex-column gap-5">
      <Image
        src="https://img1.akspic.ru/attachments/originals/9/5/8/9/39859-pustynya-propoved-dikaya_mestnost-kompania-gornyj_relef-7500x2344.jpg"
        fluid
      />
      <div className="d-flex justify-content-around mt-4">
        <div>Карточка товара 1</div>
        <div>Карточка товара 2</div>
        <div>Карточка товара 3</div>
        <div>Карточка товара 4</div>
        <div>Карточка товара 5</div>
      </div>
    </div>
  )
})

export default MainPage
