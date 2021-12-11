// index.js

const serverless = require('serverless-http');
const express = require('express')
const app = express()
var http = require('http');
var uuid = require('uuid');
var url = require('url');
var jwt = require('jwt-simple');

var subdomain = 'z3nwteoh';
var shared_key = 'wDdbbiAQiGU4R260IPpl3NSmE70o4y33r2VllVuTr4oyXgZY';


//fake user list
const user = [
    {
        name: 'Wei Lun Teoh',
        email: 'wteoh@zendesk.com'
    }
];


app.get('/hello', function (req, res) {
  res.send('Hello World!')
})

app.post('/login', function(req, res) {
    const { username, password, url } = req.body;

    var payload = {
        iat: (new Date().getTime() / 1000),
        jti: uuid.v4(),
        name: user.name,
        email: user.email
      };

    //code to validate user here......

    var token = jwt.encode(payload, shared_key);
    var redirect = 'https://' + subdomain + '.zendesk.com/access/jwt?jwt=' + token;
    var query = url.parse(request.url, true).query;
    if(query['return_to']) {
        redirect += '&return_to=' + encodeURIComponent(query['return_to']);
    }

    response.writeHead(302, {
        'Location': redirect
    });
    response.end();

});

module.exports.handler = serverless(app)