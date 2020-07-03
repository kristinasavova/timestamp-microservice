const express = require('express'); 
const router = express.Router();

router.get('/timestamp', (req, res, next) => { 
    const unix = Date.now();
    const utc = new Date().toUTCString();
    res.json({ unix, utc });
});

router.get('/timestamp/:date_string', (req, res, next) => {
    const { date_string } = req.params; 
    if (/^([12]\d{3}-(0?[1-9]|1[0-2])-(0?[1-9]|[12]\d|3[01]))$/.test(date_string)) {
        const unix = parseInt((new Date(date_string).getTime() / 1000).toFixed(0));
        const utc = new Date(unix * 1000).toUTCString();
        res.json({ unix, utc });
    } else if (/^-?\d*$/.test(date_string)) {
        const unix = parseInt(date_string);
        const utc = new Date(unix * 1000).toUTCString();
        res.json({ unix, utc }); 
    } else {
        const err = new Error('Invalid Date');
        err.status = 400;
        next(err); 
    }
});

module.exports = router;  