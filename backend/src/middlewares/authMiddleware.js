import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 
    if (!token) {
        return res.status(401).send({
            success: false,
            statusCode: 401,
            body: { text: 'No token provided' }
        });
    }

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            return res.status(401).send({
                success: false,
                statusCode: 401,
                body: { text: 'Invalid or expired token' }
            });
        }

        req.user = decoded;
        next(); // 
    });
};
