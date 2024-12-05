import React from "react";
import { Button, Modal } from "react-bootstrap";
import { trackEndGame } from "../../utils";

interface IEndGameConfirmDialogProps {
  proposeGameEnd: () => void;
  onClose: () => void;
}

const EndGameConfirmDialog: React.FC<IEndGameConfirmDialogProps> = ({
  proposeGameEnd,
  onClose
}) => {
  return (
    <Modal show={true} onHide={onClose} size="lg" centered>
      <Modal.Header
        closeButton
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        placeholder={undefined}
      >
        <Modal.Title>Encerrar Jogo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Tem certeza de que deseja encerrar o jogo?</p>
        <p>Isso irá expulsar todos e você não poderá voltar ao jogo.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          variant="success"
          className=" ml-1"
          onClick={() => {
            proposeGameEnd();
            onClose();
            trackEndGame();
          }}
        >
          Encerrar Jogo
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EndGameConfirmDialog;
