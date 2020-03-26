const jwt = require('jsonwebtoken');
const AUTH_UTILS = require('../utils/auth.util');
const DATABASE = require('../db');

const authMiddleWare = async (req, res, next) => {
    try {
        const authorization = req.header('Authorization');
        if (!authorization) {
            return res.status(401).send({
                message: 'Not authorized to do this action'
            });
        }

        const token = authorization.replace('Bearer ', '');
        const data = jwt.verify(token, AUTH_UTILS.JWT_KEY);

        const user = await DATABASE('tokens').where({ user_id: data.id });
        if (!user) {
            return res.status(401).send({
                message: 'Not authorized to do this action'
            });
        }

        req.userId = data.id;
        req.username = data.username;
        req.isAdmin = data.isAdmin;

        next();
    } catch (error) {
        return res.status(500).json({ message: `${JSON.stringify(error)}` });
    }
}
module.exports = authMiddleWare;