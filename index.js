const http = require('http');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

const hostname = '127.0.0.1';
const port = '3000';
const mongodb_server_url = 'mongodb://localhost:27017/';
const database_name = 'user';

const server = http.createServer((req, res) => {
    var url = mongodb_server_url + database_name;
    
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server.");
        db.close();
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});