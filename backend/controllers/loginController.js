const db = require('../db'); // Import database connection
const bcrypt = require('bcrypt'); // Import bcrypt for password comparing

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
        const storedHash = user.password; // Assuming the password hash is stored in the 'password' field

        // Compare the plaintext password with the stored hash
        bcrypt.compare(password, storedHash, function(err, result) {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (result) {
                res.status(200).json({ message: 'Login successful', user: { id: user.user_id, username: user.username } });
            } else {
                res.status(401).json({ error: 'Invalid username or password' });
            }
        });
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