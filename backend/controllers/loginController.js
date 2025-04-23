const db = require('../db'); // Import database connection
const crypto = require('crypto'); // Import crypto for hashing

// Login a user
const loginUser = (req, res) => {
    const { username, password } = req.body;

    // Check if the user exists
    const sql = 'SELECT * FROM Users WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const user = results[0];

        // Compare the hashed password
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        if (hashedPassword !== user.password) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Login successful', user: { id: user.user_id, username: user.username } });
    });
};

// Get a user's details
const getUserDetails = (req, res) => {
    const { id } = req.params; // Ensure the parameter matches the route

    const sql = 'SELECT * FROM Users WHERE user_id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = results[0];
        res.status(200).json({ user: { id: user.user_id, username: user.username, email: user.email, address: user.address } });
    });
};

module.exports = {
    loginUser,
    getUserDetails
}