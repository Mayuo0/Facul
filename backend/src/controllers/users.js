import UsersDataAcess from "../dataAccess/users.js";
import { ok, serverError } from '../helpers/httpResponse.js';

export default class UsersControllers {
    constructor() {
        this.dataAccess = new UsersDataAcess();
    }

    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            const result = await this.dataAccess.deleteUser(userId);

            if (result.deletedCount === 0) {
                return res.status(404).send({
                    success: false,
                    statusCode: 404,
                    body: 'User not found'
                });
            }

            return ok(result);
        } catch (error) {
            return serverError(error);
        }
    }

    async updateUser(userId, userData) {
        const result = await Mongo.db
            .collection(collectionName)
            .findOneAndUpdate(
                { _id: new ObjectId(userId) },
                { $set: userData }, 
                { returnDocument: 'after' } 
            );

        return result;
    }

}
