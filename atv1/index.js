function calcularMedia(notas) {
  let soma = 0;
  for (let i = 0; i < notas.length; i++) {
    soma += notas[i];
  }
  return soma / notas.length;
}

function classificarSituacao(media, frequencia) {
  if (media >= 70 && frequencia >= 75) {
    return "Aprovado";
  } else if (media >= 40 && media < 70 && frequencia >= 75) {
    return "Recuperação";
  } else {
    return "Reprovado";
  }
}

function executarCadastro() {
  const qtdAlunosTexto = prompt("Quantos alunos serão cadastrados?");
  const qtdAlunos = Number(qtdAlunosTexto);

  const listaAlunos = [];
  let totalAprovados = 0;
  let totalRecuperacao = 0;
  let totalReprovados = 0;

  for (let i = 1; i <= qtdAlunos; i++) {
    console.log(`--- Cadastrando o ${i}º aluno ---`);
    
    const nome = prompt(`Nome do ${i}º aluno:`);
    const matricula = prompt(`Matrícula do ${i}º aluno:`);

    const nota1 = Number(prompt(`Digite a 1ª nota de ${nome}:`));
    const nota2 = Number(prompt(`Digite a 2ª nota de ${nome}:`));
    const nota3 = Number(prompt(`Digite a 3ª nota de ${nome}:`));

    const frequencia = Number(prompt(`Digite a frequência de ${nome} (em %):`));

    const notas = [nota1, nota2, nota3];
    const media = calcularMedia(notas);

    const situacao = classificarSituacao(media, frequencia);

    if (situacao === "Aprovado") totalAprovados++;
    else if (situacao === "Recuperação") totalRecuperacao++;
    else totalReprovados++;

    listaAlunos.push({
      nome: nome,
      matricula: matricula,
      media: media.toFixed(2),
      situacao: situacao
    });
  }

  console.log("\n====== LISTA DE ALUNOS ======");
  listaAlunos.forEach(aluno => {
    console.log(`Nome: ${aluno.nome} | Matrícula: ${aluno.matricula} | Média: ${aluno.media} | Situação: ${aluno.situacao}`);
  });

  console.log("\n====== ESTATÍSTICAS FINAIS ======");
  console.log(`Total de Aprovados: ${totalAprovados}`);
  console.log(`Total em Recuperação: ${totalRecuperacao}`);
  console.log(`Total de Reprovados: ${totalReprovados}`);
}

executarCadastro();
