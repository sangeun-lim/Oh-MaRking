import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { setShow } from '../../store/modal';

interface Props {
  pass: boolean;
}

function CantReadMsg({ pass }: Props): JSX.Element {
  const dispatch = useDispatch();
  const handleClose = () => {
    // setPass(false);
    // setShow(false);
    dispatch(setShow(false));
  };

  return (
    <Modal show={pass} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>확인 불가</Modal.Title>
      </Modal.Header>
      <Modal.Body>아직 확인할 수 없는 메시지입니다.</Modal.Body>
    </Modal>
  );
}

export default CantReadMsg;
