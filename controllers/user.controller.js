const userController = () => {
    const login = async (req, res, next) => {
        try {
            const sampleData ={
                username: 'hoangtran'
            }
            return res.status(200).json({ user: sampleData, token: '' });
        } catch (error) {
            return res.status(500).json({ message: `${JSON.stringify(error)}` });
        }
    }

    const logout = async (req, res, next) => {
        try {
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

    return {
        login,
        logout,
        getAllUser,
        deleteUser,
        updateUser,
        getUser
    }
}

module.exports = userController;