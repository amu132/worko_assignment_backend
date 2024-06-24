const userService = require('../services/userService');
const { validateUser, validateId, validatePartialUser } = require('../validators/userValidator');

// List all users
async function listUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// Get user details by ID
async function getUser(req, res) {
  const { userId } = req.params;
  const { error } = validateId(userId);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const user = await userService.getUserById(userId);
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// Create a new user
async function createUser(req, res) {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// Update user details
async function updateUser(req, res) {
  const { userId } = req.params;
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const user = await userService.updateUser(userId, req.body);
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// Soft delete a user
async function deleteUser(req, res) {
  const { userId } = req.params;
  const { error } = validateId(userId);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const success = await userService.deleteUser(userId);
    if (!success) return res.status(404).send('User not found');
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function partialUpdateUser(req, res) {
  const { userId } = req.params;
  const { error } = validatePartialUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const user = await userService.partialUpdateUser(userId, req.body);
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
}



module.exports = {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  partialUpdateUser
};
