import { FiChevronLeft } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
  const navigate = useNavigate()
  return (
    <div className="row gap-1 justify-flex-start">
      <div className="col-12-xs col-6-md  col-4-xl">
        <div className="back-section">
          <button className="btn btn__back" onClick={() => navigate('/')}>
            {' '}
            <FiChevronLeft />
          </button>
        </div>
      </div>
    </div>
  )
}
export default BackButton
