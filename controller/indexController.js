const cache = require('memory-cache');

exports.index = (req, res) => {
  const headers = req.headers;
  let host = "";
  if (headers) {
    host = headers.host.split(":");
    if (cache.get(host[0])) {
      if (cache.get(host[0]) === 'error') {
        console.log('error');
        //do nothing
      } else if (parseInt(cache.get(host[0])) < 60) {
        let times = parseInt(cache.get(host[0])) + 1;
        cache.put(host[0], times);
      } else {
        cache.put(host[0], 'error');
      }
    } else {
      cache.put(host[0], 1);
    }
  }

  let result = "";
  result += `<h2> hello, Dcard.</h2>`;
  result += `<table>`;
  result += `<tr><th>ip</th><th>times</th></tr>`;
  cache.keys().forEach((ele) => {
    result += `<tr><td>` + ele + `</td><td>` + cache.get(ele) + `</td></tr>`;
  })
  result += `</table>`;
  res.send(result);
};