const userDAO = require('../dao/userDAO');
const userService = require('../services/userService');
const User = require('../models/user');

jest.mock('../dao/userDAO');

describe('UserService', () => {
  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const users = [{ id: 1, name: 'John Doe' }];
      userDAO.getAllUsers.mockResolvedValue(users);

      const result = await userService.getAllUsers();

      expect(result).toEqual(users);
    });
  });

  describe('getUserById', () => {
    it('should return user by id', async () => {
      const user = { id: 1, name: 'John Doe' };
      userDAO.getUserById.mockResolvedValue(user);

      const result = await userService.getUserById(1);

      expect(result).toEqual(user);
    });

    it('should return null if user not found', async () => {
      userDAO.getUserById.mockResolvedValue(null);

      const result = await userService.getUserById(1);

      expect(result).toBeNull();
    });
  });

  describe('createUser', () => {
    it('should create and return a new user', async () => {
      const userData = { email: 'john@example.com', name: 'John Doe', age: 30, city: 'NY', zipCode: '10001' };
      const createdUser = { id: 1, ...userData };
      userDAO.createUser.mockResolvedValue(createdUser);

      const result = await userService.createUser(userData);

      expect(result).toEqual(createdUser);
      expect(userDAO.createUser).toHaveBeenCalledWith(new User(userData.email, userData.name, userData.age, userData.city, userData.zipCode));
    });
  });

  describe('updateUser', () => {
    it('should update and return the user', async () => {
      const userData = { email: 'john@example.com', name: 'John Doe', age: 30, city: 'NY', zipCode: '10001' };
      const updatedUser = { id: 1, ...userData };
      userDAO.updateUser.mockResolvedValue(updatedUser);

      const result = await userService.updateUser(1, userData);

      expect(result).toEqual(updatedUser);
      expect(userDAO.updateUser).toHaveBeenCalledWith(1, new User(userData.email, userData.name, userData.age, userData.city, userData.zipCode));
    });

    it('should return null if user not found', async () => {
      const userData = { email: 'john@example.com', name: 'John Doe', age: 30, city: 'NY', zipCode: '10001' };
      userDAO.updateUser.mockResolvedValue(null);

      const result = await userService.updateUser(1, userData);

      expect(result).toBeNull();
    });
  });

  describe('deleteUser', () => {
    it('should delete the user and return true', async () => {
      userDAO.softDeleteUser.mockResolvedValue(true);

      const result = await userService.deleteUser(1);

      expect(result).toBe(true);
    });

    it('should return false if user not found', async () => {
      userDAO.softDeleteUser.mockResolvedValue(false);

      const result = await userService.deleteUser(1);

      expect(result).toBe(false);
    });
  });

  describe('partialUpdateUser', () => {
    it('should partially update and return the user', async () => {
      const existingUser = { id: 1, email: 'john@example.com', name: 'John Doe', age: 30, city: 'NY', zipCode: '10001' };
      const partialData = { age: 31 };
      const updatedUser = { ...existingUser, ...partialData };
      userDAO.getUserById.mockResolvedValue(existingUser);
      userDAO.updateUser.mockResolvedValue(updatedUser);

      const result = await userService.partialUpdateUser(1, partialData);

      expect(result).toEqual(updatedUser);
      expect(userDAO.updateUser).toHaveBeenCalledWith(1, new User(updatedUser.email, updatedUser.name, updatedUser.age, updatedUser.city, updatedUser.zipCode));
    });

    it('should return null if user not found', async () => {
      userDAO.getUserById.mockResolvedValue(null);

      const result = await userService.partialUpdateUser(1, { age: 31 });

      expect(result).toBeNull();
    });
  });
});
