import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faFilePen } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import axios from "axios";
import GraficoMovimentacoes from "./GraficoMovimentacoes";
import "./index.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale, 
  BarElement,
  ArcElement, 
  LineElement, 
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

function Relatorios() {
  const [tipoGrafico, setTipoGrafico] = useState("Bar");
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [movimentacoesFiltradas, setMovimentacoesFiltradas] = useState([]);
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [activeTab, setActiveTab] = useState("movimentacao");
  const [categoria, setCategoria] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [exibirGrafico, setExibirGrafico] = useState(false);
  const [movimentacaoEditando, setMovimentacaoEditando] = useState(null);
  const [modalIsOpenEdit, setModalIsOpenEdit] = useState(false);

  const [modalAlertCamposVazios, setModalAlertCamposVazios] = useState(false);
  const [modalAlertDeleteMovimentacao, setModalAlertDeleteMovimentacao] =
    useState(false);
  const [idMovimentacaoExcluir, setIdMovimentacaoExcluir] = useState(null);

  const [categoriaModal, setCategoriaModal] = useState("");
  const [tipoModal, setTipoModal] = useState("");
  const [valorModal, setValorModal] = useState("");
  const [dataModal, setDataModal] = useState("");
  const [descricaoModal, setDescricaoModal] = useState("");
  const [trueCategoria, setTrueCategoria] = useState(false);

  const userId = Number(localStorage.getItem("userId"));
  console.log("Usuário: " + userId);

  // Mover a função para fora do useEffect
  const atualizarMovimentacoes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/movimentacoes/user/${userId}`
      );
      setMovimentacoes(response.data);
      setMovimentacoesFiltradas(response.data); // Inicialmente, exibe todas as movimentações
    } catch (error) {
      console.error("Erro ao atualizar movimentações:", error);
    }
  };


  useEffect(() => {
    atualizarMovimentacoes();
  }, [userId]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get("http://localhost:8080/categorias");
        setCategorias(response.data); // response.data agora será uma lista de strings.
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategorias();
  }, []);

  const editarMovimentacao = (movimentacao) => {
    setDescricaoModal(movimentacao.descricao);
    setValorModal(movimentacao.valor);
    setTipoModal(movimentacao.tipo);
    setCategoriaModal(movimentacao.categoria.nomeCategoria);
    setDataModal(movimentacao.data);
    setMovimentacaoEditando(movimentacao.id);
    setModalIsOpenEdit(true);
  };

  const excluirMovimentacao = (id) => {
    setIdMovimentacaoExcluir(id);
    setModalAlertDeleteMovimentacao(true);
  };

  const confirmarExclusao = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/movimentacoes/${idMovimentacaoExcluir}`
      );

      const novasMovimentacoes = movimentacoes.filter(
        (movimentacao) => movimentacao.id !== idMovimentacaoExcluir
      );
      setMovimentacoes(novasMovimentacoes);

      setModalAlertDeleteMovimentacao(false);
    } catch (error) {
      console.error("Erro ao excluir movimentação:", error);
    }
  };

  const adicionarNovaCategoriaModal = async () => {
    if (!categorias.includes(categoriaModal)) {
      try {
        const response = await axios.post("http://localhost:8080/categorias", {
          nomeCategoria: categoriaModal,
        });
        setCategorias([...categorias, response.data.nomeCategoria]);
        setCategoriaModal("");
      } catch (error) {
        console.error("Erro ao criar nova categoria:", error);
      }
    }
  };

  // Filtra categorias que correspondem ao que está sendo digitado


  const categoriasFiltradasModal = categorias.filter((cat) =>
    cat.toLowerCase().includes(categoriaModal.toLowerCase())
  );

  const categoriaEscolhidaModal = (e) => {
    setCategoriaModal(e.target.value);
  };


  const categoriaEscolhida = (e) => {
    const valor = e.target.value;
    setCategoria(valor);
    const filtradas = categorias.filter((cat) =>
      cat.toLowerCase().includes(valor.toLowerCase())
    );
    setCategoriasFiltradas(filtradas);
  };

  const salvarEdicaoMovimentacao = async () => {
    try {
      // Cria o objeto com os dados atualizados
      const movimentacaoAtualizada = {
        descricao: descricaoModal,
        valor: parseFloat(valorModal),
        tipo: tipoModal,
        categoria: categoriaModal,
        data: dataModal,
        user_id: userId,
      };
  
      console.log("Movimentação atualizada:", movimentacaoAtualizada);
  
      // Envia a requisição para atualizar a movimentação no backend
      await axios.put(
        `http://localhost:8080/movimentacoes/${movimentacaoEditando}`,
        movimentacaoAtualizada
      );
  
      // Atualiza a lista de movimentações no frontend
      const novasMovimentacoes = movimentacoes.map((movimentacao) => {
        if (movimentacao.id === movimentacaoEditando) {
          return { ...movimentacao, ...movimentacaoAtualizada };
        }
        return movimentacao;
      });
  
      setMovimentacoes(novasMovimentacoes);  // Atualiza a tabela com os novos dados
      setModalIsOpenEdit(false);
      resetarCampos();
    } catch (error) {
      console.error("Erro ao salvar edição da movimentação:", error);
    }
  };

  const confirmaFiltro = () => {
    if (categoria!=""){
      const filtradas = movimentacoes.filter((movimentacao) =>
        movimentacao.categoria.nomeCategoria
          .toLowerCase()
          .includes(categoria.toLowerCase())
      );
      setMovimentacoesFiltradas(filtradas);
      setCategoriasFiltradas('');
      setCategoria('');
      setTrueCategoria(true);
    } else {
      alert("Selecione escolha os filtros!")
    }
  };

  const formatarData = (dataISO) => {
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}-${mes}-${ano}`;
  };

  const handleAplicarPeriodo = () => {
    setShowModal(false);
    setExibirGrafico(false);
    // Aqui, chamaremos a função para buscar movimentações filtradas
  };
  
    // Função para lidar com a mudança do select
    const handleSelectChange = (event) => {
      const value = event.target.value;
      setSelectedValue(value);

      if (value === '123') {
        setShowModal(true); // Exibe o modal
        resetSelect();
      } else {
        setShowModal(false); // Oculta o modal
      }
    };
  
  
  const resetSelect = () => {
  setSelectedValue(''); 
  };
  

  const handleCloseModal = () => {
  setShowModal(false);
  resetSelect();
  };

  
  return (
    <div className="container-relatorios">
      <div className="body-relatorios">
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <div className="headerModalTtl">
                <div className="voltaTitulo">
                  <label className="escritoBar">Período</label>
                </div>
              </div>
              <div className="mainModalPeriodo">
                <div className="inputsDateEsquerda">
                  <label className="EscritoLabelPreto">Data Inicial</label>
                  <input type="date" className="inputDatePeriodo" />
                  <button className="close-button">Cancelar</button>
                </div>
                <div className="meioModalPeriodo">
                  <label>Até</label>
                </div>
                <div className="inputsDateDireita">
                  <label>Data final</label>
                  <input type="date" className="inputDatePeriodo" />
                  <button
                    onClick={() => setShowModal(false)}
                    className="close-button"
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="filtros">
          <div className="header-filtros">
            <h2 className="h2Filtros">
              <u>Filtros</u>
            </h2>
          </div>
          <div className="body-filtros">
            <div className="escolhas">
              <label className="ttlSelecao">Periodo:</label>
              <select
                name="slcDias"
                id="slcDias"
                className="slcPrincipais"
                value={selectedValue}
                onChange={handleSelectChange}
              >
                <option value="" disabled></option>
                <option value="1">Hoje</option>
                <option value="7">Esta semana</option>
                <option value="15">Este mês</option>
                <option value="365">Este ano</option>
                <option value="30">Últimos 30 dias</option>
                <option value="12">Últimos 12 meses</option>
                <option value="0">Todo o período</option>
                <option value="123">Período personalizado</option>
              </select>
            </div>
            <div className="opcao-categoria-relatorios">
              <label>Categoria</label>
              <input
                className="Dois-inpt-categoria"
                type="text"
                value={categoria}
                onChange={categoriaEscolhida}
                placeholder="Digite"
                maxLength={30}
              />

              {categoriasFiltradas.length > 0 && (
                <ul className="sugestoes-categorias">
                  {categoriasFiltradas.map((cat, index) => (
                    <li key={index} onClick={() => setCategoria(cat)}>
                      {cat}
                    </li>
                  ))}
                </ul>
              )}
              <div
                className={`mostrar-seletor-grafico ${
                  activeTab === "grafico" ? "mostrar" : ""
                }`}
              >
                <label className="ttlSelecao">Gráfico:</label>
                <select
                  name="slcGraficoRelatorios"
                  className="slcPrincipais"
                  value={tipoGrafico}
                  onChange={(e) => setTipoGrafico(e.target.value)}
                >
                <option value="Bar">Barra</option>
                <option value="Pie">Pizza</option>
                <option value="Line">Linha</option>
                </select>
              </div>
            </div>
            <div className="baixo-left">
              <button className="btnConfirm" onClick={confirmaFiltro}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
        <div className="body-right">
          <div className="body-header">
            <button
              className={`btnEscolhaReal ${
                activeTab === "movimentacao" ? "active" : ""
              }`}
              onClick={() => setActiveTab("movimentacao")}
            >
              Movimentação
            </button>
            <button
              className={`btnEscolhaReal ${
                activeTab === "grafico" ? "active" : ""
              }`}
              onClick={() => setActiveTab("grafico")}
            >
              Gráfico
            </button>
          </div>

          {activeTab === "movimentacao" && (
            <div className="main-movimentacao">
              <div className="dois-painel-movimentacoes">
                <div className="dois-div-label-movimentacoes">
                  <label className="labelUltimasMovimentacoes">Últimas Movimentações</label>
                </div>
                <div className="div-table-movimentacoes">
                  <table>
                    <thead>
                      <tr>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th>Data</th>
                        <th>Tipo</th>
                        <th>Categoria</th>
                      </tr>
                    </thead>
                    <tbody>
                      {movimentacoesFiltradas.map((movimentacao) => (
                        <tr key={movimentacao.id}>
                          <td>{movimentacao.descricao}</td>
                          <td>R$ {movimentacao.valor.toFixed(2)}</td>
                          <td>{formatarData(movimentacao.data)}</td>
                          <td>{movimentacao.tipo}</td>
                          <td>{movimentacao.categoria.nomeCategoria}</td>

                          <td className="td-acoes-btn">
                            <button
                              onClick={() => {
                                console.log(movimentacao);
                                editarMovimentacao(movimentacao);
                              }}
                            >
                              <FontAwesomeIcon
                                className="icon-file"
                                icon={faFilePen}
                              />
                            </button>

                            <button
                              onClick={() =>
                                excluirMovimentacao(movimentacao.id)
                              }
                            >
                              <FontAwesomeIcon
                                className="icon-trash"
                                icon={faTrashCan}
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "grafico" && (
        <div className="main-grafico">
          <div className="dois-div-label-movimentacoes">
          <label className="labelUltimasMovimentacoes">Dados no Gráfico</label>
          </div>

          {/* Mostrar gráfico somente se categoriaSelecionada for válida */}
          {trueCategoria ? (

              <GraficoMovimentacoes
                movimentacoesFiltradas={movimentacoesFiltradas}
                tipoGrafico={tipoGrafico}
              />
          ) : (
           
            <p> 
              <div className="divBodyGraficos"> 
                <img src="./images/Finance.svg" className="graficoSemCategoriaImg" title="Finance" />
                <h3>Escolha uma categoria para visualizar o gráfico.</h3>
            </div>
            </p>
          )}
        </div>
      )}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpenEdit}
        onRequestClose={() => setModalIsOpenEdit(false)}
        contentLabel="Editar Movimentação"
        className="custom-modal"
      >
        <h2 className="title-modal">Editar Movimentação</h2>

        <div className="modal-container">
          <div className="modal-container-inputs">
            <div className="card-modal-descricao">
              <label>Descrição</label>
              <input
                type="text"
                value={descricaoModal}
                onChange={(e) => setDescricaoModal(e.target.value)}
              />
            </div>

            <div className="card-modal-valor">
              <label>Valor</label>
              <input
                type="text"
                value={valorModal}
                onChange={(e) => setValorModal(e.target.value)}
              />
            </div>

            <div className="card-modal-data">
              <label>Data</label>
              <input
                type="date"
                value={dataModal}
                onChange={(e) => setDataModal(e.target.value)}
              />
            </div>

            <div className="card-modal-opcao-categoria">
              <label>Categoria</label>
              <input
                className="inpt-categoria"
                type="text"
                value={categoriaModal}
                onChange={categoriaEscolhidaModal}
                placeholder="Digite"
                maxLength={30}
              />

              {categoriaModal && (
                <ul className="modal-sugestoes-categorias">
                  {categoriasFiltradasModal.length > 0 ? (
                    categoriasFiltradasModal.map((cat, index) => (
                      <li key={index} onClick={() => setCategoriaModal(cat)}>
                        {cat}
                      </li>
                    ))
                  ) : (
                    <div
                      className="modal-nova-categoria"
                      onClick={adicionarNovaCategoriaModal}
                    >
                      <button className="modal-btn-nova-categoria">
                        Criar categoria: "{categoriaModal}"
                      </button>
                    </div>
                  )}
                </ul>
              )}
            </div>

            <div className="card-modal-tipo">
              <label>Tipo</label>

              <div className="card-modal-tipo-input">
                <input
                  type="radio"
                  name="tipo"
                  value="entrada"
                  checked={tipoModal === "entrada"}
                  onChange={(e) => setTipoModal(e.target.value)}
                />
                <label>Entrada</label>
                <input
                  type="radio"
                  name="tipo"
                  value="saida"
                  checked={tipoModal === "saida"}
                  onChange={(e) => setTipoModal(e.target.value)}
                />
                <label>Saída</label>
              </div>
            </div>
          </div>
          <div className="modal-btns">
            <button onClick={salvarEdicaoMovimentacao}>Salvar</button>
            <button onClick={() => setModalIsOpenEdit(false)}>Cancelar</button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalAlertCamposVazios}
        onRequestClose={() => setModalAlertCamposVazios(false)}
        contentLabel="contentCampoVazio"
        className="custom-modal-campo-vazio"
      >
        <div className="modal-content-campo-vazio">
          <div className="modal-div-campo-vazio">
            <h2>Campos vazios</h2>
            <p>Por favor, preencha todos os campos.</p>
          </div>
          <div className="modal-btn-campo-vazio">
            <button onClick={() => setModalAlertCamposVazios(false)}>OK</button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={modalAlertDeleteMovimentacao}
        onRequestClose={() => setModalAlertDeleteMovimentacao(false)}
        contentLabel="contentDeletarMovimentacao"
        className="custom-modal-deletar-movimentacao"
      >
        <div className="modal-content-deletar-movimentacao">
          <div className="modal-div-deletar-movimentacao">
            <h2>Deletar movimentação</h2>
            <p>Você tem certeza que deseja deletar essa movimentação?</p>
          </div>
          <div className="modal-btns-deletar-movimentacao">
            <button
              className="btn-deletar-movimentacao"
              onClick={confirmarExclusao}
            >
              Deletar
            </button>
            <button
              className="btn-cancelar-deletar-movimentacao"
              onClick={() => setModalAlertDeleteMovimentacao(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Relatorios;