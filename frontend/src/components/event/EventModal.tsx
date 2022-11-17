import Modal from 'react-bootstrap/Modal';
import styles from './EventModal.module.scss';

interface EventModalProps {
  imageUrl: string;
  imageAlt: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function EventModal({
  imageUrl,
  imageAlt,
  open,
  setOpen,
}: EventModalProps): JSX.Element {
  const imageClick = () => {
    setOpen(!open);
  };
  return (
    <Modal show={open} onHide={imageClick}>
      <Modal.Body>
        <button type="button">
          <img className={styles.modalimg} src={imageUrl} alt={imageAlt} />
        </button>
      </Modal.Body>
    </Modal>
  );
}

export default EventModal;
