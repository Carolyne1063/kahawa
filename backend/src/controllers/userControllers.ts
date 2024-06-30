import { Request, Response } from 'express';
import { createUser, loginUser, updateUser, deleteUser, getAllUsers, getUserById } from '../services/userService';
import { User, LoginDetails } from '../interfaces/users';
import { v4 as uuidv4 } from 'uuid'; 

const registerUser = async (req: Request, res: Response) => {
  try {
    const user: User = {
      userId: uuidv4(), 
      ...req.body
    };
    await createUser(user);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

const loginUserController = async (req: Request, res: Response) => {
  try {
    const loginDetails: LoginDetails = req.body;
    const token = await loginUser(loginDetails);
    res.status(200).json(token);
  } catch (error) {
    res.status(401).json({ error: (error as Error).message });
  }
};

const updateUserController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = req.body;
    await updateUser(userId, user);
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    await deleteUser(userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await getUserById(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export { registerUser, loginUserController, updateUserController, deleteUserController, getUsers, getUser };
