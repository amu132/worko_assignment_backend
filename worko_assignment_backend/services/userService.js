const userDAO = require('../dao/userDAO');
const User = require('../models/user');

async function getAllUsers() {
  return await userDAO.getAllUsers();
}

async function getUserById(userId) {
  return await userDAO.getUserById(userId);
}

async function createUser(userData) {
  const user = new User(userData.email, userData.name, userData.age, userData.city, userData.zipCode);
  return await userDAO.createUser(user);
}

async function updateUser(userId, userData) {
  const user = new User(userData.email, userData.name, userData.age, userData.city, userData.zipCode);
  user.id = userId;
  return await userDAO.updateUser(userId, user);
}

async function deleteUser(userId) {
  return await userDAO.softDeleteUser(userId);
}

async function partialUpdateUser(userId, partialData) {
  const existingUser = await getUserById(userId);
  if (!existingUser) return null;

  const updatedUser = {
    ...existingUser,
    ...partialData,
  };

  const user = new User(updatedUser.email, updatedUser.name, updatedUser.age, updatedUser.city, updatedUser.zipCode);
  user.id = userId;
  return await userDAO.updateUser(userId, user);
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  partialUpdateUser,
};
