import {
  calculateGameState,
  defaultGameState,
  GameEvent,
  IGameState
} from "@monopoly-money/game-state";
import { DateTime } from "luxon";
import React from "react";
import { bankName, freeParkingName } from "../../constants";
import { formatCurrency } from "../../utils";
import "./History.scss";

interface IHistoryProps {
  events: GameEvent[];
}

const History: React.FC<IHistoryProps> = ({ events }) => {
  let currentGameState = defaultGameState;
  const details = events.map((event) => {
    const nextState = calculateGameState([event], currentGameState);
    const currentEventDetails = getEventDetails(event, currentGameState, nextState);
    currentGameState = nextState;
    return currentEventDetails;
  });

  return (
    <div className="history">
      {details.reverse().map((eventDetail) =>
        eventDetail === null ? null : (
          <div key={eventDetail.id} className="event mb-2">
            <div className="bar" style={{ background: `var(--${eventDetail.colour})` }} />
            <div className="event-details">
              <div className="top">
                <small>{eventDetail.title}</small>
                <small>
                  {eventDetail.actionedBy !== null && (
                    <span className="mr-2">(✍️ {eventDetail.actionedBy})</span>
                  )}
                  {eventDetail.time}
                </small>
              </div>
              <div className="detail">{eventDetail.detail}</div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

interface IEventDetail {
  id: string;
  title: string;
  actionedBy: string | null;
  time: string;
  detail: string;
  colour: "blue" | "red" | "orange" | "yellow" | "green" | "cyan"; // https://getbootstrap.com/docs/4.0/getting-started/theming/#all-colors
}

const getEventDetails = (
  event: GameEvent,
  previousState: IGameState,
  nextState: IGameState
): IEventDetail | null => {
  const defaults = {
    id: `${event.type + event.time}`,
    time: DateTime.fromISO(event.time).toFormat("h:mm a")
  };
  switch (event.type) {
    case "playerJoin": {
      const player = nextState.players.find((p) => p.playerId === event.playerId)!;
      return {
        ...defaults,
        title: "Entrada de Jogador",
        actionedBy: null,
        detail: `${player.name} entrou`,
        colour: "cyan"
      };
    }

    case "playerBankerStatusChange": {
      const player = nextState.players.find((p) => p.playerId === event.playerId)!;
      const actionedBy = previousState.players.find((p) => p.playerId === event.actionedBy)!;
      return {
        ...defaults,
        title: "Mudança de Status de Banqueiro",
        actionedBy: actionedBy.name,
        detail: `${player.name} foi nomeado banqueiro`,
        colour: "yellow"
      };
    }

    case "transaction": {
      const playerReceiving =
        event.to === "bank"
          ? bankName
          : event.to === "freeParking"
          ? freeParkingName
          : nextState.players.find((p) => p.playerId === event.to)!.name;
      const playerGiving =
        event.from === "bank"
          ? bankName
          : event.from === "freeParking"
          ? freeParkingName
          : nextState.players.find((p) => p.playerId === event.from)!.name;
      const actionedBy = previousState.players.find((p) => p.playerId === event.actionedBy)!;
      return {
        ...defaults,
        title: `Transação`,
        actionedBy: actionedBy.playerId === event.from ? null : actionedBy.name,
        detail: `${playerGiving} → ${playerReceiving} (${formatCurrency(event.amount)})`,
        colour: "green"
      };
    }

    case "playerNameChange": {
      const playerNameBeforeRename = previousState.players.find(
        (p) => p.playerId === event.playerId
      )!.name;
      const playerNameAfterRename = nextState.players.find(
        (p) => p.playerId === event.playerId
      )!.name;
      const actionedBy = previousState.players.find((p) => p.playerId === event.actionedBy)!;
      return {
        ...defaults,
        title: "Mudança de Nome do Jogador",
        actionedBy: actionedBy.playerId === event.playerId ? null : actionedBy.name,
        detail: `${playerNameBeforeRename} foi renomeado para ${playerNameAfterRename}`,
        colour: "orange"
      };
    }

    case "playerDelete": {
      const playerName = previousState.players.find((p) => p.playerId === event.playerId)!.name;
      const actionedBy = previousState.players.find((p) => p.playerId === event.actionedBy)!;
      return {
        ...defaults,
        title: "Remoção de Jogador",
        actionedBy: actionedBy.playerId === event.playerId ? null : actionedBy.name,
        detail: `${playerName} foi removido do jogo`,
        colour: "red"
      };
    }

    case "gameOpenStateChange": {
      const actionedBy = previousState.players.find((p) => p.playerId === event.actionedBy)!;
      return {
        ...defaults,
        title: "Mudança de Estado do Jogo Aberto",
        actionedBy: actionedBy.name,
        detail: `O jogo agora está ${event.open ? "aberto" : "fechado"} para novos jogadores`,
        colour: "blue"
      };
    }

    case "useFreeParkingChange": {
      const actionedBy = previousState.players.find((p) => p.playerId === event.actionedBy)!;
      return {
        ...defaults,
        title: "Mudança na Regra de Estacionamento Grátis",
        actionedBy: actionedBy.name,
        detail: `A regra de Estacionamento Grátis agora está ${
          event.useFreeParking ? "ativada" : "desativada"
        }`,
        colour: "blue"
      };
    }

    case "playerConnectionChange": {
      return null;
    }
  }
};

export default History;
