export function calcularMedia(notas) {
  if (!notas || notas.length === 0) return 0;
  const soma = notas.reduce((acc, nota) => acc + nota, 0);
  return Number((soma / notas.length).toFixed(2));
}

export function processarDesempenho(aluno, mediaMinima = 6) {
  const media = calcularMedia(aluno.notas);
  const situacao = media >= mediaMinima ? "Aprovado" : "Reprovado";

  return {
    ...aluno,
    notas: [...aluno.notas],
    media,
    situacao,
  };
}
