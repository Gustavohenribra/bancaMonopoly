import { IGameStatePlayer } from "@monopoly-money/game-state";
import useLocalStorage from "@rehooks/local-storage";
import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
  Modal
} from "react-bootstrap";
import { useModal } from "react-modal-hook";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { formatCurrency } from "../../utils";

const passingGoRewardValueLocalStorageKey = "valorRecompensaPassarGo";

interface IPlayerPassedGoProps {
  players: IGameStatePlayer[];
  onSubmit: (value: number, playerId: string) => void;
}

const PlayerPassedGo: React.FC<IPlayerPassedGoProps> = ({ players, onSubmit }) => {
  const [selectedPlayer, setSelectedPlayer] = useState<IGameStatePlayer | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [storedPassingGoReward, setStoredPassingGoReward] = useLocalStorage<number>(
    passingGoRewardValueLocalStorageKey,
    2000000
  );
  const [passingGoReward, setPassingGoReward] = useState<number>(storedPassingGoReward ?? 2000000);

  const [updatePassingGoRewardModalValue, setUpdatePassingGoRewardModalValue] =
    useState<number>(passingGoReward);
  const [showUpdatePassingGoRewardModal, hideUpdatePassingGoRewardModal] = useModal(
    () => (
      <Modal show={true} onHide={hideUpdatePassingGoRewardModal} size="lg" centered>
        <Modal.Header
          closeButton
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          placeholder={undefined}
        >
          <Modal.Title>Atualizar Recompensa de Jogador ao Passar pelo GO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Quantia</InputGroup.Text>
            </InputGroup.Prepend>
            <NumberFormat
              allowNegative={false}
              thousandSeparator={true}
              prefix="R$"
              value={updatePassingGoRewardModalValue}
              onValueChange={({ value }: NumberFormatValues) => {
                setUpdatePassingGoRewardModalValue(parseInt(value, 10));
              }}
              className="form-control"
              autoComplete="off"
              decimalScale={0}
              inputMode="decimal"
            />
            <Button
              variant="success"
              onClick={() => {
                setPassingGoReward(updatePassingGoRewardModalValue);
                hideUpdatePassingGoRewardModal();
              }}
              className="remove-left-border-radius"
            >
              Definir
            </Button>
          </InputGroup>
          <Form.Text style={{ color: "var(--danger)" }}>{submitError}</Form.Text>
        </Modal.Body>
      </Modal>
    ),
    [updatePassingGoRewardModalValue, setUpdatePassingGoRewardModalValue]
  );

  // Atualiza o valor armazenado quando o passingGoReward é alterado
  useEffect(() => {
    setStoredPassingGoReward(passingGoReward);
  }, [passingGoReward]);

  const submit = () => {
    if (selectedPlayer !== null) {
      onSubmit(passingGoReward, selectedPlayer.playerId);
      setSelectedPlayer(null);
      setSubmitError(null);
    } else {
      setSubmitError("Nenhum jogador selecionado");
    }
  };

  return (
    <>
      <label htmlFor="player-passed-go" className="mb-1">
        Jogador Passou pelo GO ({formatCurrency(passingGoReward)})
      </label>

      <ButtonGroup className="mt-1 settings-and-player-and-submit-group">
        <Button variant="outline-secondary" onClick={showUpdatePassingGoRewardModal}>
          ⚙️
        </Button>

        <DropdownButton
          as={ButtonGroup}
          variant="outline-secondary"
          id="player-passed-go"
          title={selectedPlayer?.name ?? "Selecionar jogador"}
        >
          {players.map((player) => (
            <Dropdown.Item key={player.playerId} onClick={() => setSelectedPlayer(player)}>
              {player.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>

        <Button variant="outline-secondary" onClick={submit}>
          Dar
        </Button>
      </ButtonGroup>

      <Form.Text style={{ color: "var(--danger)" }}>{submitError}</Form.Text>
    </>
  );
};

export default PlayerPassedGo;
