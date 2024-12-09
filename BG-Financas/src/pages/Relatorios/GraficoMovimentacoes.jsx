import React from "react";
import { Bar, Pie, Line } from "react-chartjs-2";

function GraficoMovimentacoes({ movimentacoesFiltradas = [], tipoGrafico }) {
  const tiposGraficos = {
    Bar: Bar,
    Pie: Pie,
    Line: Line,
  };

  // Paleta de cores
  const cores = [
    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
    "#FF9F40", "#FF5733", "#33FF57", "#3357FF", "#FF33A2",
  ];

  // Dados do gráfico
  const dadosGrafico = {
    labels: movimentacoesFiltradas.map((mov) => mov.descricao),
    datasets: [
      {
        label: "Valores das Movimentações",
        data: movimentacoesFiltradas.map((mov) => mov.valor),
        backgroundColor: movimentacoesFiltradas.map(
          (_, index) => cores[index % cores.length]
        ),
        borderColor: movimentacoesFiltradas.map(
          (_, index) => cores[index % cores.length]
        ),
        borderWidth: 1,
      },
    ],
  };

  const optionsGrafico = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: `Gráfico de ${tipoGrafico}`,
      },
    },
  };

  const GraficoSelecionado = tiposGraficos[tipoGrafico] || Bar; // Tipo padrão: Bar

  return (
    <div 
    style={
      tipoGrafico === "Pie"
        ? { width: "33%", margin: "0 auto" }
        : { width: "60%", margin: "0 auto" }
    }
    >
      {movimentacoesFiltradas.length > 0 ? (
        <>
          <GraficoSelecionado data={dadosGrafico} options={optionsGrafico} />
        </>
      ) : (
        <p style={{ textAlign: "center" }}>
          Nenhuma movimentação disponível para exibir no gráfico.
        </p>
      )}
    </div>
  );
}

export default GraficoMovimentacoes;
