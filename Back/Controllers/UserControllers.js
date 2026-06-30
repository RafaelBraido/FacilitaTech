import UserServices from "../Services/UserServices.js";

const updateMe = async (req, res, next) => {
  try {
    res.status(200).json({ message: "Usuário atualizado com sucesso" });
  } catch (error) {
    next(error);
  }
}

const DeleteMe = async (req, res, next) => {
  try {
    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    next(error);
  }
}

export default {
  updateMe,
  DeleteMe
};