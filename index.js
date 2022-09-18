const express = require('express')
const cors = require('cors')
const cleverbot = require("cleverbot-free");

const app = express()

const port = process.env.PORT || 3001
app.use(cors())
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.get('/', cors(), (req, res) => {
   
    if(req.query.messageList && req.query.messageList.length > 0)
    {
        console.log("OHHH?", req.query.MessageList, req.query.newMessage);
        cleverbot(req.query.newMessage, req.query.messageList).then(response => res.send(response));
    }
    else{
    cleverbot(req.query.newMessage).then((response => {
        res.send(response);
    }), (err) => console.log("ERROR:", err));
    }


})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})