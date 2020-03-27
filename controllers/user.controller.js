const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AUTH_UTILS = require('../utils/auth.util');

const generateAuthToken = function (user) {
    const token = jwt.sign({ 
        id: user.id, 
        username: user.username, 
        isAdmin: user.role == 'admin'
    }, AUTH_UTILS.JWT_KEY);
    return token;
}

const userController = (DATABASE) => {

    const login = async (req, res, next) => {
        try {
            const { username, password } = await req.body;
            const user = await DATABASE('users').where({ username });

            if (!user || (user && user.length == 0)) {
                return res.status(404).json({ message: "Your account is not corrected!" });
            }
            
            const isPasswordMatch = await bcrypt.compare(password, user[0].password);

            if (!isPasswordMatch) {
                return res.status(404).json({ message: "Your password is not corrected!" })
            }

            const token = generateAuthToken(user[0]);
            const checkUser = await DATABASE('tokens').where({ user_id: user[0].id });

            if(checkUser && checkUser.length > 0) {
                await DATABASE('tokens').where({ user_id: user[0].id }).update({ token });
            } else {
                await DATABASE('tokens').insert({ user_id: user[0].id, token });
            }

            const data = {
                first_name: user[0].first_name,
                last_name: user[0].last_name,
                username: user[0].username,
                email: user[0].email,
                avatar: user[0].avatar_url,
                bio: user[0].bio,
                role: user[0].role,
                token
            }
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: `${JSON.stringify(error)}` });
        }
    }

    const logout = async (req, res, next) => {
        try {
            await DATABASE('tokens').where('user_id', req.userId).del();
            return res.status(200).json({});
        } catch (error) {
            return res.status(500).json({ message: `${JSON.stringify(error)}` });
        }
    }

    const getAllUser = async (req, res, next) => {
        try {
            const users = [
                {
                    username: 'test 1'
                },
                {
                    username: 'test 2'
                }
            ]
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ message: `${JSON.stringify(error)}` });
        }
    }

    const getUser = async (req, res, next) => {
        try {
            const sampleData ={
                username: 'hoangtran'
            }
            return res.status(200).json(sampleData);
        } catch (error) {
            return res.status(500).json({ message: `${JSON.stringify(error)}` });
        }
    }

    const updateUser = async (req, res, next) => {
        try {
            return res.status(200).json({ message : 'DONE!'});
        } catch (error) {
            return res.status(500).json({ message: `${JSON.stringify(error)}` });
        }
    }

    const deleteUser = async (req, res, next) => {
        try {
            return res.status(200).json({ message : 'DONE!'});
        } catch (error) {
            return res.status(500).json({ message: `${JSON.stringify(error)}` });
        }
    }

    const createUser = async (req, res, next) => {
        try {
            if(req.isAdmin) {
                const { first_name, last_name, email, password, role, avatar} = await req.body;
                // upload avatar here and store url to database
                const encryptedPwd = bcrypt.hashSync(password, 8);
                const username = email.split('@')[0];
                await DATABASE('users').insert({
                    first_name, 
                    last_name, 
                    email, 
                    username,
                    role, 
                    password: encryptedPwd, 
                    status: 'active', 
                    avatar_url: '',
                });
                return res.status(200).json();
            } else {
                return res.status(401).json({ message : 'No authorized to create user.'});
            }
        } catch (error) {
            return res.status(500).json({ message: `${JSON.stringify(error)}` });
        }
    }

    return {
        login,
        logout,
        getAllUser,
        deleteUser,
        updateUser,
        getUser,
        createUser
    }
}

module.exports = userController;