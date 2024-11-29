import UsersDataAcess from "../dataAccess/users.js";

export default class AdminControllers {
    constructor() {
        this.dataAccess = new UsersDataAcess();
    }

    async deleteUser(id) {
        try {
            return await this.dataAccess.deleteUser(id); 
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async editUser(id, userData) {
        try {
            return await this.dataAccess.updateUser(id, userData); 
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    
   
    async resetPassword(id, newPassword) {
        try {
            const salt = crypto.randomBytes(16);
            const hashedPassword = await new Promise((resolve, reject) => {
                crypto.pbkdf2(newPassword, salt, 310000, 16, 'sha256', (error, hashedPassword) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(hashedPassword);
                });
            });

            return await this.dataAccess.updateUser(id, { password: hashedPassword, salt });
        } catch (error) {
            console.error(error);
            return null;
        }
    }

}
