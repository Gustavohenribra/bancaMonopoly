import { navigate } from "hookrouter";
import { DateTime } from "luxon";
import React from "react";
import { Badge, Button, Card } from "react-bootstrap";
import useStoredGames from "../../hooks/useStoredGames";
import bannerImage from "../../img/banner.png";
import { formatCurrency } from "../../utils";
import "./Home.scss";

interface IHomeProps {
  onGameSetup: (gameId: string, userToken: string, playerId: string) => void;
}

const Home: React.FC<IHomeProps> = ({ onGameSetup }) => {
  const { storedGames } = useStoredGames();

  const newGame = () => navigate("/new-game");
  const joinGame = () => navigate("/join");

  return (
    <div className="home text-center">
      <h1 className="sr-only">Banca Monopoly</h1>
      <img src={bannerImage} className="banner" alt="Banner Banca Monopoly" />

      <p className="lead mt-2">
        Uma maneira fácil de gerenciar as finanças no seu jogo de Monopoly direto do navegador.
      </p>

      <div className="new-join-button-wrapper mt-4">
        <Button size="lg" onClick={newGame}>
          Novo Jogo
        </Button>
        <Button size="lg" onClick={joinGame}>
          Entrar no Jogo
        </Button>
      </div>

      <div className="mt-4">
        <h2>Seus Jogos Ativos</h2>
        {storedGames.length > 0 ? (
          <div className="active-game-cards">
            {storedGames
              .sort((a, b) => (a.time > b.time ? -1 : 1))
              .map(({ gameId, userToken, playerId, status, time }) => (
                <Card key={gameId} className="mb-1">
                  <Card.Body className="p-2">
                    <div className="text-left">
                      Jogo {gameId}
                      <small style={{ float: "right" }}>
                        {DateTime.fromISO(time).toFormat("DD h:mm a")}
                      </small>
                    </div>
                    <div>
                      {status?.players
                        .sort((p1, _p2) => (p1.playerId === playerId ? -1 : 0))
                        .map((player) => (
                          <Badge
                            key={player.playerId}
                            variant={
                              player.playerId === playerId
                                ? "dark"
                                : player.banker
                                ? "info"
                                : "success"
                            }
                            className="mr-1"
                          >
                            {player.name}: {formatCurrency(player.balance)}
                          </Badge>
                        ))}
                      {status !== null && status.useFreeParking && (
                        <Badge variant="warning">
                          Estacionamento Grátis: {formatCurrency(status.freeParkingBalance)}
                        </Badge>
                      )}
                    </div>
                    <Button
                      block
                      size="sm"
                      variant="outline-primary"
                      onClick={() => onGameSetup(gameId, userToken, playerId)}
                      className="mt-2"
                    >
                      Entrar no Jogo
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        ) : (
          <div>Você não tem jogos ativos</div>
        )}
      </div>

      <hr />
      <p>By Gustavo Motta</p>
      <hr />
    </div>
  );
};

export default Home;
