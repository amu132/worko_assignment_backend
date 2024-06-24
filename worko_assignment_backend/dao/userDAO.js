const connectDB = require('../config/db');

async function getAllUsers() {
  const connection = await connectDB();
  const [rows] = await connection.execute('SELECT * FROM users WHERE isDeleted = 0');
  return rows;
}

async function getUserById(userId) {
  const connection = await connectDB();
  const [rows] = await connection.execute('SELECT * FROM users WHERE id = ? AND isDeleted = 0', [userId]);
  return rows[0];
}

async function createUser(user) {
  const connection = await connectDB();
  const [result] = await connection.execute(
    'INSERT INTO users (email, name, age, city, zipCode) VALUES (?, ?, ?, ?, ?)',
    [user.email, user.name, user.age, user.city, user.zipCode]
  );
  user.id = result.insertId;
  return user;
}

async function updateUser(userId, user) {
  const connection = await connectDB();
  const [result] = await connection.execute(
    'UPDATE users SET email = ?, name = ?, age = ?, city = ?, zipCode = ? WHERE id = ? AND isDeleted = 0',
    [user.email, user.name, user.age, user.city, user.zipCode, userId]
  );
  return result.affectedRows > 0 ? user : null;
}

async function softDeleteUser(userId) {
  const connection = await connectDB();
  const [result] = await connection.execute('UPDATE users SET isDeleted = 1 WHERE id = ?', [userId]);
  return result.affectedRows > 0;
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  softDeleteUser,
};
