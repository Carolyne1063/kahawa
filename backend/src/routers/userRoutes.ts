import { Router } from 'express';
import { registerUser, loginUserController, updateUserController, deleteUserController, getUsers, getUser } from '../controllers/userControllers';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUserController);
router.put('/:userId', updateUserController); // Use userId in path
router.delete('/:userId', deleteUserController); // Use userId in path
router.get('/', getUsers);
router.get('/:userId', getUser); // Use userId in path

export default router;
