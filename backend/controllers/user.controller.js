import productService from '../services/user.service.js';




export const registerUser = async (req, res) => {
    try {
        await productService.createUser(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const authenticateUser = async (req, res) => {
    try {
        await productService.loginUser(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getUsers = async (req, res) => {
    try {
        await productService.getAllUsers(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getUserByIds = async (req, res) => {
    try {
        await productService.getUserById(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const deleteUsers = async (req, res) => {
    try {
        await productService.deleteUser(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

