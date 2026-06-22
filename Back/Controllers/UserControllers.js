import UserServices from "../Services/UserServices.js";

const UserCadastro = async (req, res, next) => {
  try {
    const user = await UserServices.UserCadastro(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}
const UserLogin = async (req, res, next) => { 
    try {   
    const Login = await UserServices.UserLogin(req.body);
    res.status(200).json(Login); 
  } catch (error) {
    next(error);
  }
}
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
  UserCadastro,
  UserLogin,
  updateMe,
  DeleteMe
};