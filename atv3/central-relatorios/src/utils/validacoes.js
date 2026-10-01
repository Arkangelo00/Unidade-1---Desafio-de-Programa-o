export function normalizarTexto(texto) {
  return texto ? texto.trim().replace(/\s+/g, " ") : "";
}

export function validarAluno(dados) {
  const nome = normalizarTexto(dados.nome);
  const email = normalizarTexto(dados.email).toLowerCase();
  const curso = normalizarTexto(dados.curso);
  const matricula = normalizarTexto(dados.matricula);

  if (nome.length < 3) {
    throw new Error("O nome deve conter pelo menos 3 caracteres.");
  }

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email)) {
    throw new Error("Formato de e-mail inválido.");
  }

  if (!matricula) {
    throw new Error("A matrícula é obrigatória.");
  }

  if (Array.isArray(dados.notas)) {
    const notasValidas = dados.notas.every(
      (nota) => typeof nota === "number" && nota >= 0 && nota <= 10
    );
    if (!notasValidas) {
      throw new Error("Todas as notas devem estar entre 0 e 10.");
    }
  }

  return { nome, email, curso, matricula };
}
