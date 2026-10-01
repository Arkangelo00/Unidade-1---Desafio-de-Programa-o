import { processarDesempenho } from "../utils/calculos.js";

export function criarFiltro(tipo, valor) {
  if (tipo === "mediaMinima") {
    return (aluno) => aluno.media >= valor;
  }
  if (tipo === "curso") {
    return (aluno) => aluno.curso.toLowerCase() === valor.toLowerCase();
  }
  return () => true;
}

export function gerarRelatorio(alunos, filtrar, formatar, comparar = null, mediaMinima = 6) {
  if (!alunos || alunos.length === 0) {
    return "Coleção de alunos está vazia.";
  }

  let processados = alunos.map((a) => processarDesempenho(a, mediaMinima));

  if (typeof filtrar === "function") {
    processados = processados.filter(filtrar);
  }

  if (processados.length === 0) {
    return "Nenhum aluno atendeu aos critérios do relatório.";
  }

  if (typeof comparar === "function") {
    processados.sort(comparar);
  }

  if (typeof formatar === "function") {
    return formatar(processados);
  }

  return processados;
}

export const Formatadores = {
  aprovadosPorNome: (alunos) => {
    return alunos
      .map((a) => `[APROVADO] Nome: ${a.nome} | Matrícula: ${a.matricula} | Média: ${a.media.toFixed(2)}`)
      .join("\n");
  },

  reprovados: (alunos) => {
    return alunos
      .map((a) => `[REPROVADO] Nome: ${a.nome} | Média: ${a.media.toFixed(2)} | Curso: ${a.curso}`)
      .join("\n");
  },

  csv: (alunos) => {
    const cabecalho = "id,matricula,nome,email,curso,media,situacao";
    const linhas = alunos.map(
      (a) => `${a.id},"${a.matricula}","${a.nome}","${a.email}","${a.curso}",${a.media},"${a.situacao}"`
    );
    return [cabecalho, ...linhas].join("\n");
  },

  resumoPorCurso: (alunos) => {
    const agrupado = alunos.reduce((acc, a) => {
      if (!acc[a.curso]) {
        acc[a.curso] = { quantidade: 0, somaMedias: 0 };
      }
      acc[a.curso].quantidade += 1;
      acc[a.curso].somaMedias += a.media;
      return acc;
    }, {});

    return Object.entries(agrupado)
      .map(([curso, dados]) => {
        const mediaGeral = (dados.somaMedias / dados.quantidade).toFixed(2);
        return `Curso: ${curso} | Total de Alunos: ${dados.quantidade} | Média Geral: ${mediaGeral}`;
      })
      .join("\n");
  },
};
