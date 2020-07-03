const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({ optionSuccessStatus: 200 }));  

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", (req, res) => {
    res.json({ greeting: 'hello API' });
});

const listener = app.listen(process.env.PORT, () => {
    console.log('Express server is listening on port ' + listener.address().port);
});