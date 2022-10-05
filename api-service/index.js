const express = require('express');
const dotenv = require('dotenv');
const router = require('./router');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use((error, req, res, _) => {
  const statusCode = error.statusCode || 500;
  console.error(error.message, error.stack);
  return res.status(statusCode).json({ message: error.message });
});

const PORT_NUMBER = process.env.PORT || 5000;

app.listen(PORT_NUMBER, () => console.log(`Server is listening on port ${PORT_NUMBER}`));
