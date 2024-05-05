const express = require("express");
const app = express();
const apiRouter = require('./routes/api'); // Ajusta la ruta

app.use('/apiv1', apiRouter);
const port = 3000;

app.get("/health-check", function (req, res) {
  function formatDate(date) {
    const year = date.getFullYear();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  }
  const currentDate = new Date();
  res.send(formatDate(currentDate)); // Send the formatted date
});

const server = app.listen(port, function () {
  console.log("Server listening on port " + port);
});
