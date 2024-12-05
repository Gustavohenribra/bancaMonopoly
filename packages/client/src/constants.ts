import { IPageMeta } from "./components/MetaTags";

export const siteUrl = "https://monopoly-money.nitratine.net";

export const bankName = "🏦 Banco";
export const freeParkingName = "🚗 Estacionamento Grátis";

export const routePaths = {
  home: "/",
  join: "/join",
  newGame: "/new-game",
  funds: "/funds",
  bank: "/bank",
  history: "/history",
  settings: "/settings",
  help: "/help"
};

export const pageMeta: Record<string, IPageMeta> = {
  [routePaths.home]: {
    titlePrefix: "",
    description:
      "Banca Monopoly ajuda você a gerenciar suas finanças em um jogo de Monopoly diretamente do navegador.",
    index: true
  },
  [routePaths.join]: {
    titlePrefix: "Entrar no Jogo",
    description: "Entre em um jogo de Banca Monopoly",
    index: true
  },
  [routePaths.newGame]: {
    titlePrefix: "Novo Jogo",
    description: "Crie um novo jogo de Banca Monopoly",
    index: true
  },
  [routePaths.funds]: {
    titlePrefix: "Gerenciar Fundos",
    index: false
  },
  [routePaths.bank]: {
    titlePrefix: "Banco",
    index: false
  },
  [routePaths.history]: {
    titlePrefix: "Histórico",
    index: false
  },
  [routePaths.settings]: {
    titlePrefix: "Configurações",
    index: false
  },
  [routePaths.help]: {
    titlePrefix: "Ajuda",
    index: false
  }
};
