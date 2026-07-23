/**
 * AdminService.js
 * ---------------
 * Duas responsabilidades:
 *  1) Login de admin só com um código fixo (sem e-mail/conta) — para
 *     entrar rápido e criar tutoriais.
 *  2) Funções de gestão (listar usuários, promover/rebaixar admin,
 *     estatísticas) — usadas por quem já é admin.
 *
 * ⚠️ IMPORTANTE (bug corrigido nesta versão): o authMiddleware.js real
 * faz `User.findById(decoded.id)` — ou seja, TODO token precisa apontar
 * para um usuário de verdade no banco, senão a requisição é barrada com
 * "Usuário não encontrado" antes mesmo de chegar no adminMiddleware.
 * A versão anterior deste arquivo gerava um token sem "id" (só
 * { role: "admin" }), o que quebrava qualquer rota protegida — incluindo
 * criar tutorial. Agora, entrar com código cria (uma vez só) ou reaproveita
 * um usuário real chamado "Administrador" no banco, e o token aponta
 * para o _id desse usuário.
 *
 * Como o sistema não usa mais e-mail, promover/rebaixar busca o usuário
 * por "nome" (único, ver Models/User.js) — o e-mail interno é gerado
 * sozinho e ninguém sabe qual é.
 */
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import Tutorial from "../Models/Tutorial.js";

const NOME_ADMIN_CODIGO = "Administrador";

function gerarToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );
}

const AdminService = {
  // ---------- Entrar como admin só com um código, sem e-mail/conta ----------
  async entrarComCodigo(codigo) {
    const codigoCorreto = process.env.ADMIN_CODE || "121728";

    if (String(codigo || "").trim() !== codigoCorreto) {
      const error = new Error("Código incorreto.");
      error.statusCode = 401;
      throw error;
    }

    // O authMiddleware exige um usuário de verdade por trás do token.
    // Por isso criamos (uma vez só) um usuário reservado "Administrador"
    // — ninguém faz login nele por senha, só por este código.
    let adminUser = await User.findOne({ nome: NOME_ADMIN_CODIGO });

    if (!adminUser) {
      const senhaAleatoria = crypto.randomBytes(24).toString("hex");
      adminUser = await User.create({
        nome: NOME_ADMIN_CODIGO,
        email: `admin.codigo.${Date.now()}@sememail.facilitatech`,
        password: await bcrypt.hash(senhaAleatoria, 10),
        role: "admin",
        active: true,
      });
    } else if (adminUser.role !== "admin" || !adminUser.active) {
      // Defesa extra: garante que continua admin/ativo mesmo se alguém
      // mexer nesse usuário manualmente no banco.
      adminUser.role = "admin";
      adminUser.active = true;
      await adminUser.save();
    }

    return {
      token: gerarToken(adminUser),
      user: { nome: adminUser.nome, role: adminUser.role },
    };
  },

  // ---------- Funções extras para o admin ----------

  async listarUsuarios() {
    return User.find({}, "nome role createdAt").sort({ createdAt: -1 });
  },

  async promoverParaAdmin(nome) {
    const usuario = await User.findOneAndUpdate(
      { nome: String(nome || "").trim() },
      { role: "admin" },
      { new: true }
    ).select("-password");
    if (!usuario) throw new Error("Usuário não encontrado.");
    return usuario;
  },

  async rebaixarAdmin(nome) {
    const usuario = await User.findOneAndUpdate(
      { nome: String(nome || "").trim() },
      { role: "user" },
      { new: true }
    ).select("-password");
    if (!usuario) throw new Error("Usuário não encontrado.");
    return usuario;
  },

  async estatisticas() {
    const [totalUsuarios, totalAdmins, totalTutoriais] = await Promise.all([
      User.countDocuments({}),
      User.countDocuments({ role: "admin" }),
      Tutorial.countDocuments({}),
    ]);
    return { totalUsuarios, totalAdmins, totalTutoriais };
  },
};

export default AdminService;