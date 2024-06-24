import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import logger from "../logging/logger.js";





const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

const createUser = async (req, res) => {
    await body('email').isEmail().run(req);
    await body('password').isLength({ min: 6 }).run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: { email, password: hashedPassword, name },
        });
        res.status(201).json(user);
    } catch (error) {
        logger.error('User creation failed:', error);
        res.status(500).json({ error: 'User creation failed' });
    }
};

const loginUser = async (req, res) => {
    await body('email').isEmail().run(req);
    await body('password').exists().run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        logger.error('Login failed:', error);
        res.status(500).json({ error: 'Login failed' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        logger.error('Failed to retrieve users', error);
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({ where: { id: id } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        logger.error('Failed to retrieve user', error);
        res.status(500).json({ error: 'Failed to retrieve user' });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.delete({ where: { id: id } });
        res.json({ message: 'User deleted successfully', user });
    } catch (error) {
        logger.error('Failed to delete user', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

export default {
    createUser,
    loginUser,
    getAllUsers,
    getUserById,
    deleteUser,
};