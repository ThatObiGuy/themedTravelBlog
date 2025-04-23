const db = require('../db'); // Import the connection to the database

// Retrieve all JourneyPlans
const retrieveJourneyPlans = (req, res) => {
    const { user_id } = req.params;

    const sql = 'SELECT * FROM Journey_Plans WHERE user_id = ?'; // SQL query to select all journey plans
    db.query(sql, [user_id], (err, results) => { // Execute the query
        if (err) { // If there is an error
            console.error(err); // Log the error
            res.status(500).json({ error: 'Internal Server Error' }); // Send a 500 response
        } else { // If there are no errors
            res.status(200).json(results); // Send the results as a JSON response
        }
    });
};

// Create a new JourneyPlan
const createJourneyPlan = (req, res) => {
    const { user_id, journey_name, locations, start_date, end_date, activities, description } = req.body; // Take the data from the request body

    // SQL query to insert a new journey plan
    const sql = 'INSERT INTO Journey_Plans (user_id, journey_name, locations, start_date, end_date, activities, description) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [user_id, journey_name, locations, start_date, end_date, activities, description], (err, results) => { // Execute the query
        if (err) { // If there is an error
            console.error(err); // Log the error
            res.status(500).json({ error: 'Internal Server Error' }); // Send a 500 response
        } else { // If there are no errors
            res.status(201).json({ message: 'Journey Plan Created', plan_id: results.insertId }); // Send a 201 response with the new plan ID
        }
    });
};

// Update JourneyPlan by ID
const updateJourneyPlan = (req, res) => {
    const { plan_id, user_id, journey_name, locations, start_date, end_date, activities, description } = req.body; // Take the data from the request body

    // SQL query to update a journey plan
    const sql = 'UPDATE Journey_Plans SET user_id = ?, journey_name = ?, locations = ?, start_date = ?, end_date = ?, activities = ?, description = ? WHERE plan_id = ?';
    db.query(sql, [user_id, journey_name, locations, start_date, end_date, activities, description, plan_id], (err, results) => { // Execute the query
        if (err) { // If there is an error
            console.error(err); // Log the error
            res.status(500).json({ error: 'Internal Server Error' }); // Send a 500 response
        } else { // If there are no errors
            res.status(200).json({ message: 'Journey Plan Updated' }); // Send a 200 response
        }
    });
};

// Delete JourneyPlan by ID
const deleteJourneyPlan = (req, res) => {
    const { plan_id } = req.params; // Take the plan ID from the request parameters

    // SQL query to delete a journey plan
    const sql = 'DELETE FROM Journey_Plans WHERE plan_id = ?';
    db.query(sql, [plan_id], (err, results) => { // Execute the query
        if (err) { // If there is an error
            console.error(err); // Log the error
            res.status(500).json({ error: 'Internal Server Error' }); // Send a 500 response
        } else { // If there are no errors
            res.status(200).json({ message: 'Journey Plan Deleted' }); // Send a 200 response
        }
    });
};

// Export all functions
module.exports = {
    retrieveJourneyPlans,
    createJourneyPlan,
    updateJourneyPlan,
    deleteJourneyPlan
};