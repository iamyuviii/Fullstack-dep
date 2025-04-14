const User = require('../Models/user.js');
const { comparePass, hashPass } = require('../helper/auth.js');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('Test is working');
};

// Register endpoint
const registeruser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if the email is already taken
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({ error: 'Email is already taken' });
        }

        // Hash the password
        const hashedPassword = await hashPass(password);

        // Create a new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Login endpoint
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'No User Found' });
        }

        const match = await comparePass(password, user.password);
        if (match) {
            // Ensure JWT_SECRET is defined
            if (!process.env.JWT_SECRET) {
                return res.status(500).json({ error: 'JWT_SECRET environment variable not defined' });
            }

            jwt.sign(
                { email: user.email, id: user._id, name: user.name },
                process.env.JWT_SECRET,
                {},
                (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token, { httpOnly: true }).json(user);
                }
            );
        } else {
            return res.status(400).json({ error: 'Password Incorrect' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getprofile = (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;
            res.json(user);
        });
    } else {
        res.json(null);
    }
};

module.exports = {
    test,
    registeruser,
    loginUser,
    getprofile,
};
