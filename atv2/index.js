const cursos = [];

/**
 * @param {Array} listaCursos
 * @param {string} codigo
 * @param {string} nome
 * @param {number} cargaHoraria
 * @param {boolean} ativo
 */
function inserirCurso(listaCursos, codigo, nome, cargaHoraria, ativo) {
  const novoCurso = { codigo, nome, cargaHoraria, ativo };
  listaCursos.push(novoCurso);
}

/**
 * @param {Array} listaCursos
 */
function listarCursos(listaCursos) {
  console.log("\n--- TODOS OS CURSOS CADASTRADOS ---");
  if (listaCursos.length === 0) {
    console.log("Nenhum curso cadastrado.");
    return;
  }
  listaCursos.forEach(curso => {
    console.log(`[${curso.codigo}] ${curso.nome} - CH: ${curso.cargaHoraria}h | Ativo: ${curso.ativo ? "Sim" : "Não"}`);
  });
}

/**
 * @param {Array} listaCursos
 * @returns {Array}
 */
function filtrarCursosAtivos(listaCursos) {
  return listaCursos.filter(curso => curso.ativo === true);
}

/**
 * @param {Array} cursosAtivos
 * @returns {number}
 */
function calcularMediaCargaHoraria(cursosAtivos) {
  if (cursosAtivos.length === 0) return 0;

  const cargasHorarias = cursosAtivos.map(curso => curso.cargaHoraria);
  
  const somaTotal = cargasHorarias.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0);
  
  return somaTotal / cursosAtivos.length;
}

/**
 * @param {Array} listaCursos
 */
function exibirRelatorio(listaCursos) {
  const ativos = filtrarCursosAtivos(listaCursos);
  const mediaCH = calcularMediaCargaHoraria(ativos);

  console.log("\n================ RELATÓRIO CORRENTE ================");
  console.log(`Total de cursos cadastrados : ${listaCursos.length}`);
  console.log(`Total de cursos ativos      : ${ativos.length}`);
  console.log(`Média da CH (Cursos Ativos) : ${mediaCH.toFixed(2)}h`);
  console.log("====================================================");
}

inserirCurso(cursos, "DEV01", "Desenvolvimento Web Full Stack", 400, true);
inserirCurso(cursos, "DATA01", "Ciência de Dados com Python", 360, true);
inserirCurso(cursos, "UX01", "Design de Experiência do Usuário (UX)", 120, false);
inserirCurso(cursos, "MOBILE01", "Desenvolvimento Mobile com Flutter", 200, true);
inserirCurso(cursos, "NET01", "Redes de Computadores", 80, false);

listarCursos(cursos);

exibirRelatorio(cursos);
