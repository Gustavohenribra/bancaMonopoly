import React from "react";
import PagesImage from "../../img/help/pages.png";
import "./Help.scss";

const Help: React.FC = () => {
  return (
    <div className="help">
      <h3 className="text-center">Ajuda do Banca Monopoly</h3>
      <p className="lead mt-2 text-center">Um pequeno guia para o Banca Monopoly.</p>

      <ul>
        <li>
          <a href="#pages">Páginas</a>
        </li>
        <li>
          <a href="#player-help">Ajuda para Jogadores</a>
        </li>
        <li>
          <a href="#banker-help">Ajuda para Banqueiros</a>
        </li>
      </ul>

      <h4 id="pages">Páginas</h4>
      <img src={PagesImage} alt="Títulos para cada página" className="mw-100" />

      <h4 id="player-help">Ajuda para Jogadores</h4>

      <h5>Entrando em um Jogo</h5>
      <p>
        Para entrar em um jogo, selecione "Entrar no Jogo" na página inicial e depois insira o ID do jogo (o banqueiro terá isso) e seu nome. Pressione "Entrar" quando tiver preenchido todos os campos.
      </p>

      <h5>Transferindo Fundos para Outros Jogadores, Estacionamento Grátis e o Banco</h5>
      <p>
        Para transferir fundos para outra pessoa/entidade, clique no ícone associado ao jogador/entidade alvo na página de fundos. Um diálogo aparecerá permitindo que você insira um valor a ser transferido. Pressione "Enviar" para concluir a transação.
      </p>

      <h5>Visualizando Transações Anteriores</h5>
      <p>
        O Banca Monopoly permite que você visualize todos os eventos, incluindo transações que ocorreram anteriormente no jogo. Vá até a página de histórico para ver esses eventos.
      </p>

      <h4 id="banker-help">Ajuda para Banqueiros</h4>

      <h5>Criando um Jogo</h5>
      <p>
        Para criar um jogo, selecione "Novo Jogo" na página inicial, insira seu nome (que será seu nome de jogador) e pressione "Criar".
      </p>

      <h5>Inicializando Saldos dos Jogadores</h5>
      <p>
        Inicializar um jogo define o saldo de todos os jogadores para um valor inicial de uma vez; essa opção só está disponível se nenhuma transação tiver sido feita ainda.
      </p>
      <p>
        Clicar no botão "Inicializar Saldos dos Jogadores" na página do banqueiro, fornecendo um valor e pressionando "Inicializar", definirá os saldos de todos os jogadores para o valor fornecido.
      </p>

      <h5>Distribuindo Dinheiro para Jogadores a partir do Banco</h5>
      <p>
        Na página do banco, sob o rótulo "Dar Dinheiro ao Jogador", há um formulário para distribuir dinheiro aos jogadores. Forneça o valor e selecione o jogador alvo no menu suspenso. Pressionar "Enviar" concluirá a transação.
      </p>

      <h5>Retirando Dinheiro dos Jogadores para o Banco</h5>
      <p>
        Você também pode fazer o oposto do acima usando o formulário sob "Retirar Dinheiro do Jogador"; mova dinheiro de um jogador para o banco.
      </p>
      <p>
        Isso normalmente não é uma ação necessária, mas é útil no caso de o banqueiro acidentalmente dar muito dinheiro a um jogador.
      </p>

      <h5>Jogadores Passando pelo GO</h5>
      <p>
        Em vez de inserir repetidamente a recompensa de passar pelo GO, um menu suspenso é exibido na página do banco sob o cabeçalho "Jogador Passou pelo GO ($[quantidade])". Selecionar um jogador e pressionar "Dar" dará ao jogador a quantia exibida.
      </p>
      <p>
        Para alterar o valor dado a um jogador, pressione o botão de configurações à direita, insira um novo valor e pressione "Definir".
      </p>

      <h5>Dando Estacionamento Grátis a um Jogador</h5>
      <p>
        Para dar estacionamento grátis a um jogador, selecione o jogador no menu suspenso sob o rótulo "Dar Estacionamento Grátis" e pressione "Dar" para concluir a transação.
      </p>

      <h5>Alterando o Nome de um Jogador</h5>
      <p>
        Você pode alterar o nome de um jogador na página de configurações clicando no botão de lápis na mesma linha que o jogador alvo. Modificar o nome e clicar em "Renomear" mudará o nome do jogador.
      </p>

      <h5>Removendo um Jogador</h5>
      <p>
        Você pode remover um jogador do jogo na página de configurações clicando no botão de lixeira na mesma linha que o jogador alvo. Confirmar essa ação removerá o jogador do jogo atual.
      </p>

      <h5>Fechando o Jogo para Novos Jogadores</h5>
      <p>
        Fechar o jogo impede que novos jogadores entrem e oculta o código do jogo na página de fundos. Para fazer isso, selecione "Fechar Jogo para Novos Jogadores" na página de configurações. Isso é útil se todos já tiverem entrado no jogo e você não precisar de mais ninguém.
      </p>
      <p>Para reabrir o jogo, pressione o mesmo botão novamente.</p>

      <h5>Finalizando o Jogo</h5>
      <p>
        Você pode finalizar o jogo clicando em "Finalizar Jogo" na página de configurações e confirmando. Isso excluirá completamente o jogo e expulsará todos. Você não pode voltar ao jogo depois de finalizá-lo.
      </p>
    </div>
  );
};

export default Help;
