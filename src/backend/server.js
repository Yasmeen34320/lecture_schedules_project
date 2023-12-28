

var express = require('express');
var server = express();
var routes = require('./routes/routes');
var mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const router = express.Router();

mongoose.connect('mongodb://localhost:27017/project', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// mongoose.connect('mongodb://localhost:27017/project', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//    })
//     .then(() => {
//        console.log('Connected to MongoDB');
//     })
//     .catch((error) => {
//        console.error('Error connecting to MongoDB:', error);
//        process.exit(1);
//     });
//connectToDB();
server.use(cors());

app.use(cors({
    origin: 'http://localhost:3000', // or your React app's origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));
server.use(express.json());
server.use(routes);

server.listen(8000,function check(error)
{
    if(error)
    {
        console.log("errorr")
    }
    else
    {
        console.log("startedddddd")
    }
});
router.post('/restart', function(req, res) {
  // add code here to restart the server
  res.send('Server is restarting...');
 });
 
 module.exports = router;