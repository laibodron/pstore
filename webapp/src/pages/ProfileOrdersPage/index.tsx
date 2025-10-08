import { Col, Row, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'

import { withPageWrapper } from '../../lib/pageWrapper'

const ProfileOrdersPage = withPageWrapper({
  title: 'My Orders',
})(() => {
  return (
    <>
      <Row className="mb-4">
        <Col>
          <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
            <ToggleButton variant="outline-primary" id="tbg-radio-1" value={1}>
              All
            </ToggleButton>
            <ToggleButton variant="outline-primary" id="tbg-radio-2" value={2}>
              Opened
            </ToggleButton>
            <ToggleButton variant="outline-primary" id="tbg-radio-3" value={3}>
              Redeemed
            </ToggleButton>
            <ToggleButton variant="outline-primary" id="tbg-radio-4" value={4}>
              Cancelled
            </ToggleButton>
          </ToggleButtonGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* Orders will be displayed here */}
          <p>No orders to display.</p>
        </Col>
      </Row>
    </>
  )
})

export default ProfileOrdersPage
