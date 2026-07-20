/**
 * AdminControllers.js
 * -------------------
 *   POST /Admin/codigo        { codigo }  — público, é a porta de entrada do admin
 *   GET  /Admin/usuarios                  — admin only
 *   PUT  /Admin/promover      { nome }    — admin only
 *   PUT  /Admin/rebaixar      { nome }    — admin only
 *   GET  /Admin/estatisticas              — admin only
 */
import AdminService from "../Services/AdminService.js";

const AdminController = {
  async entrarComCodigo(req, res) {
    try {
      const { codigo } = req.body;
      const resultado = await AdminService.entrarComCodigo(codigo);
      res.json(resultado);
    } catch (error) {
      res.status(error.statusCode || 401).json({ message: error.message });
    }
  },

  async listarUsuarios(req, res) {
    try {
      const usuarios = await AdminService.listarUsuarios();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async promoverParaAdmin(req, res) {
    try {
      const { nome } = req.body;
      const usuario = await AdminService.promoverParaAdmin(nome);
      res.json({ message: `${usuario.nome} agora é admin.`, usuario });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async rebaixarAdmin(req, res) {
    try {
      const { nome } = req.body;
      const usuario = await AdminService.rebaixarAdmin(nome);
      res.json({ message: `${usuario.nome} não é mais admin.`, usuario });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async estatisticas(req, res) {
    try {
      const stats = await AdminService.estatisticas();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default AdminController;