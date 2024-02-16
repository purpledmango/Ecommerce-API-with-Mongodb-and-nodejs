import { Router } from 'express';
import { login, logout, getUser, updateUser, register, deleteUser, superuser } from '../controllers/authControllers.js'
import adminMiddleware from '../middlewares/adminMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/add-user', superuser);

router.post('/login', login)

router.post('/logout', logout);

router.put("/update-user/:uid", adminMiddleware, updateUser);

router.get("/get-user/:uid", getUser)

router.delete("/delete-user/:uid", deleteUser)



export default router;
