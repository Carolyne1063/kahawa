import { Router } from 'express';
import { registerUser, loginUserController, deleteUserController, getUsers, getUser, updateUserByEmailOrId } from '../controllers/userControllers';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUserController);
router.put('/update', updateUserByEmailOrId); // Use userId in path
router.delete('/:userId', deleteUserController); // Use userId in path
router.get('/', getUsers);
router.get('/:userId', getUser); // Use userId in path

export default router;
