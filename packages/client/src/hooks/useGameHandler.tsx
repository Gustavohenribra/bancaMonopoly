import { GameEntity, GameEvent, IGameState } from "@monopoly-money/game-state";
import { useState } from "react";
import GameHandler from "../logic/GameHandler";
import { formatCurrency } from "../utils";
import { useForceUpdate } from "./useForceUpdate";
import useMessageModal from "./useMessageModal";

export interface IGameHandlerAuthInfo {
  gameId: string;
  userToken: string;
  playerId: string;
}

export interface IGameHandlerState extends IGameState {
  gameId: string;
  playerId: string;
  isBanker: boolean;
  events: GameEvent[];
  actions: {
    proposeTransaction: (from: GameEntity, to: GameEntity, amount: number) => void;
    proposePlayerNameChange: (playerId: string, name: string) => void;
    proposePlayerDelete: (playerId: string) => void;
    proposeGameOpenStateChange: (open: boolean) => void;
    proposeUseFreeParkingChange: (useFreeParking: boolean) => void;
    proposeGameEnd: () => void;
  };
}

const useGameHandler = (): {
  game: IGameHandlerState | null;
  authInfo: IGameHandlerAuthInfo | null;
  initialize: (auth: IGameHandlerAuthInfo) => void;
  clear: () => void;
} => {
  const forceUpdate = useForceUpdate(); // Usado para forçar atualizações a partir do GameHandler
  const [gameHandler, setGameHandler] = useState<GameHandler | null>(null);
  const showMessage = useMessageModal();

  const onDisplayMessage = (title: string, message: string, gameState: IGameState) => {
    showMessage({
      title,
      body: (
        <>
          <p>{message}</p>
          <p className="mb-0">Aqui está o progresso do jogo:</p>
          <ul className="mb-1">
            {gameState.players.map((player) => (
              <li key={player.playerId}>
                {player.name}: {formatCurrency(player.balance)}
              </li>
            ))}
            {gameState.useFreeParking && (
              <li>Estacionamento Grátis: {formatCurrency(gameState.freeParkingBalance)}</li>
            )}
          </ul>
          <small>(Fornecido apenas no caso de você precisar recriar o jogo)</small>
        </>
      )
    });
  };

  // Criar / destruir o game handler quando uma nova autenticação é fornecida
  const initializeGame = ({ gameId, userToken, playerId }: IGameHandlerAuthInfo) => {
    // Se a autenticação foi fornecida, configurar o game handler
    const onGameStateChange = (gameEnded: boolean) => {
      if (gameEnded) {
        setGameHandler(null);
      } else {
        forceUpdate();
      }
    };
    setGameHandler(
      new GameHandler(gameId, userToken, playerId, onGameStateChange, onDisplayMessage)
    );
  };

  // Limpar o jogo atual
  const clearGame = () => {
    if (gameHandler !== null) {
      gameHandler.gameEnd(null);
    }
    setGameHandler(null);
  };

  return {
    initialize: initializeGame,
    clear: clearGame,
    authInfo:
      gameHandler === null
        ? null
        : {
            gameId: gameHandler.gameId,
            userToken: gameHandler.userToken,
            playerId: gameHandler.playerId
          },
    game:
      gameHandler === null
        ? null
        : {
            ...gameHandler.getState(),
            gameId: gameHandler.gameId,
            playerId: gameHandler.playerId,
            isBanker: gameHandler.amIABanker(),
            events: gameHandler.getEvents(),
            actions: {
              proposeTransaction: gameHandler.proposeTransaction.bind(gameHandler),
              proposePlayerNameChange: gameHandler.proposePlayerNameChange.bind(gameHandler),
              proposePlayerDelete: gameHandler.proposePlayerDelete.bind(gameHandler),
              proposeGameOpenStateChange: gameHandler.proposeGameOpenStateChange.bind(gameHandler),
              proposeUseFreeParkingChange:
                gameHandler.proposeUseFreeParkingChange.bind(gameHandler),
              proposeGameEnd: gameHandler.proposeGameEnd.bind(gameHandler)
            }
          }
  };
};

export default useGameHandler;
