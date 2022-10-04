const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const validateEmail = require('./validation');
const controller = require('./controller');
const scheduler = require('./scheduler');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.send('App is running successfully'));
app.post('/register', validateEmail, controller);

app.use((error, req, res, _) => {
  console.error(error);
  return res.status(500).json({
    message: error.message,
  });
});

scheduler.initScheduledJobs();

const PORT_NUMBER = process.env.PORT || 5000;

app.listen(PORT_NUMBER, () => console.log(`Server listening on port ${PORT_NUMBER}`));
