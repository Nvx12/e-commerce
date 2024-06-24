import jwt from 'jsonwebtoken';
import userService from '../Services/userService.js';

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.header('Authorization')

        if (!token) {
            return res.status(401).send({ errors: [{ msg: 'No token provided' }] });
        }

        var decoded = jwt.verify(token, process.env.SECRET);
        if (!decoded) {
            return res.status(400).send({ errors: [{ msg: "Invalid token" }] })
        }

        const found = await userService.login(decoded.email);

        if (!found) {
            return res.status(404).send({ errors: [{ msg: 'User not found' }] });
        }
        const { pwd, ...filteredData } = found[0]
        req.user = filteredData

        next()


    } catch (error) {
        res.status(500).send({ errors: [{ msg: 'Could not auth' }] })
    }
}

export { isAuthenticated }