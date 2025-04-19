const express = require('express'); // Import express
const cors = require('cors'); // Import the cors package
const journeyPlanRoutes = require('./routes/journeyPlanRoutes'); // Import journeyPlan routes
const travelLogRoutes = require('./routes/travelLogRoutes'); // Import travelLog routes
const loginRoutes = require('./routes/loginRoutes'); // Import login routes

const app = express(); // Create an express app
const port = 5000; // Set the port for consistency

app.use(cors()); // Use the cors middleware to allow for cross-origin requests
app.use(express.json()); // Use the express.json() middleware to parse the body of the request message as json data 

app.use('/api/journeyPlan', journeyPlanRoutes); // Use therapist routes
app.use('/api/travelLog', travelLogRoutes); // Use client routes
app.use('/api/login', loginRoutes); // Use session routes

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});