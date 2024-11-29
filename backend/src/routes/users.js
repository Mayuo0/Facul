import express from 'express';
import UsersControllers from '../controllers/users.js';
import { authMiddleware } from '../middlewares/authMiddleware.js'; 

const usersRouter = express.Router();

const usersControllers = new UsersControllers();

usersRouter.get('/', authMiddleware, async (req, res) => {
    try {
        const users = await usersControllers.dataAccess.getUsers();
        res.status(200).send({ success: true, statusCode: 200, body: users });
    } catch (error) {
        res.status(500).send({ success: false, statusCode: 500, body: { text: 'Error fetching users' } });
    }
});


export default usersRouter;
