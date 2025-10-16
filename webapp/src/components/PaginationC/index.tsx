import { Pagination } from 'react-bootstrap'

const PaginationC = ({
  totalCountPages = 1,
  currentPage = 1,
  setCurrentPage = () => ({}),
  disabled = false,
}: {
  totalCountPages: number
  currentPage: number
  setCurrentPage: (arg0: number) => void
  disabled?: boolean
}) => {
  const callbacks = {
    onChange: (val: number) => {
      if (!disabled) {
        setCurrentPage(val)
      }
    },
  }

  return (
    <Pagination>
      <Pagination.Prev onClick={() => callbacks.onChange(currentPage - 1)} />
      {Array(totalCountPages)
        .fill(0)
        .map((el, i) => (
          <Pagination.Item key={i + 1} onClick={() => callbacks.onChange(i + 1)} active={i + 1 === currentPage}>
            {i + 1}
          </Pagination.Item>
        ))}
      <Pagination.Next onClick={() => callbacks.onChange(currentPage + 1)} />
    </Pagination>
  )
}

export default PaginationC
