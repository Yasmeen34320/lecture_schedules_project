


 const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routes');

const app = express();
const PORT = 8000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/project', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
console.log('Connected to MongoDB');
})
.catch((err) => {
console.error('Error connecting to MongoDB:', err);
});

// Enable CORS
app.use(cors({
origin: 'http://localhost:3000', // or your React app's origin
methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
credentials: true,
}));

// Parse JSON requests
app.use(express.json());

// Use routes
app.use(routes);

// Start the server
app.listen(PORT, (error) => {
if (error) {
console.log('Error starting the server:', error);
} else {
console.log(`Server started on port ${PORT}`);
}
});

// Define a route to restart the server
app.post('/restart', (req, res) => {
// add code here to restart the server
res.send('Server is restarting...');
});