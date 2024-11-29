import express from 'express';
import { adminMiddleware } from '../../middlewares/adminMiddleware.js';
import AdminControllers from '../controllers/admin.js';

const adminRouter = express.Router();
const adminControllers = new AdminControllers();

adminRouter.delete('/deleteUser/:id', adminMiddleware, async (req, res) => {
    const { id } = req.params;
    const result = await adminControllers.deleteUser(id);

    if (!result) {
        return res.status(404).send({
            success: false,
            statusCode: 404,
            body: 'User not found'
        });
    }

    res.status(200).send({
        success: true,
        statusCode: 200,
        body: 'User deleted successfully'
    });
});


adminRouter.put('/editUser/:id', adminMiddleware, async (req, res) => {
    const { id } = req.params;
    const userData = req.body; 

    const result = await adminControllers.editUser(id, userData);

    if (!result) {
        return res.status(404).send({
            success: false,
            statusCode: 404,
            body: 'User not found'
        });
    }

    res.status(200).send({
        success: true,
        statusCode: 200,
        body: 'User updated successfully'
    });
});

adminRouter.put('/resetPassword/:id', adminMiddleware, async (req, res) => {
    const { id } = req.params;
    const { newPassword } = req.body;

    const result = await adminControllers.resetPassword(id, newPassword);

    if (!result) {
        return res.status(404).send({
            success: false,
            statusCode: 404,
            body: 'User not found'
        });
    }

    res.status(200).send({
        success: true,
        statusCode: 200,
        body: 'Password reset successfully'
    });
});




export default adminRouter;
