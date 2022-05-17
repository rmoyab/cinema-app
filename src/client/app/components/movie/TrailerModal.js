import { useState } from 'react'
import Modal from 'react-modal'

import { movieTrailer } from '../../utils/movieUtils'

import play from '../../../assets/icons/play.svg'

const customStyles = {
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
  },
}

Modal.setAppElement('#root')

const TrailerModal = ({ videos }) => {
  const [modalIsOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <div>
      <div className="btn">
        <button className="btn__trailer" onClick={openModal}>
          <img src={play} alt="" />
          <p>Trailer</p>
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={200}
        className="modal"
        overlayClassName="modal__bg"
      >
        <div className="modal__video">
          <iframe
            width="854"
            height="480"
            src={movieTrailer(videos)}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
      </Modal>
    </div>
  )
}

export default TrailerModal
