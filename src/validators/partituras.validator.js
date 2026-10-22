const { body } = require("express-validator");
const { pool } = require("../config/database");

const anoAtual = new Date().getFullYear();

async function validarCategoriaExistente(idCategoria) {
  const [categorias] = await pool.execute(
    "SELECT id_categoria FROM categoria WHERE id_categoria = ?",
    [idCategoria],
  );

  if (categorias.length === 0) {
    throw new Error("A categoria informada não está cadastrada");
  }
}

async function validarUsuarioExistente(idUsuario) {
  const [usuarios] = await pool.execute(
    "SELECT id_usuario FROM usuario WHERE id_usuario = ?",
    [idUsuario],
  );

  if (usuarios.length === 0) {
    throw new Error("O usuário informado não está cadastrado");
  }
}

async function validarMusicaExistente(idMusica) {
  const [musicas] = await pool.execute(
    "SELECT id_musica FROM musica WHERE id_musica = ?",
    [idMusica],
  );

  if (musicas.length === 0) {
    throw new Error("A música informada não está cadastrada");
  }
}

const validarPartitura = [
  body("id_categoria")
    .exists({ checkFalsy: true })
    .withMessage("O id da categoria é obrigatório")
    .bail()
    .isInt({ min: 1 })
    .withMessage("O id da categoria deve ser um número inteiro positivo")
    .toInt()
    .bail()
    .custom(validarCategoriaExistente),

  body("titulo")
    .exists({ checkFalsy: true })
    .withMessage("O título da partitura é obrigatório")
    .bail()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage("O título deve ter entre 1 e 200 caracteres"),

  body("descricao")
    .optional()
    .trim()
    .isLength({ max: 16000 })
    .withMessage("A descrição deve ter no máximo 16000 caracteres"),

  body("origem")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("A origem deve ter no máximo 200 caracteres"),

  body("data_aquisicao")
    .optional()
    .isISO8601({ strict: true, strictSeparator: true })
    .withMessage("A data de aquisição deve estar no formato AAAA-MM-DD"),

  body("estado_conservacao")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("O estado de conservação deve ter no máximo 50 caracteres"),

  body("id_usuario_cadastro")
    .exists({ checkFalsy: true })
    .withMessage("O id do usuário responsável pelo cadastro é obrigatório")
    .bail()
    .isInt({ min: 1 })
    .withMessage(
      "O id do usuário responsável pelo cadastro deve ser um número inteiro positivo",
    )
    .toInt()
    .bail()
    .custom(validarUsuarioExistente),

  body("id_musica")
    .optional()
    .isInt({ min: 1 })
    .withMessage("O id da música deve ser um número inteiro positivo")
    .toInt()
    .bail()
    .custom(validarMusicaExistente),

  body("autor")
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage("O autor deve ter no máximo 150 caracteres"),

  body("ano_criacao")
    .optional()
    .isInt({ min: 0, max: anoAtual })
    .withMessage("O ano de gravação deve ser um número inteiro entre 0 e o ano atual")
    .toInt(),

  body("arquivo_url")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("O arquivo da partitura deve ter no máximo 500 caracteres")
    .bail()
    .isURL()
    .withMessage("O arquivo da partitura deve ser uma URL válida"),
];

module.exports = { validarPartitura };
