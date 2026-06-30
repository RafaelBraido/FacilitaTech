import userController from "../Controllers/UserControllers.js";

const updateMe = async (updateData) => {
  const user = await userController.findByIdAndUpdate(updateData.id, updateData, { new: true });
  return user;
}
const DeleteMe = async (deleteData) => {
  const user = await userController.findByIdAndDelete(deleteData.id);
  return user;
}
export default {    
updateMe,
DeleteMe
};