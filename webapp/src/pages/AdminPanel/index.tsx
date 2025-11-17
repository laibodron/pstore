import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import CreateCategory from '../../components/AdminCreateCategory'
import CreateProduct from '../../components/AdminCreateProduct'
import { withPageWrapper } from '../../lib/pageWrapper'

const AdminPanel = withPageWrapper({
  setProps: ({ ctx }) => ({ me: ctx.me }),
  title: 'Admin Panel',
  authorizedOnly: true,
})(({ me }) => {
  if (!me?.permissions.includes('ALL')) {
    return null
  }
  return (
    <Tabs defaultActiveKey="CreateProduct" id="uncontrolled-tab-example" className="mb-3">
      <Tab eventKey="CreateProduct" title="Create Product">
        <CreateProduct />
      </Tab>
      <Tab eventKey="CreateCategory" title="Create Category">
        <CreateCategory />
      </Tab>
    </Tabs>
  )
})

export default AdminPanel
