import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { setShow } from '../../store/modal';
import { RootState } from '../../store/store';

<<<<<<< HEAD
interface Props {
  setShow: Dispatch<React.SetStateAction<boolean>>;
  pass: boolean;
}

function CantReadMsg({ pass, setShow }: Props): JSX.Element {
=======
function CantReadMsg(): JSX.Element {
  const dispatch = useDispatch();
  const { modal } = useSelector((state: RootState) => state);
>>>>>>> e2cb8b553137eadb999aacb831b39ca850b4cc61
  const handleClose = () => {
    dispatch(setShow());
  };

  return (
    <div>
      {modal.show && modal.canNotRead ? (
        <Modal show={modal.show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>확인 불가</Modal.Title>
          </Modal.Header>
          <Modal.Body>아직 확인할 수 없는 메시지입니다.</Modal.Body>
        </Modal>
      ) : null}
    </div>
  );
}

export default CantReadMsg;
