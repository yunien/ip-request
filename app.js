const express = require('express')
const app = express()
const port = 3000
const cache = require('memory-cache');

require('./routes')(app);

setInterval(() => {
  cache.clear();
}, 60000)
app.listen(port, () => console.log(`app listening port ${port}!`))