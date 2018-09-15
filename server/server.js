const path = require('path');
const publicPath = path.join(__dirname, '..', 'public');
const PORT = process.env.PORT || 3000;

const express = require('express');

var app = express();

app.use(express.static(publicPath));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
