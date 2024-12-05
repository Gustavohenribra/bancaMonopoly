import React, { useRef } from "react";
import { Button, Overlay, Tooltip } from "react-bootstrap";
import QRCode from "react-qr-code";
import { useClipboard } from "use-clipboard-copy";
import useMessageModal from "../../hooks/useMessageModal";
import { getShareGameLink, trackGameCodeClick } from "../../utils";

interface IGameCodeProps {
  gameId: string;
  isBanker: boolean;
}

const GameCode: React.FC<IGameCodeProps> = ({ gameId, isBanker }) => {
  const showMessage = useMessageModal();

  const gameIdClicked = () => {
    showMessage({
      title: "Compartilhar jogo",
      body: <ShareGameModalContent gameId={gameId} />,
      closeButtonText: null
    });
    trackGameCodeClick();
  };

  return (
    <div className="text-center">
      <h1 onClick={gameIdClicked}>{gameId}</h1>
      <div>
        <small className="text-muted">
          Toque no código acima para obter um código QR ou copiar um link para ajudar outros jogadores a entrar
        </small>
      </div>
      {isBanker && (
        <small className="text-muted">Você pode ocultar isso fechando o jogo nas configurações</small>
      )}
      <hr />
    </div>
  );
};

interface ShareGameModalContentProps {
  gameId: string;
}

const ShareGameModalContent = ({ gameId }: ShareGameModalContentProps) => {
  const shareLink = getShareGameLink(gameId);

  const clipboard = useClipboard({
    copiedTimeout: 1000
  });
  const copyTooltipTarget = useRef<HTMLButtonElement>(null);

  const copyLink = () => {
    clipboard.copy(shareLink);
  };

  return (
    <>
      <p className="text-center">Peça para outros escanearem o código abaixo para entrar no seu jogo</p>
      <div className="mt-4 text-center">
        <QRCode value={shareLink} />
      </div>

      <div className="mt-4">
        <Button block onClick={copyLink} ref={copyTooltipTarget}>
          Copiar link para enviar para outros
        </Button>
      </div>

      <Overlay target={copyTooltipTarget.current} show={clipboard.copied} placement="bottom">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            Copiado para a área de transferência
          </Tooltip>
        )}
      </Overlay>
    </>
  );
};

export default GameCode;
