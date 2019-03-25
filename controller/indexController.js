const cache = require('memory-cache');

exports.index = (req, res) => {
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if (ip.substr(0, 7) === "::ffff:") {
    ip = ip.substr(7)
  } else {
    ip = "";
  }

  if (ip) {
    if (cache.get(ip)) {
      if (cache.get(ip) === 'error') {
        // console.log('error');
        //do nothing
      } else if (parseInt(cache.get(ip)) < 60) {
        let times = parseInt(cache.get(ip)) + 1;
        cache.put(ip, times);
      } else {
        cache.put(ip, 'error');
      }
    } else {
      cache.put(ip, 1);
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