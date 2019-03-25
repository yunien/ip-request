const express = require('express')
const app = express()
const port = 3000
const cache = require('memory-cache');

app.set('trust proxy', true);
require('./routes')(app);

setInterval(() => {
  console.log('1 min, time reset.');
  cache.clear();
}, 60000)
app.listen(port, () => console.log(`app listening port ${port}!`))