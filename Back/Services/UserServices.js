import User from "../models/User.js";

const UserCadastro = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};

const UserLogin = async (loginData) => {
  const { email, password, } = loginData;
  const user = await User.find({ email });
  if (!user) {
    throw new Error("Usuário não encontrado");
  }
  if (user.password !== password) {
    throw new Error("Senha incorreta");
  }
  return user;
}
const updateMe = async (updateData) => {
  const user = await User.findByIdAndUpdate(updateData.id, updateData, { new: true });
  return user;
}
const DeleteMe = async (deleteData) => {
  const user = await User.findByIdAndDelete(deleteData.id);
  return user;
}
export default {    
UserCadastro,
UserLogin,
updateMe,
DeleteMe
};