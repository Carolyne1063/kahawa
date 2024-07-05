import { Router } from 'express';
import { registerUser, loginUserController, deleteUserController, getUsers, getUser, updateUserByEmailOrId } from '../controllers/userControllers';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUserController);
router.put('/update', updateUserByEmailOrId); 
router.delete('/:userId', deleteUserController); 
router.get('/', getUsers);
router.get('/:userId', getUser); 

export default router;
