const db = require('../db'); // Import the connection to the database

// Retrieve all TravelLogs
const retrieveTravelLogs = (req, res) => {
    const sql = 'SELECT * FROM Travel_Logs'; // SQL query to select all travel logs
    db.query(sql, (err, results) => { // Execute the query
        if (err) { // If there is an error
            console.error(err); // Log the error
            res.status(500).json({ error: 'Internal Server Error' }); // Send a 500 response
        } else { // If there are no errors
            res.status(200).json(results); // Send the results as a JSON response
        }
    });
};

// Create a new JourneyPlan
const createTravelLog = (req, res) => {
    const { user_id, title, description, start_date, end_date, tags } = req.body; // Take the data from the request body

    // SQL query to insert a new travel log
    const sql = 'INSERT INTO Travel_Logs (user_id, title, description, start_date, end_date, tags) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [user_id, title, description, start_date, end_date, tags], (err, results) => { // Execute the query
        if (err) { // If there is an error
            console.error(err); // Log the error
            res.status(500).json({ error: 'Internal Server Error' }); // Send a 500 response
        } else { // If there are no errors
            res.status(201).json({ message: 'Travel Log Created', log_id: results.insertId }); // Send a 201 response with the new log ID
        }
    });

};

// Update JourneyPlan by ID
const updateTravelLog = (req, res) => {
    const { log_id, user_id, title, description, start_date, end_date, tags } = req.body; // Take the data from the request body

    // SQL query to update a travel log
    const sql = 'UPDATE Travel_Logs SET user_id = ?, title = ?, description = ?, start_date = ?, end_date = ?, tags = ? WHERE log_id = ?';
    db.query(sql, [user_id, title, description, start_date, end_date, tags, log_id], (err, results) => { // Execute the query
        if (err) { // If there is an error
            console.error(err); // Log the error
            res.status(500).json({ error: 'Internal Server Error' }); // Send a 500 response
        } else { // If there are no errors
            res.status(200).json({ message: 'Travel Log Updated' }); // Send a 200 response
        }
    });
};

// Delete JourneyPlan by ID
const deleteTravelLog = (req, res) => {
    const { log_id } = req.params; // Take the log ID from the request parameters

    // SQL query to delete a travel log
    const sql = 'DELETE FROM travel_logs WHERE log_id = ?';
    db.query(sql, [log_id], (err, results) => { // Execute the query
        if (err) { // If there is an error
            console.error(err); // Log the error
            res.status(500).json({ error: 'Internal Server Error' }); // Send a 500 response
        } else { // If there are no errors
            res.status(200).json({ message: 'Travel Log Deleted' }); // Send a 200 response
        }
    });
};

// Export all functions
module.exports = {
    retrieveTravelLogs,
    createTravelLog,
    updateTravelLog,
    deleteTravelLog
};