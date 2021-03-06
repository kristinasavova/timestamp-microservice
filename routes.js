const express = require('express'); 
const router = express.Router();

/**
 * GET '/api/timestamp' and return the current UNIX and UTC timestamps 
 */
router.get('/timestamp', (req, res, next) => { 
    const unix = Date.now();
    const utc = new Date().toUTCString();
    res.json({ unix, utc });
});

/**
 * GET '/api/timestamp/:date_string' 
 * If the endpoint has a date in UNIX format, calculate the human readable format, and vice versa 
 */
router.get('/timestamp/:date_string', (req, res, next) => {
    const { date_string } = req.params;
    if (/^([12]\d{3}-(0?[1-9]|1[0-2])-(0?[1-9]|[12]\d|3[01]))$/.test(date_string)) {
        const unix = parseInt(new Date(date_string).getTime()); // in miliseconds 
        const utc = new Date(date_string).toUTCString();
        res.json({ unix, utc });
    } else if (/^\d{5,}$/.test(date_string)) {
        const unix = parseInt(date_string);
        const utc = new Date(unix).toUTCString(); 
        res.json({ unix, utc });
    } else {
        const err = new Error('Invalid Date');
        err.status = 400;
        next(err); 
    }
});

module.exports = router;  