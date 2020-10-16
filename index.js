const express = require('express');
const fs = require('fs');
const https = require('https');

// SSL setup
const options = {
    cert: fs.readFileSync(__dirname + '/cert.pem'),
    key: fs.readFileSync(__dirname + '/key.pem'),
}

const PORT = process.env.PORT || 8443;

const app = express();

app.use((req, res, next) => {
    console.log(`=== Incoming request: ${req.url} ===`);
    next();
});
app.use(express.static('src'));
// app.use(express.static('start'));
// app.use(express.static('complete'));
// app.use(express.static('./complete'));

// GET / route
app.get('/', (req, res) => {
    console.log('hello!');
    // const index = fs.readFileSync('./index.html');
    return res.sendFile(__dirname + '/index.html');
});

const server = https.createServer(options, app);

server.listen(PORT, () => {
    console.log(`Server is live @ https://localhost:${PORT}`);
});