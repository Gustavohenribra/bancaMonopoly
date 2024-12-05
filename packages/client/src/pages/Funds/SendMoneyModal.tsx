import { GameEntity, IGameStatePlayer } from "@monopoly-money/game-state";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import MonopolyAmountInput from "../../components/MonopolyAmountInput";
import { bankName, freeParkingName } from "../../constants";
import { formatCurrency } from "../../utils";

interface ISendMoneyModalProps {
  balance: number;
  playerId: string;
  recipient: "freeParking" | "bank" | IGameStatePlayer;
  proposeTransaction: (from: GameEntity, to: GameEntity, amount: number) => void;
  onClose: () => void;
}

const SendMoneyModal: React.FC<ISendMoneyModalProps> = ({
  balance,
  playerId,
  recipient,
  proposeTransaction,
  onClose
}) => {
  const [amount, setAmount] = useState<number | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submit = () => {
    if (amount === null) {
      setSubmitError("Por favor, insira um valor");
    } else if (amount <= 0) {
      setSubmitError("Você deve inserir um valor maior que $0");
    } else if (!Number.isInteger(amount)) {
      setSubmitError("O valor deve ser um número inteiro");
    } else if (amount > balance) {
      setSubmitError(`Você não tem dinheiro suficiente (${formatCurrency(balance)})`);
    } else {
      proposeTransaction(
        playerId,
        recipient === "freeParking" || recipient === "bank" ? recipient : recipient.playerId,
        amount
      );
      close();
    }
  };

  const close = () => {
    setAmount(null);
    setSubmitError(null);
    onClose();
  };

  const getRecipientName = () => {
    if (recipient === "freeParking") {
      return freeParkingName;
    } else if (recipient === "bank") {
      return bankName;
    } else {
      return recipient.name;
    }
  };

  return (
    <Modal show={true} onHide={close} size="lg" centered className="send-money-modal">
      <Modal.Header
        closeButton
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        placeholder={undefined}
      >
        <Modal.Title>Transferir Fundos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-center">💵 → {getRecipientName()}</p>

        <MonopolyAmountInput amount={amount} setAmount={setAmount} autoFocus={true} />

        <Button block variant="success" className="mt-1" onClick={submit}>
          Enviar
        </Button>

        <Form.Text style={{ color: "var(--danger)" }}>{submitError}</Form.Text>
      </Modal.Body>
    </Modal>
  );
};

export default SendMoneyModal;
