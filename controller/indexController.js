const cache = require('memory-cache');

exports.index = (req, res) => {
  const headers = req.headers;
  let host = "";
  if(headers){
    host = headers.host.split(":");
    console.log('host:', host[0]);
    if(cache.get(host[0])){
      let times = parseInt(cache.get(host[0]))+1;
      cache.put(host[0], times);
    }else{
      cache.put(host[0], 1);
    }
  }
  
  let result = "";
  result += `<h2> hello, Dcard.</h2>`;
  result += `<table>`;
  result += `<tr><th>ip</th><th>times</th></tr>`;
  result += `<tr><td>`+host[0]+`</td><td>`+cache.get(host[0])+`</td></tr>`;
  result += `</table>`;
  res.send(result);
};

exports.html = (req, res) => {
  console.log('cc');
  res.send(
    '<h2> Hello, 111  </h2>' 
  );
};