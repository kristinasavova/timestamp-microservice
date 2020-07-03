const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes'); 

app.use(cors({ optionSuccessStatus: 200 }));  

app.use(express.static('public'));

app.use('/api', routes);

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", (req, res) => {
    res.json({ greeting: 'hello API' });
});

// 404-Error
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err); 
});

// Global error handler 
app.use((err, req, res, next) => {
    err.message = err.message || 'Something went wrong on the server'; 
    console.log('Server error!', err);
    res.status(err.status || 500).json({ error: err.message }); 
});

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Express server is listening on port ' + listener.address().port);
});