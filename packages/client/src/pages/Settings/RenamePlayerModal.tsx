import { IGameStatePlayer } from "@monopoly-money/game-state";
import React, { useState } from "react";
import { Button, Form, FormControl, InputGroup, Modal } from "react-bootstrap";

interface IRenamePlayerModalProps {
  player: IGameStatePlayer;
  proposePlayerNameChange: (playerId: string, name: string) => void;
  onClose: () => void;
}

const RenamePlayerModal: React.FC<IRenamePlayerModalProps> = ({
  player,
  proposePlayerNameChange,
  onClose
}) => {
  const [name, setName] = useState(player.name);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submit = () => {
    if (name === "") {
      setSubmitError("O nome não deve estar vazio");
    } else {
      setSubmitError(null);
    }
    proposePlayerNameChange(player.playerId, name);
    onClose();
  };

  return (
    <Modal show={true} onHide={onClose} size="lg" centered>
      <Modal.Header
        closeButton
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        placeholder={undefined}
      >
        <Modal.Title>Alterar Nome do Jogador</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Nome</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl value={name} onChange={(e) => setName(e.currentTarget.value)} />
          <Button variant="success" onClick={submit} className="remove-left-border-radius">
            Renomear
          </Button>
        </InputGroup>
        <Form.Text style={{ color: "var(--danger)" }}>{submitError}</Form.Text>
      </Modal.Body>
    </Modal>
  );
};

export default RenamePlayerModal;
