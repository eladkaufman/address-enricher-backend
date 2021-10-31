const express = require('express');
const schoolRouter = require('./school-router');

const cors = require('cors');

let app = express();

app.use(cors());

app.use(express.json());

app.use('/api/enrich', schoolRouter)


app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status = error.status || 500;
    res.json({
        error: {
            message: error.message,
        },
    });
});

app.listen(8000);
