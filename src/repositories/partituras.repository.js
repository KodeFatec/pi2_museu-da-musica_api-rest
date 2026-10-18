const { pool } = require("../config/database");
const consultaPartitura =
  "select * from partitura p inner join item_acervo i on p.id_item = i.id_item";

function montarPartitura(linha) {
  return {
    id_item: linha.id_item,
    id_musica: linha.id_musica,
    id_categoria: linha.id_categoria,
    titulo: linha.titulo,
    descricao: linha.descricao,
    origem: linha.origem,
    data_aquisicao: linha.data_aquisicao,
    estado_conservacao: linha.estado_conservacao,
    autor: linha.autor,
    ano_criacao: linha.ano_criacao,
    arquivo_url: linha.arquivo_url,
    id_usuario_cadastro: linha.id_usuario_cadastro,
  };
}

async function listar() {
  const [linhas] = await pool.query(consultaPartitura);
  return linhas.map(montarPartitura);
}

async function buscarPorId(id) {
  const [linhas] = await pool.query(
    `${consultaPartitura} WHERE p.id_item = ?`,
    [id],
  );
  if (linhas.length === 0) {
    return null;
  }
  return montarPartitura(linhas[0]);
}

async function criar(dadosPartitura) {
  const itemAcervo = {
    id_categoria: dadosPartitura.id_categoria,
    titulo: dadosPartitura.titulo,
    descricao: dadosPartitura.descricao ?? null,
    origem: dadosPartitura.origem ?? null,
    data_aquisicao: dadosPartitura.data_aquisicao ?? null,
    estado_conservacao: dadosPartitura.estado_conservacao ?? null,
    id_usuario_cadastro: dadosPartitura.id_usuario_cadastro ?? null,
  };
  const sqlItem = "insert into item_acervo SET ?";
  const [resultadoItem] = await pool.query(sqlItem, [itemAcervo]);

  const partitura = {
    id_item: resultadoItem.insertId,
    id_musica: dadosPartitura.id_musica,
    autor: dadosPartitura.autor,
    ano_criacao: dadosPartitura.ano_criacao,
    arquivo_url: dadosPartitura.arquivo_url,
  };

  const sqlPartitura = "insert into partitura SET ?";
  const [resultadoPartitura] = await pool.query(sqlPartitura, [partitura]);

  return buscarPorId(resultadoItem.insertId);
}

async function atualizar(id, dadosPartitura) {
  const conexao = await pool.getConnection();
  try {
    await conexao.beginTransaction();
    const [partituraExistente] = await conexao.execute(
      "SELECT id_item FROM partitura WHERE id_item = ?",
      [id],
    );

    if (partituraExistente.length === 0) {
      await conexao.rollback();
      return null;
    }

    await conexao.execute(
      `UPDATE item_acervo
       SET id_categoria=?, titulo=?, descricao=?, origem=?,
           data_aquisicao=?, estado_conservacao=?, id_usuario_cadastro=?
       WHERE id_item=?`,
      [
        dadosPartitura.id_categoria,
        dadosPartitura.titulo,
        dadosPartitura.descricao ?? null,
        dadosPartitura.origem ?? null,
        dadosPartitura.data_aquisicao ?? null,
        dadosPartitura.estado_conservacao ?? null,
        dadosPartitura.id_usuario_cadastro,
        id,
      ],
    );

    await conexao.execute(
      `UPDATE partitura
       SET id_musica=?, autor=?, ano_criacao=?, arquivo_url=?
       WHERE id_item=?`,
      [
        dadosPartitura.id_musica ?? null,
        dadosPartitura.autor ?? null,
        dadosPartitura.ano_criacao ?? null,
        dadosPartitura.arquivo_url ?? null,
        id,
      ],
    );

    await conexao.commit();
    return buscarPorId(id);
  } catch (erro) {
    await conexao.rollback();
    throw erro;
  } finally {
    conexao.release();
  }
}

async function remover(id) {
  const [resultado] = await pool.execute(
    "DELETE FROM partitura where id_item=?",
    [id],
  );

  const [resultadoItem] = await pool.execute(
    "DELETE FROM item_acervo where id_item=?",
    [id],
  );

  return resultado.affectedRows > 0 && resultadoItem.affectedRows > 0;
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
