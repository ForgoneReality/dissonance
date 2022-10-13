const express = require('express')
const cors = require('cors')
const cleverbot = require("cleverbot-free");

const app = express()

const port = process.env.PORT || 3001

// app.set('port', (port));
// var server = http.createServer(app).listen(port, function() {
//   console.log('Server listening on port ' + port);
// });
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.get('/', cors(), (req, res) => {
   
    if(req.query.messageList && req.query.messageList.length > 0)
    {
        cleverbot(req.query.newMessage, req.query.messageList).then(response => res.send(response));
    }
    else{
    cleverbot(req.query.newMessage).then((response => {
        res.send(response);
    }), (err) => console.log("ERROR:", err));
    }
})
