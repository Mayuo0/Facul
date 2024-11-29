import jwt from 'jsonwebtoken';

export const adminMiddleware = (req, res, next) => {
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
            return res.status(401).send({ success: false, statusCode: 401, body: { text: 'Invalid or expired token' } });
        }

       
        if (decoded.role !== 'admin') {
            return res.status(403).send({ success: false, statusCode: 403, body: { text: 'Access forbidden: Admins only' } });
        }

        req.user = decoded; 
        next();
    });
};
