import { IGameStatePlayer } from "@monopoly-money/game-state";
import { routePaths } from "./constants";

export const formatCurrency = (value: number) => `R$${value.toLocaleString()}`;

export const sortPlayersByName = (players: IGameStatePlayer[]) =>
  players.slice().sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

interface WindowWithGTag extends Window {
  gtag: ((...args: any) => void) | undefined;
}

const getWindowWithGTag = () => {
  return window as unknown as WindowWithGTag;
};

const tryToTrackGAEvent = (eventName: string, eventParams?: object) => {
  if (getWindowWithGTag().gtag !== undefined) {
    if (eventParams !== undefined) {
      getWindowWithGTag().gtag!("event", eventName, eventParams);
    } else {
      getWindowWithGTag().gtag!("event", eventName);
    }
  }
};

export const trackPageView = () =>
  tryToTrackGAEvent("visualização_de_página", {
    page_location: window.location.origin + window.location.pathname,
    page_path: window.location.pathname,
    page_title: document.title
  });

export const trackUnexpectedServerDisconnection = () =>
  tryToTrackGAEvent("Desconexão inesperada do servidor", {
    event_category: "Rede",
    non_interaction: true
  });

export const trackGameCreated = () => tryToTrackGAEvent("Jogo criado");

export const trackGameJoined = () => tryToTrackGAEvent("Entrou no jogo");

export const trackGameCodeClick = () => tryToTrackGAEvent("Código do jogo clicado");

export const trackInitialisedPlayerBalances = (amount: number) =>
  tryToTrackGAEvent("Saldos de jogadores inicializados", { initialisedAmount: amount });

export const trackFreeParkingDisabled = () => tryToTrackGAEvent("Estacionamento grátis desativado");

export const trackFreeParkingEnabled = () => tryToTrackGAEvent("Estacionamento grátis ativado");

export const trackNewPlayersNotAllowed = () => tryToTrackGAEvent("Novos jogadores não permitidos");

export const trackNewPlayersAllowed = () => tryToTrackGAEvent("Novos jogadores permitidos");

export const trackEndGame = () => tryToTrackGAEvent("Jogo finalizado");

const queryStringGameIdName = "gameId";

export const getGameIdFromQueryString = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const gameId = urlParams.get(queryStringGameIdName);
  return gameId;
};

export const getShareGameLink = (gameId: string) => {
  return `${window.location.origin}${routePaths.join}?${queryStringGameIdName}=${gameId}`;
};
