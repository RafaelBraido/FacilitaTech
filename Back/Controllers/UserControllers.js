/**
 * UserControllers.js
 * ------------------
 * Perfil do usuário logado (atualizar/excluir a própria conta) e,
 * para admin, listar todos os usuários.
 */
import UserServices from "../Services/UserServices.js";

// Antes: só devolvia { message: "..." } sem chamar o UserServices nem
// mexer no banco — o usuário nunca era realmente atualizado ou excluído.
// Agora chama o Service de verdade, usando o id de quem está logado
// Confirmado no authMiddleware.js real: ele faz req.user = usuário do
// banco (User.findById), então req.user.id funciona (getter virtual do
// Mongoose para o _id). Nada a ajustar aqui.

const updateMe = async (req, res, next) => {
  try {
    const user = await UserServices.updateMe({ id: req.user.id, ...req.body });
    res.status(200).json({ message: "Usuário atualizado com sucesso", data: user });
  } catch (error) {
    next(error);
  }
};

const DeleteMe = async (req, res, next) => {
  try {
    await UserServices.DeleteMe({ id: req.user.id });
    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserServices.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export default {
  updateMe,
  DeleteMe,
  getAllUsers,
};