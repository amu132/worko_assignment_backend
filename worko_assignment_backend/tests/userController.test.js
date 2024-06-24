const userService = require('../services/userService');
const { listUsers, getUser, createUser, updateUser, deleteUser, partialUpdateUser } = require('../controllers/userController');
const httpMocks = require('node-mocks-http');
const { validateUser, validateId, validatePartialUser } = require('../validators/userValidator');

jest.mock('../services/userService');
jest.mock('../validators/userValidator');

describe('UserController', () => {
  let req, res, next;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
  });

  describe('listUsers', () => {
    it('should return all users', async () => {
      const users = [{ id: 1, name: 'John Doe' }];
      userService.getAllUsers.mockResolvedValue(users);

      await listUsers(req, res, next);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(users);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Error retrieving users';
      userService.getAllUsers.mockRejectedValue(new Error(errorMessage));

      await listUsers(req, res, next);

      expect(res.statusCode).toBe(500);
      expect(res._getData()).toBe(errorMessage);
    });
  });

  describe('getUser', () => {
    it('should return user by id', async () => {
      const user = { id: 1, name: 'John Doe' };
      req.params.userId = 1;
      validateId.mockReturnValue({ error: null });
      userService.getUserById.mockResolvedValue(user);

      await getUser(req, res, next);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(user);
    });

    it('should return 400 for invalid id', async () => {
      req.params.userId = 'invalid-id';
      validateId.mockReturnValue({ error: { details: [{ message: 'Invalid ID' }] } });

      await getUser(req, res, next);

      expect(res.statusCode).toBe(400);
      expect(res._getData()).toBe('Invalid ID');
    });

    it('should return 404 if user not found', async () => {
      req.params.userId = 1;
      validateId.mockReturnValue({ error: null });
      userService.getUserById.mockResolvedValue(null);

      await getUser(req, res, next);

      expect(res.statusCode).toBe(404);
      expect(res._getData()).toBe('User not found');
    });

    it('should handle errors', async () => {
      const errorMessage = 'Error retrieving user';
      req.params.userId = 1;
      validateId.mockReturnValue({ error: null });
      userService.getUserById.mockRejectedValue(new Error(errorMessage));

      await getUser(req, res, next);

      expect(res.statusCode).toBe(500);
      expect(res._getData()).toBe(errorMessage);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const newUser = { id: 1, name: 'John Doe' };
      req.body = { email: 'john@example.com', name: 'John Doe', age: 30, city: 'NY', zipCode: '10001' };
      validateUser.mockReturnValue({ error: null });
      userService.createUser.mockResolvedValue(newUser);

      await createUser(req, res, next);

      expect(res.statusCode).toBe(201);
      expect(res._getJSONData()).toEqual(newUser);
    });

    it('should return 400 for invalid user data', async () => {
      req.body = { email: 'invalid-email' };
      validateUser.mockReturnValue({ error: { details: [{ message: 'Invalid data' }] } });

      await createUser(req, res, next);

      expect(res.statusCode).toBe(400);
      expect(res._getData()).toBe('Invalid data');
    });

    it('should handle errors', async () => {
      const errorMessage = 'Error creating user';
      req.body = { email: 'john@example.com', name: 'John Doe', age: 30, city: 'NY', zipCode: '10001' };
      validateUser.mockReturnValue({ error: null });
      userService.createUser.mockRejectedValue(new Error(errorMessage));

      await createUser(req, res, next);

      expect(res.statusCode).toBe(500);
      expect(res._getData()).toBe(errorMessage);
    });
  });

  describe('updateUser', () => {
    it('should update user details', async () => {
      const updatedUser = { id: 1, name: 'John Doe' };
      req.params.userId = 1;
      req.body = { email: 'john@example.com', name: 'John Doe', age: 30, city: 'NY', zipCode: '10001' };
      validateUser.mockReturnValue({ error: null });
      userService.updateUser.mockResolvedValue(updatedUser);

      await updateUser(req, res, next);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(updatedUser);
    });

    it('should return 400 for invalid user data', async () => {
      req.params.userId = 1;
      req.body = { email: 'invalid-email' };
      validateUser.mockReturnValue({ error: { details: [{ message: 'Invalid data' }] } });

      await updateUser(req, res, next);

      expect(res.statusCode).toBe(400);
      expect(res._getData()).toBe('Invalid data');
    });

    it('should return 404 if user not found', async () => {
      req.params.userId = 1;
      req.body = { email: 'john@example.com', name: 'John Doe', age: 30, city: 'NY', zipCode: '10001' };
      validateUser.mockReturnValue({ error: null });
      userService.updateUser.mockResolvedValue(null);

      await updateUser(req, res, next);

      expect(res.statusCode).toBe(404);
      expect(res._getData()).toBe('User not found');
    });

    it('should handle errors', async () => {
      const errorMessage = 'Error updating user';
      req.params.userId = 1;
      req.body = { email: 'john@example.com', name: 'John Doe', age: 30, city: 'NY', zipCode: '10001' };
      validateUser.mockReturnValue({ error: null });
      userService.updateUser.mockRejectedValue(new Error(errorMessage));

      await updateUser(req, res, next);

      expect(res.statusCode).toBe(500);
      expect(res._getData()).toBe(errorMessage);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      req.params.userId = 1;
      validateId.mockReturnValue({ error: null });
      userService.deleteUser.mockResolvedValue(true);

      await deleteUser(req, res, next);

      expect(res.statusCode).toBe(204);
    });

    it('should return 400 for invalid id', async () => {
      req.params.userId = 'invalid-id';
      validateId.mockReturnValue({ error: { details: [{ message: 'Invalid ID' }] } });

      await deleteUser(req, res, next);

      expect(res.statusCode).toBe(400);
      expect(res._getData()).toBe('Invalid ID');
    });

    it('should return 404 if user not found', async () => {
      req.params.userId = 1;
      validateId.mockReturnValue({ error: null });
      userService.deleteUser.mockResolvedValue(false);

      await deleteUser(req, res, next);

      expect(res.statusCode).toBe(404);
      expect(res._getData()).toBe('User not found');
    });

    it('should handle errors', async () => {
      const errorMessage = 'Error deleting user';
      req.params.userId = 1;
      validateId.mockReturnValue({ error: null });
      userService.deleteUser.mockRejectedValue(new Error(errorMessage));

      await deleteUser(req, res, next);

      expect(res.statusCode).toBe(500);
      expect(res._getData()).toBe(errorMessage);
    });
  });

  describe('partialUpdateUser', () => {
    it('should partially update user details', async () => {
      const updatedUser = { id: 1, name: 'John Doe', age: 31 };
      req.params.userId = 1;
      req.body = { age: 31 };
      validatePartialUser.mockReturnValue({ error: null });
      userService.partialUpdateUser.mockResolvedValue(updatedUser);

      await partialUpdateUser(req, res, next);

      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(updatedUser);
    });

    it('should return 400 for invalid user data', async () => {
      req.params.userId = 1;
      req.body = { age: 'invalid-age' };
      validatePartialUser.mockReturnValue({ error: { details: [{ message: 'Invalid data' }] } });

      await partialUpdateUser(req, res, next);

      expect(res.statusCode).toBe(400);
      expect(res._getData()).toBe('Invalid data');
    });

    it('should return 404 if user not found', async () => {
      req.params.userId = 1;
      req.body = { age: 31 };
      validatePartialUser.mockReturnValue({ error: null });
      userService.partialUpdateUser.mockResolvedValue(null);

      await partialUpdateUser(req, res, next);

      expect(res.statusCode).toBe(404);
      expect(res._getData()).toBe('User not found');
    });

    it('should handle errors', async () => {
      const errorMessage = 'Error updating user';
      req.params.userId = 1;
      req.body = { age: 31 };
      validatePartialUser.mockReturnValue({ error: null });
      userService.partialUpdateUser.mockRejectedValue(new Error(errorMessage));

      await partialUpdateUser(req, res, next);

      expect(res.statusCode).toBe(500);
      expect(res._getData()).toBe(errorMessage);
    });
  });
});
