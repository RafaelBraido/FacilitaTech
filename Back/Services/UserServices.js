
import User from "../Models/User.js";


const updateMe = async (updateData) => {
  const { id, ...camposParaAtualizar } = updateData;
  // Ninguém deve conseguir se promover a admin editando o próprio perfil.
  delete camposParaAtualizar.role;
  delete camposParaAtualizar.active;

  const user = await User.findByIdAndUpdate(id, camposParaAtualizar, {
    new: true,
    runValidators: true,
  }).select("-password");
  return user;
};

const DeleteMe = async (deleteData) => {
  const user = await User.findByIdAndDelete(deleteData.id).select("-password");
  return user;
};

const getAllUsers = async () => {
  const users = await User.find().select("-password");
  return users;
};

export default {
  updateMe,
  DeleteMe,
  getAllUsers,
};