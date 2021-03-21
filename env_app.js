// simple JS to test if node-JS environment on novatrend server is running. 
// Nothing to do with Jass-App

var http = require('http');
var server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var message = '"msg":"It works!"\n',
        //version = 'NodeJS: ' + process.versions.node + '\n',
        version = '"version": ' + JSON.stringify(process.versions, null, '\n') + '\n',
        env = '"env": ' + JSON.stringify(process.env, null, '\n') + '\n',
        response = ['{',message, ',',version, ',', env, '}'].join('\n');
    res.end(response);
});
s = server.listen(function () {
    console.log('Ready on port %d', s.address().port);
});
