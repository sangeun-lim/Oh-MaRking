import React, { Dispatch } from 'react';
import Modal from 'react-bootstrap/Modal';

interface Props {
  setPass: Dispatch<React.SetStateAction<boolean>>;
  pass: boolean;
}

function CantReadMsg({ setPass, pass }: Props): JSX.Element {
  const handleClose = () => setPass(false);

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
