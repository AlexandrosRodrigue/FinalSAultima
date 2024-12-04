// import React, { useState, useEffect} from "react";
// import axios from "axios";
// import "./index.css";


// function Relatorios() {

  // const [selectedPeriod, setSelectedPeriod] = useState('');
  // const [categoria, setCategoria] = useState('');
  // const [selectedChartType, setSelectedChartType] = useState('barra');
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('/api/movimentacoes', {
  //         params: {
  //           period: selectedPeriod,
  //           category: categoria,
  //         },
  //       });
  //       const movimentacoes = response.data;
        
  //       const chartData = {
  //         labels: movimentacoes.map(item => item.categoria),
  //         datasets: [
  //           {
  //             label: 'Gastos',
  //             data: movimentacoes.map(item => item.valor),
  //             backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
  //           },
  //         ],
  //       };

  //       setData(chartData);
  //     } catch (error) {
  //       console.error('Erro ao buscar dados:', error);
  //     }
  //   };

  //   fetchData();
  // }, [selectedPeriod, categoria]);

//   const [movimentacoes, setMovimentacoes] = useState([]);
//   const [activeTab, setActiveTab] = useState("movimentacao");
//   const [categoria, setCategoria] = useState(""); // Inicialize aqui
//   const [categorias, setCategorias] = useState([]); // Inicialize aqui
//   const [selectedValue, setSelectedValue] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [exibirGrafico, setExibirGrafico] = useState(false);
//   const [dataInicial, setDataInicial] = useState(""); // Para o período personalizado
//   const [dataFinal, setDataFinal] = useState(""); // Para o período personalizado
//   const [categoriaInput, setCategoriaInput] = useState("");

//   const userId = Number(localStorage.getItem("userId"));
//   console.log(userId);

//   const formatarData = (dataISO) => {
//     const [ano, mes, dia] = dataISO.split("-");
//     return `${dia}-${mes}-${ano}`;
//   };

//   const handleCategoriaInputChange = (e) => {
//     setCategoriaInput(e.target.value);
//   };
  
//   const fetchMovimentacoes = async () => {
//     try {
//       const params = {
//         categoria: categoria || undefined, // Aplica o filtro de categoria, se houver
//         dataInicial: selectedValue === "123" ? dataInicial : undefined,
//         dataFinal: selectedValue === "123" ? dataFinal : undefined,
//       };
  
//       const response = await axios.get(
//         `http://localhost:8080/movimentacoes/user/${userId}`,
//         { params }
//       );
//       setMovimentacoes(response.data);
//     } catch (error) {
//       console.error("Erro ao buscar movimentações:", error);
//     }
//   };
  
//   // Função handleConfirmar que chama fetchMovimentacoes
//   const handleConfirmar = () => {
//     setCategoria(categoriaInput); // Aplica o filtro de categoria
//     setExibirGrafico(true); // Exibe o gráfico (se necessário)
    
//     fetchMovimentacoes(); // Chama a função de busca de movimentações
//   };

//   const categoriaEscolhida = (e) => {
//     setCategoria(e.target.value);
//   };

//   const categoriasFiltradas = categorias.filter((cat) =>
//     cat.toLowerCase().includes(categoria.toLowerCase())
//   );

// const handleAplicarPeriodo = () => {
//   setShowModal(false);
//   setExibirGrafico(false);
//   // Aqui, chamaremos a função para buscar movimentações filtradas
// };

//   // Função para lidar com a mudança do select
//   const handleSelectChange = (event) => {
//     const value = event.target.value;
//     setSelectedValue(value);

//     // Verifica se o valor é "123" (Período personalizado)
//     if (value === '123') {
//       setShowModal(true); // Exibe o modal
//       resetSelect();
//     } else {
//       setShowModal(false); // Oculta o modal
//     }
//   };


// // Função para resetar o valor do select
// const resetSelect = () => {
// setSelectedValue(''); // Reseta o select para o estado inicial
// };

// // Função para fechar o modal e resetar o select
// const handleCloseModal = () => {
// setShowModal(false);
// resetSelect(); // Reseta o select ao fechar o modal
// };


//   return (
//     <div className="container-relatorios">
//       <div className="body-relatorios">
//       {showModal && (
//               <div className="modal">
//                 <div className="modal-content">
//                   <div className="headerModalTtl">
//                     <div className="voltaTitulo">
//                       <label className="escritoBar">Período</label>
//                     </div>
//                   </div>
//                   <div className="mainModalPeriodo">
//                     <div className="inputsDateEsquerda">
//                       <label className="EscritoLabelPreto">Data Inicial</label>
//                       <input type="date" className='inputDatePeriodo'/>
//                       <button className="close-button">Cancelar</button>
//                     </div>
//                     <div className="meioModalPeriodo">
//                       <label>Até</label>
//                     </div>
//                     <div className="inputsDateDireita">
//                       <label>Data final</label>
//                       <input type="date" className='inputDatePeriodo' />
//                       <button onClick={() => setShowModal(false)} className="close-button">Aplicar</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//         <div className="filtros">
//           <div className="header-filtros">
//             <h2 className="h2Filtros">
//               <u>Filtros</u>
//             </h2>
//           </div>
//           <div className="body-filtros">
//             {/* <div className="escolhas">
//                             <label className='ttlSelecao'>Gráfico:</label>
//                             <select name="slcGrafico" id="slcGrafico" className="slcPrincipais" onChange={handleGraficoChange}>
//                                 <option value=""></option>
//                                 <option value="pizza">Pizza</option>
//                                 <option value="colunas">Colunas</option>
//                             </select>
//                         </div> */}
//             <div className="escolhas">
//               <label className="ttlSelecao">Periodo:</label>
//               <select name="slcDias" id="slcDias" className="slcPrincipais"value={selectedValue} onChange={handleSelectChange} >
//                   <option value="" disabled></option>
//                   <option value="1">Hoje</option>
//                   <option value="7">Esta semana</option>
//                   <option value="15">Este mês</option>
//                   <option value="365">Este ano</option>
//                   <option value="30">Últimos 30 dias</option>
//                   <option value="12">Últimos 12 meses</option>
//                   <option value="0">Todo o período</option>
//                   <option value="123">Período personalizado</option>
//               </select>
//             </div>
//             <div className="opcao-categoria-relatorios">
//               <label>Categoria</label>
//               <input
//                 className="inpt-categoria"
//                 type="text"
//                 value={categoriaInput}
//                 onChange={handleCategoriaInputChange}
//                 placeholder="Digite"
//                 maxLength={30}
//               />

//               {categoriaInput && (
//                 <ul className="sugestoes-categorias">
//                   {categoriasFiltradas.length > 0
//                     ? categoriasFiltradas.map((cat, index) => (
//                         <li key={index} onClick={() => setCategoriaInput(cat)}>
//                           {cat}
//                         </li>
//                       ))
//                     : null}
//                 </ul>
//               )}
//               <div className={`mostrar-seletor-grafico ${activeTab === 'grafico' ? 'mostrar' : ''}`}>
//                 <label className="ttlSelecao">Gráfico:</label>
//                 <select name="slcGraficoRelatorios" id="slcGraficoRelatorios" className="slcPrincipais">
//                     <option value=""></option>
//                     <option value="barra">Barra</option>
//                     <option value="coluna">Coluna</option>
//                     <option value="pizza">Pizza</option>
//                 </select>
//               </div>
//             </div>
//             <div className="baixo-left">
//               <button className="btnConfirm"  onClick={handleConfirmar}>Confirmar</button>
//             </div>
//           </div>
//         </div>
//         <div className="body-right">
//           <div className="body-header">
//             <button
//               className={`btnEscolhaReal ${
//                 activeTab === "movimentacao" ? "active" : ""
//               }`}
//               onClick={() => setActiveTab("movimentacao")}
//             >
//               Movimentação
//             </button>
//             <button
//               className={`btnEscolhaReal ${activeTab === 'grafico' ? 'active' : ''}`}
//               onClick={() => setActiveTab('grafico')}
//             >
//                 Gráfico
//             </button>
//           </div>

//           {activeTab === "movimentacao" && (
//             <div className="main-movimentacao">
//               <div className="painel-movimentacoes">
//                 <div className="div-label-movimentacoes">
//                   <label>Últimas Movimentações</label>
//                 </div>
//                 <div className="div-table-movimentacoes">
//                   <table>
//                     <thead>
//                       <tr>
//                         <th>Descrição</th>
//                         <th>Valor</th>
//                         <th>Data</th>
//                         <th>Tipo</th>
//                         <th>Categoria</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                     {movimentacoes.slice(-10).map((movimentacao) => (
//                       <tr key={movimentacao.id}>
//                         <td>{movimentacao.descricao}</td>
//                         <td>R$ {movimentacao.valor.toFixed(2)}</td>
//                         <td>{formatarData(movimentacao.data)}</td>
//                         <td>{movimentacao.tipo}</td>
//                         <td>{movimentacao.categoria.nomeCategoria || "Sem Categoria"}</td>
//                       </tr>
//                     ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           )}
//           {activeTab === 'grafico' && (
//             <div className="main-grafico">
//                 <div className='div-label-movimentacoes'>
//                 <label>Dados no Gráfico</label>
//             </div>
//                 {exibirGrafico && renderGrafico()}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Relatorios;


import React, { useState, useEffect} from "react";
import axios from "axios";
import "./index.css";


function Relatorios() {

 const [movimentacoes, setMovimentacoes] = useState([]);
  const [activeTab, setActiveTab] = useState("movimentacao");
  const [categoria, setCategoria] = useState(""); // Inicialize aqui
  const [categorias, setCategorias] = useState([]); // Inicialize aqui
  const [selectedValue, setSelectedValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [exibirGrafico, setExibirGrafico] = useState(false);

  const userId = Number(localStorage.getItem("userId"));
  console.log(userId);


  useEffect(() => {
    const fetchMovimentacoes = async () => {
      try {
        const params = {
          categoria: categoria || undefined,
        };
  
        const response = await axios.get(
          `http://localhost:8080/movimentacoes/user/${userId}`,
          { params }
        );
        console.log(response.data);
        setMovimentacoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar movimentações:", error);
      }
    };
  
    fetchMovimentacoes();
  }, [userId, categoria, selectedValue]);

  const formatarData = (dataISO) => {
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}-${mes}-${ano}`;
  };
  
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

  const categoriaEscolhida = (e) => {
    setCategoria(e.target.value);
  };

  const categoriasFiltradas = categorias.filter((cat) =>
    cat.toLowerCase().includes(categoria.toLowerCase())
  );

const handleAplicarPeriodo = () => {
  setShowModal(false);
  setExibirGrafico(false);
  // Aqui, chamaremos a função para buscar movimentações filtradas
};

  // Função para lidar com a mudança do select
  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);

    // Verifica se o valor é "123" (Período personalizado)
    if (value === '123') {
      setShowModal(true); // Exibe o modal
      resetSelect();
    } else {
      setShowModal(false); // Oculta o modal
    }
  };


// Função para resetar o valor do select
const resetSelect = () => {
setSelectedValue(''); // Reseta o select para o estado inicial
};

// Função para fechar o modal e resetar o select
const handleCloseModal = () => {
setShowModal(false);
resetSelect(); // Reseta o select ao fechar o modal
};


const handleConfirmar = () => {
  setExibirGrafico(true);
  fetchMovimentacoes(); // Atualiza as movimentações com os filtros aplicados.
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
                    <input type="date" className='inputDatePeriodo'/>
                    <button className="close-button">Cancelar</button>
                  </div>
                  <div className="meioModalPeriodo">
                    <label>Até</label>
                  </div>
                  <div className="inputsDateDireita">
                    <label>Data final</label>
                    <input type="date" className='inputDatePeriodo' />
                    <button onClick={() => setShowModal(false)} className="close-button">Aplicar</button>
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
          {/* <div className="escolhas">
                          <label className='ttlSelecao'>Gráfico:</label>
                          <select name="slcGrafico" id="slcGrafico" className="slcPrincipais" onChange={handleGraficoChange}>
                              <option value=""></option>
                              <option value="pizza">Pizza</option>
                              <option value="colunas">Colunas</option>
                          </select>
                      </div> */}
          <div className="escolhas">
            <label className="ttlSelecao">Periodo:</label>
            <select name="slcDias" id="slcDias" className="slcPrincipais"value={selectedValue} onChange={handleSelectChange} >
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
              className="inpt-categoria"
              type="text"
              value={categoria}
              onChange={categoriaEscolhida}
              placeholder="Digite"
              maxLength={30}
            />

            {categoria && (
              <ul className="sugestoes-categorias">
                {categoriasFiltradas.length > 0 ? (
                  categoriasFiltradas.map((cat, index) => (
                    <li key={index} onClick={() => setCategoria(cat)}>
                      {cat}
                    </li>
                  ))
                )  : null}
              </ul>
            )}
            <div className={`mostrar-seletor-grafico ${activeTab === 'grafico' ? 'mostrar' : ''}`}>
              <label className="ttlSelecao">Gráfico:</label>
              <select name="slcGraficoRelatorios" id="slcGraficoRelatorios" className="slcPrincipais">
                  <option value=""></option>
                  <option value="barra">Barra</option>
                  <option value="coluna">Coluna</option>
                  <option value="pizza">Pizza</option>
              </select>
            </div>
          </div>
          <div className="baixo-left">
            <button className="btnConfirm" onClick={handleConfirmar} >Confirmar</button>
          </div>
        </div>
      </div>
      <div className="body-right">
        <div className="body-header">
          <button
            className={`btnEscolhaReal ${
              activeTab === "movimentacao" ? "active" : ""}`}
            onClick={() => setActiveTab("movimentacao")}
          >
            Movimentação
          </button>
          <button
            className={`btnEscolhaReal ${activeTab === 'grafico' ? 'active' : ''}`}
            onClick={() => setActiveTab('grafico')}
          >
              Gráfico
          </button>
        </div>

        {activeTab === "movimentacao" && (
          <div className="main-movimentacao">
            <div className="painel-movimentacoes">
              <div className="div-label-movimentacoes">
                <label>Últimas Movimentações</label>
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
                  {movimentacoes.slice(-10).map((movimentacao) => (
                    <tr key={movimentacao.id}>
                      <td>{movimentacao.descricao}</td>
                      <td>R$ {movimentacao.valor.toFixed(2)}</td>
                      <td>{formatarData(movimentacao.data)}</td>
                      <td>{movimentacao.tipo}</td>
                      <td>{movimentacao.categoria.nomeCategoria || "Sem Categoria"}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'grafico' && (
          <div className="main-grafico">
              <div className='div-label-movimentacoes'>
              <label>Dados no Gráfico</label>
          </div>
              {exibirGrafico && renderGrafico()}
          </div>
        )}
      </div>
    </div>
  </div>
);
}

export default Relatorios;